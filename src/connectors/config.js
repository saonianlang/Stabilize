import tokenLists from './tokenLists';

// Trading pool contract address
const POOLS_CONFIG = {
    [56]: {},
    [97]: {
        privatePlacement: '0xebc17d6215a96a7459b1409e19c858c7ad774f9b'
    }
};

// chain id
export const CHAIN_ID = process.env.VUE_APP_CHAIN_ID || '';

// network url
export const NETWORK_URL = process.env.VUE_APP_NETWORK_URL || '';

// Get the Token List Contract Address
function constructSameTokenListAddressMap(chainId) {
    return tokenLists.tokens.filter(item => item.chainId == chainId);
}

// Get the Token Contract Address
function constructSameTokenAddressMap(chainId) {
    const token = {};
    tokenLists.tokens.forEach(element => {
        if (element.chainId == chainId) token[element.symbol] = element.address;
    });
    return token;
}

// Get the Pool Contract Address
function constructSamePoolAddressMap(chainId) {
    return POOLS_CONFIG[[chainId]];
}

export const TOKENS_ADDRESS = CHAIN_ID ? constructSameTokenListAddressMap(CHAIN_ID) : [];

export const TOKEN_ADDRESS = CHAIN_ID ? constructSameTokenAddressMap(CHAIN_ID) : [];

export const POOLS_ADDRESS = CHAIN_ID ? constructSamePoolAddressMap(CHAIN_ID) : [];
