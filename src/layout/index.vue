<template>
    <div class="app-wrapper">
        <mheader></mheader>
        <div class="main-container">
            <router-view tag="main" />
        </div>
        <block-height></block-height>
    </div>
</template>
<script>
import Mheader from './header';
import BlockHeight from './blockHeight';
export default {
    components: {
        Mheader,
        BlockHeight
    },
    computed: {}
};
</script>
<style lang="scss" scoped>
.app-wrapper {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
}
.main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 120px;
    -webkit-box-align: center;
    align-items: center;
    flex: 1 1 0%;
    z-index: 1;
    position: relative;
}
</style>
