const state = {
    // language
    language: localStorage.getItem('language') || 'en',
    theme: 'light'
};

const mutations = {
    SET_LANGUAGE: (state, language) => {
        state.language = language;
        localStorage.setItem('language', language);
    },
    SET_THEME: (state, theme) => {
        state.theme = theme;
    }
};

const actions = {
    setLanguage({commit}, language) {
        commit('SET_LANGUAGE', language);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
