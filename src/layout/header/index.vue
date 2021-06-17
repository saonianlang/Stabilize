<template>
    <header class="header">
        <div class="header-main">
            <div class="logo">
                <svg-icon :icon-class="$store.state.app.theme === 'light' ? 'logo' : 'logo-dark'" />
            </div>
            <div class="navigation">
                <!-- <router-link :class="index === navIndex ? 'active' : ''" v-for="(nav, index) in navs" :key="nav.name" :to="nav.path">
                    {{ nav.name }}
                </router-link> -->
            </div>
            <div class="wallet">
                <el-button v-if="!$store.state.wallet.account" @click="onLogin" class="account" plain round>{{ $t('page.connectWallet') }}</el-button>
                <el-button v-else class="account" @click="changeVisible = true" round>{{ showAddress }}</el-button>
                <div class="flex-end">
                    <el-switch v-model="language" @change="onLanguage" :width="34" active-text="EN" inactive-text="CN"></el-switch>
                    <el-button
                        :icon="$store.state.app.theme === 'light' ? 'el-icon-sunny' : 'el-icon-moon'"
                        @click="onTheme"
                        class="button-theme"
                        circle
                    ></el-button>
                    <el-dropdown>
                        <el-button icon="el-icon-more" class="more-theme" circle></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <svg-icon icon-class="docs" />
                                {{ $t('page.docs') }}
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <svg-icon icon-class="code" />
                                {{ $t('page.code') }}
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <svg-icon icon-class="telegram" />
                                {{ $t('page.telegram') }}
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <svg-icon icon-class="vote" />
                                {{ $t('page.vote') }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <el-dialog :title="$t('page.yourWallet')" width="70%" top="40vh" append-to-body :visible.sync="changeVisible">
            <div class="logout">
                <div class="address">{{ $store.state.wallet.account }}</div>
                <el-button type="primary" round plain @click="onChange">{{ $t('page.change') }}</el-button>
            </div>
        </el-dialog>
    </header>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            changeVisible: false,
            language: false,
            navIndex: ''
        };
    },
    created() {
        this.setNavActive();
        this.language = this.$store.state.app.language === 'en' ? true : false;
    },
    computed: {
        showAddress() {
            const account = this.$store.state.wallet.account;
            return `${account.substr(0, 4)}...${account.substr(account.length - 5, 4)}`;
        },
        navs() {
            return [
                {name: this.$t('page.porfolio'), path: '/porfolio'},
                {name: this.$t('page.stake'), path: '/stake'},
                {name: this.$t('page.bond'), path: '/bond'}
            ];
        }
    },
    watch: {
        $route() {
            this.setNavActive();
        }
    },
    methods: {
        onLanguage(language) {
            const currentLanguage = language ? 'en' : 'zh-hans';
            this.$root.$i18n.locale = currentLanguage;
            this.$store.commit('app/SET_LANGUAGE', currentLanguage);
        },
        onTheme() {
            const themeName = this.$store.state.app.theme === 'light' ? 'dark' : 'light';
            window.document.body.className = themeName;
            this.$store.commit('app/SET_THEME', themeName);
        },
        async onLogin() {
            await this.$wallet.onConnect();
        },
        async onChange() {
            const web3Modal = this.$wallet.web3Modal;
            await web3Modal.clearCachedProvider();
            await web3Modal.toggleModal();
            if (web3Modal.cachedProvider) this.$wallet.onConnect();
            this.changeVisible = false;
        },
        setNavActive() {
            const currentPath = this.$route.path;
            const index = this.navs.findIndex(item => item.path === currentPath);
            if (index !== -1) this.navIndex = index;
        }
    }
};
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    -webkit-box-pack: justify;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    z-index: 2;
    .header-main {
        display: grid;
        grid-template-columns: 120px 1fr 120px;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        flex-direction: row;
        width: 100%;
        top: 0px;
        padding: 1rem;
        z-index: 21;
        position: relative;
    }
    .logo {
        font-size: 24px;
        cursor: pointer;
        width: fit-content;
        justify-content: flex-start;
    }
    .navigation {
        justify-content: flex-start;
        justify-self: center;
        width: fit-content;
        padding: 8px;
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        overflow: auto;
        align-items: center;
        background: #ffffff;
        box-shadow: 0px 30px 60px rgba(57, 57, 57, 0.1);
        border-radius: 12px;
        a {
            display: flex;
            flex-flow: row nowrap;
            outline: none;
            cursor: pointer;
            text-decoration: none;
            font-size: 16px;
            color: #9a9a9d;
            width: fit-content;
            font-weight: 500;
            padding: 8px 12px;
            word-break: break-word;
            background: #f7f8fa;
            border-radius: 12px;
            &.active {
                font-weight: 600;
                color: #662d91;
                background: rgba(217, 164, 252, 0.24);
            }
        }
    }
    .wallet {
        display: flex;
        flex-direction: row;
        -webkit-box-align: center;
        align-items: center;
        justify-self: flex-end;
        .flex-end {
            display: flex;
            align-items: center;
            flex: 1;
        }
        .account {
            border-color: #efeeee;
            border-radius: 16px;
            color: #333;
            font-size: 13px;
            padding: 15px 25px;
        }
        .button-theme,
        .more-theme {
            background: #efeeee;
            border-radius: 16px;
            border: none;
            color: #333;
        }
        .el-switch {
            margin: 0 12px;
        }
        .el-dropdown {
            margin-left: 10px;
        }
    }
}
.logout {
    text-align: center;
    .address {
        font-weight: 600;
        margin-bottom: 20px;
    }
}
</style>
