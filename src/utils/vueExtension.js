import WalletConnection from '@/connectors';
import Vue from 'vue';

Vue.prototype.$wallet = new WalletConnection();
