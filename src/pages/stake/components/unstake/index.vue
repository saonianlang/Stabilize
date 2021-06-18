<template>
    <div class="tabStake">
        <div class="amount">
            <div class="name">{{ $t('page.amount') }}</div>
            <el-input :disabled="loading" :placeholder="userBalance" v-model="value"></el-input>
            <el-button class="max" @click="value = userBalance">{{ $t('page.max') }}</el-button>
        </div>
        <div class="info">
            <div class="item">
                <p class="label">Balance</p>
                <p class="value">0.0 GRO</p>
            </div>
            <div class="item">
                <p class="label">Staked</p>
                <p class="value">0.0 GRO</p>
            </div>
            <div class="item">
                <p class="label">Time until rebase</p>
                <p class="value">5hrs, 57 mins</p>
            </div>
            <div class="item">
                <p class="label">Next rebase</p>
                <p class="value">0.6219%</p>
            </div>
            <div class="item">
                <p class="label">ROI (5-day rate)</p>
                <p class="value">9.7123%</p>
            </div>
            <div class="item">
                <p class="label">APY</p>
                <p class="value">88372.7123%</p>
            </div>
            <div class="item">
                <p class="label">Current index</p>
                <p class="value">3.6454 GRO</p>
            </div>
        </div>
        <div class="btns">
            <el-button v-if="isApprove" :loading="loading" @click="sendTransaction" type="primary" class="btn" round>
                {{ $t('page.subscribe') }}
            </el-button>
            <el-button v-else type="primary" :loading="loading" class="btn" @click="setApprove" round>{{ $t('page.authorize') }}</el-button>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            value: '',
            userBalance: 0,
            loading: false,
            isApprove: false
        };
    },
    methods: {
        sendTransaction() {},
        setApprove() {}
    }
};
</script>
<style lang="scss" scoped></style>
