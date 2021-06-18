<template>
    <div class="card-container porfolio">
        <div class="hd">
            <div class="title">Wallet Balance</div>
        </div>
        <div class="bd">
            <ul>
                <li>
                    <div class="icon">
                        <svg-icon icon-class="gyro" />
                    </div>
                    <div class="text">
                        <div class="bold">Gyro</div>
                        <p>1 Gyro = $1 USD</p>
                    </div>
                    <div class="num">
                        <div class="bold">10 Gyro</div>
                        <p>= 0.02 USD</p>
                    </div>
                </li>
                <li>
                    <div class="icon">
                        <svg-icon icon-class="gyro" />
                    </div>
                    <div class="text">
                        <div class="bold">Gyro</div>
                        <p>1 Gyro = $1 USD</p>
                    </div>
                    <div class="num">
                        <div class="bold">10 Gyro</div>
                        <p>= 0.02 USD</p>
                    </div>
                </li>
                <li>
                    <div class="icon">
                        <svg-icon icon-class="gyro" />
                    </div>
                    <div class="text">
                        <div class="bold">Gyro</div>
                        <p>1 Gyro = $1 USD</p>
                    </div>
                    <div class="num">
                        <div class="bold">10 Gyro</div>
                        <p>= 0.02 USD</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script></script>
<style lang="scss" scoped>
.card-container {
    ul li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        margin-bottom: 15px;
        .icon {
            width: 32px;
            svg {
                font-size: 32px;
            }
        }
        .text {
            flex: 1;
            text-align: left;
            margin-left: 8px;
        }
        .bold {
            font-weight: 600;
            font-size: 14px;
            color: #000;
            margin-bottom: 5px;
        }
        p {
            font-size: 10px;
            color: #666;
        }
        .num .bold {
            color: #9a9a9d;
        }
    }
}
</style>
