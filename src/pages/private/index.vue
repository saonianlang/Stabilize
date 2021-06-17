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
                    <p class="value">{{ userSum }} GYRO</p>
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
<style lang="scss">
.card-container {
    position: relative;
    max-width: 480px;
    width: 100%;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    border-radius: 24px;
    margin-top: 1rem;
    .hd {
        padding: 0.8rem 1.25rem 0.6rem;
        color: rgb(86, 90, 105);
        display: flex;
        border-bottom: 1px solid #eee;
        .title {
            color: $--color-text-primary;
            font-weight: bold;
            font-size: 18px;
            line-height: 30px;
        }
    }
    .bd {
        position: relative;
        padding: 1rem;
        .amount {
            background: #f8fbff;
            border-radius: 32px;
            padding: 20px;
            position: relative;
            .name {
                font-size: 14px;
                color: #666;
                margin-bottom: 10px;
                padding: 0 15px;
            }
            .el-input__inner {
                height: 40px;
                line-height: 40px;
                border: none;
                background: transparent;
                font-weight: bold;
                font-size: 24px;
            }
            .max {
                background: linear-gradient(38.17deg, rgba(6, 226, 255, 0.24) 16.63%, rgba(217, 164, 252, 0.24) 91.34%);
                border-radius: 20px;
                border: none;
                position: absolute;
                bottom: 20px;
                right: 20px;
                padding: 13px 30px;
                color: #0ac2f2;
            }
        }
        .info {
            margin: 2.6rem 3rem;
            .item {
                display: flex;
                line-height: 17px;
                margin-bottom: 15px;
                .label {
                    flex: 1;
                    color: #9a9a9d;
                    font-weight: 600;
                    font-size: 14px;
                }
                .value {
                    flex: 1;
                    color: #666666;
                    font-weight: 600;
                    text-align: right;
                    font-size: 14px;
                }
            }
        }
        .btns {
            .btn {
                background: linear-gradient(44.07deg, #06e2ff -15.07%, #d9a4fc 62.8%);
                border-radius: 20px;
                width: 100%;
                color: #ffffff;
                font-size: 16px;
                border: none;
                padding: 18px 20px;
            }
        }
    }
}
</style>
