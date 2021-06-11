/* eslint-disable no-async-promise-executor */
/**
 * Wallet connection
 */
import WalletProvider from '@libertypie/wallet-provider';
import store from '../store';
import {Message} from 'element-ui';

class Wallet {
    constructor() {
        const providers = {
            web3_wallets: {
                connect_text: 'Connect with Metamask or Brave'
            },
            binance_chain_wallet: {
                connect_text: 'Connect with Binance Chain Wallet'
            }
        };
        this.walletProvider = new WalletProvider({
            providers,
            debug: true
        });

        this.onEvents();
    }
    onEvents() {
        //wallet connected successful event
        this.walletProvider.on('connect', data => {
            console.log('Wallet Connection Successful');
            store.dispatch('wallet/login', data);
        });

        //wallet connection failed
        this.walletProvider.on('connectError', () => {
            console.log('Wallet Connection Error');
            Message.error('Wallet Connection Error');
        });

        //wallet's current account is changed
        //@param Array<string> accounts
        this.walletProvider.on('accountsChanged', accountsArray => {
            console.log('Accounts is changed');
            console.log(`new account ${accountsArray[0]}`);
            Message.warning('Accounts is changed');
        });

        //wallet's current chain is changed
        //@param Array<string> accounts
        this.walletProvider.on('chainChanged', chainId => {
            console.log('Chain is changed');
            console.log(`new chain id ${chainId}`);
            Message.warning('Chain is changed');
        });
        //wallet or web3 disconnected
        this.walletProvider.on('disconnect', error => {
            console.log(error.message, error.code);
            store.dispatch('wallet/logout');
        });

        //listen to general errors
        this.walletProvider.on('error', error => {
            console.log('an Error occurred');
            Message.error(error.message);
        });
    }
    async init() {
        if (store.state.wallet.provider) return;
        await this.walletProvider.connect();
    }
    showModal() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.walletProvider.showModal();
                await this.walletProvider.connect();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default Wallet;
