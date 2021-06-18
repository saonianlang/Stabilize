<template>
    <div class="card-container stake">
        <div class="hd">
            <div @click="tabIndex = 0" :class="['tab', tabIndex === 0 ? 'active' : '']">Stake</div>
            <div @click="tabIndex = 1" :class="['tab', tabIndex === 1 ? 'active' : '']">Unstake</div>
        </div>
        <div class="bd">
            <stake v-if="tabIndex === 0"></stake>
            <un-stake v-else></un-stake>
        </div>
    </div>
</template>
<script>
import Stake from './components/stake';
import UnStake from './components/unstake';
export default {
    components: {
        Stake,
        UnStake
    },
    data() {
        return {
            tabIndex: 1
        };
    }
};
</script>
<style lang="scss" scoped></style>
