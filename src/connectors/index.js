/* eslint-disable no-async-promise-executor */
/**
 * Wallet connection
 */
import WalletProvider from '@libertypie/wallet-provider';
import store from '../store';
import {Message} from 'element-ui';
import {providers} from 'ethers';
// import {network_url, chain_id} from './config';

let blockNumberTime = null;

// Wallet configuration
const providerConfig = {
    web3_wallets: {
        connect_text: 'Connect with Metamask or Brave'
    },
    binance_chain_wallet: {
        connect_text: 'Connect with Binance Chain Wallet'
    }
    // walletconnect: {
    //     connect_text: 'Connect with Walletconnect Chain Wallet',
    //     rpc: {
    //         [chain_id]: network_url
    //     },
    //     qrcodeModalOptions: {
    //         mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
    //     }
    // }
};

// Create a wallet
const walletProvider = new WalletProvider({
    cacheProvider: true,
    providers: providerConfig,
    debug: true
});

//wallet connected successful event
walletProvider.on('connect', data => {
    console.log('Wallet Connection Successful');
    store.dispatch('wallet/login', data);
    getBlockNumber(data);
});

//wallet connection failed
walletProvider.on('connectError', () => {
    console.log('Wallet Connection Error');
    Message.error('Wallet Connection Error');
});

//wallet's current account is changed
//@param Array<string> accounts
walletProvider.on('accountsChanged', accountsArray => {
    console.log('Accounts is changed');
    console.log(accountsArray);
    Message.warning('Accounts is changed');
});

//wallet's current chain is changed
//@param Array<string> accounts
walletProvider.on('chainChanged', chainId => {
    console.log('Chain is changed');
    console.log(`new chain id ${chainId}`);
    Message.warning('Chain is changed');
});
//wallet or web3 disconnected
walletProvider.on('disconnect', error => {
    console.log(error.message, error.code);
    store.dispatch('wallet/logout');
});

//listen to general errors
walletProvider.on('error', error => {
    console.log('an Error occurred');
    Message.error(error.message);
});

// Link wallet
async function connect() {
    const connectStatus = await walletProvider.connect();
    if (connectStatus.isError()) return Message.error('Wallet connection failed');
}

// Get the latest block height
function getBlockNumber({provider}) {
    const signer = new providers.Web3Provider(provider);
    if (blockNumberTime) clearInterval(blockNumberTime);
    blockNumberTime = setInterval(async () => {
        const blockNumber = await signer.getBlockNumber();
        if (blockNumber !== store.state.wallet.blockNumber) store.commit('wallet/SET_BLOCKNUMBER', blockNumber);
    }, 2000);
}

connect();

export default {
    walletProvider,
    async walletShowModal() {
        await walletProvider.showModal();
        connect();
    }
};
