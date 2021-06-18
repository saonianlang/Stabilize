<template>
    <div class="card-container private">
        <div class="hd">
            <div class="title">{{ $t('page.private') }}</div>
        </div>
        <div class="bd">
            <div class="amount">
                <div class="name">{{ $t('page.amount') }}</div>
                <el-input :disabled="loading" :placeholder="userBalance" v-model="value"></el-input>
                <el-button class="max" @click="value = userBalance">{{ $t('page.max') }}</el-button>
            </div>
            <div class="info">
                <div class="item">
                    <p class="label">{{ $t('page.yourPrivateAmount') }}</p>
                    <p class="value">{{ userSum }} pGRO</p>
                </div>
            </div>
            <div class="btns">
                <el-button v-if="isApprove" :loading="loading" @click="sendTransaction" type="primary" class="btn" round>
                    {{ $t('page.subscribe') }}
                </el-button>
                <el-button v-else type="primary" :loading="loading" class="btn" @click="setApprove" round>{{ $t('page.authorize') }}</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {utils, BigNumber, constants} from 'ethers';
import {POOLS_ADDRESS} from '@/connectors/config';

export default {
    components: {},
    data() {
        return {
            value: '',
            lumpSum: 0,
            userSum: 0,
            userBalance: 0,
            isApprove: false,
            loading: false
        };
    },
    mounted() {},
    watch: {
        '$store.state.wallet.provider': function() {
            this.getApprove();
        },
        '$store.state.wallet.blockNumber': {
            immediate: true,
            handler() {
                this.getPrivatePlacementNumber();
            }
        }
    },
    methods: {
        // transaction
        async sendTransaction() {
            const {poolContract} = this.$store.state.wallet;
            try {
                this.loading = true;
                const tx = await poolContract.buyGyro(utils.parseUnits(this.value, 6)); // 进行交易
                const status = await tx.wait();
                console.log(status);
                this.loading = false;
                this.value = '';
                this.$message.success(this.$t('page.transactionSuccess'));
            } catch (error) {
                console.log(error);
                this.loading = false;
                this.$message.error(this.$t('page.transactionFailed'));
            }
        },
        // Get an authorization
        async getApprove() {
            const {usdtContract, account} = this.$store.state.wallet;
            try {
                const isQuota = await usdtContract.allowance(account, POOLS_ADDRESS.privatePlacement);
                if (BigNumber.isBigNumber(isQuota)) this.isApprove = true;
            } catch (error) {
                console.log(error);
                this.$message.error(this.$t('page.getAuthorizeFailed'));
            }
        },
        //  Authorize
        async setApprove() {
            const {usdtContract} = this.$store.state.wallet;
            try {
                this.loading = true;
                const quota = await usdtContract.approve(POOLS_ADDRESS.privatePlacement, constants.MaxUint256);
                if (BigNumber.isBigNumber(quota)) this.isApprove = true;
                this.loading = false;
                this.$message.success(this.$t('page.authorizationSuccess'));
            } catch (error) {
                this.loading = false;
                console.log(error);
                this.$message.error(this.$t('page.authorizationFailed'));
            }
        },
        // Get the total display
        async getPrivatePlacementNumber() {
            const {tokenContract, usdtContract, account} = this.$store.state.wallet;
            if (!tokenContract || !usdtContract) return;
            try {
                // Get the total amount of equity
                // const total = await tokenContract.balanceOf(POOLS_ADDRESS.privatePlacement);
                // Get the current user equity total
                const userTotal = await tokenContract.balanceOf(account);
                // Get my USDT balance
                const userUsdt = await usdtContract.balanceOf(account);
                // this.lumpSum = (1000000000 - parseFloat(utils.formatEther(total))).toFixed(2);
                this.userSum = parseFloat(utils.formatEther(userTotal)).toFixed(2);
                this.userBalance = parseFloat(utils.formatUnits(userUsdt, 6)).toFixed(2);
            } catch (error) {
                console.log(error);
                this.$message.error(this.$t('page.getPrivateFailed'));
            }
        }
    }
};
</script>
<style lang="scss"></style>
