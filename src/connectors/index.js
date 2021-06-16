/* eslint-disable no-async-promise-executor */
/**
 * Wallet connection
 */
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import store from '../store';
import {MessageBox} from 'element-ui';
import {providers} from 'ethers';
import {NETWORK_URL, CHAIN_ID} from './config';

class WalletConnection {
    constructor() {
        this.blockNumberTime = null;
        this.modalProvider = null;

        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    rpc: {
                        [CHAIN_ID]: NETWORK_URL
                    }
                }
            }
        };

        this.web3Modal = new Web3Modal({
            cacheProvider: false,
            disableInjectedProvider: false,
            providerOptions // required
        });

        this.onConnect();
    }
    // Link wallet
    async onConnect() {
        const self = this;
        this.modalProvider = await this.web3Modal.connect();

        // Subscribe to accounts change
        this.modalProvider.on('accountsChanged', accounts => {
            if (accounts.length > 0) {
                store.commit('wallet/SET_ACCOUNT', accounts[0]);
            } else {
                store.dispatch('wallet/logout');
                clearInterval(self.blockNumberTime);
            }
        });

        // Subscribe to chainId change
        this.modalProvider.on('chainChanged', async chainId => {
            await self.isNetwork(chainId);
            store.commit('wallet/SET_CHAINID', chainId);
        });

        // Subscribe to provider connection
        this.modalProvider.on('connect', info => {
            console.log(info);
        });

        // Subscribe to provider disconnection
        this.modalProvider.on('disconnect', error => {
            console.log(error);
            store.dispatch('wallet/logout');
            clearInterval(self.blockNumberTime);
        });

        await this.fetchAccountData(this.modalProvider);
    }

    /**
     * Kick in the UI action after Web3modal dialog has chosen a provider
     */
    async fetchAccountData(modalProvider) {
        const web3Provider = new Web3(modalProvider);
        const provider = new providers.Web3Provider(web3Provider.currentProvider);
        const network = await provider.getNetwork();
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        const isNetwork = await this.isNetwork(network.chainId);
        if (!isNetwork) return;
        if (account && network.chainId && provider) store.dispatch('wallet/login', {provider, account, chainId: network.chainId});
        this.getBlockNumber(provider);
    }

    /**
     * Disconnect wallet button pressed.
     */
    async onDisconnect() {
        console.log('Killing the wallet connection', this.modalProvider);

        // TODO: Which providers have close method?
        if (this.provider.close) {
            await this.modalProvider.close();

            // If the cached provider is not cleared,
            // WalletConnect will default to the existing session
            // and does not allow to re-scan the QR code with a new wallet.
            // Depending on your use case you may want or want not his behavir.
            await this.web3Modal.clearCachedProvider();
            this.modalProvider.provider = null;
        }
        store.dispatch('wallet/logout');
        clearInterval(this.blockNumberTime);
    }

    // Judgment the main network ID
    isNetwork(chainId) {
        return new Promise((resolve, reject) => {
            if (chainId != CHAIN_ID) {
                MessageBox('Your current network is not the network required by the application, please switch to the relevant network?', 'network', {
                    confirmButtonText: 'confirm',
                    cancelButtonText: 'cancel'
                })
                    .then(() => {})
                    .catch(() => {});
                return reject(false);
            }
            resolve(true);
        });
    }
    // Get the latest block height
    getBlockNumber(provider) {
        if (this.blockNumberTime) clearInterval(this.blockNumberTime);
        this.blockNumberTime = setInterval(async () => {
            const blockNumber = await provider.getBlockNumber();
            if (blockNumber !== store.state.wallet.blockNumber) store.commit('wallet/SET_BLOCKNUMBER', blockNumber);
        }, 2000);
    }
}

export default WalletConnection;
