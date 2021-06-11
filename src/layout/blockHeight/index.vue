<template>
    <div class="blockHeight">
        <i class="el-icon-refresh"></i>
        <span>{{ $store.state.wallet.blockNumber }}</span>
    </div>
</template>
<script>
export default {
    components: {},
    computed: {}
};
</script>
<style lang="scss" scoped>
.blockHeight {
    position: fixed;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    right: 0px;
    bottom: 0px;
    padding: 1rem;
    color: #662d91;
    font-size: 12px;
    cursor: pointer;
    span {
        transition: opacity 0.25s ease 0s;
        opacity: 0.2;
        margin-left: 5px;
    }
    &:hover {
        span {
            opacity: 1;
        }
    }
}
</style>
