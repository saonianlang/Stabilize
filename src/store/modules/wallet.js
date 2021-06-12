import {Contract} from 'ethers';
import {token_address} from '@/connectors/config';
import PoolAbi from '@/abis/pool';
import TokenAbi from '@/abis/token';
import UsdtAbi from '@/abis/usdt';

const state = {
    account: '' || localStorage.getItem('account'), // Account address
    walletProvider: null, // wallet provider
    provider: null, // ethers provider
    chainId: '', // chainId
    blockNumber: '', // block Number
    poolContract: null, // pool Contract
    tokenContract: null, // token Contract
    usdtContract: null // usdt Contract
};

const mutations = {
    SET_ACCOUNT: (state, account) => {
        state.account = account;
        localStorage.setItem('account', account);
    },
    SET_PROVIDER: (state, provider) => {
        state.provider = provider;
    },
    SET_WALLETPROVIDER: (state, walletProvider) => {
        state.walletProvider = walletProvider;
    },
    SET_CHAINID: (state, chainId) => {
        state.chainId = chainId;
    },
    SET_BLOCKNUMBER: (state, blockNumber) => {
        state.blockNumber = blockNumber;
    },
    SET_POOL_CONTRACT: (state, poolContract) => {
        state.poolContract = poolContract;
    },
    SET_TOKEN_CONTRACT: (state, tokenContract) => {
        state.tokenContract = tokenContract;
    },
    SET_USDT_CONTRACT: (state, usdtContract) => {
        state.usdtContract = usdtContract;
    }
};

const actions = {
    login({commit}, {provider, account, chainId}) {
        const signer = provider.getSigner();
        commit('SET_PROVIDER', provider);
        commit('SET_ACCOUNT', account);
        commit('SET_CHAINID', chainId);
        commit('SET_POOL_CONTRACT', new Contract(token_address.pool, PoolAbi, signer));
        commit('SET_TOKEN_CONTRACT', new Contract(token_address.token, TokenAbi, signer));
        commit('SET_USDT_CONTRACT', new Contract(token_address.usdt, UsdtAbi, signer));
    },
    logout({commit}) {
        commit('SET_ACCOUNT', '');
        commit('SET_PROVIDER', null);
        commit('SET_WALLETPROVIDER', null);
        commit('SET_CHAINID', '');
        commit('SET_POOL_CONTRACT', null);
        commit('SET_TOKEN_CONTRACT', null);
        commit('SET_USDT_CONTRACT', null);
        localStorage.removeItem('account');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
