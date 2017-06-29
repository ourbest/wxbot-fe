<style scoped>
    .intro {
        text-align: left;
        padding: 50px;
        font-size: 16px;
    }

    .intro h3 {
        margin-bottom: 20px;
    }

    .intro h2 {
        padding-bottom: 50px;
    }

    .intro ol {
        list-style: decimal;
        padding-left: 40px;
    }

    .into-doc {
        margin: auto;
        margin-top: 20px;
        padding: 20px;
    }
</style>
<template>
    <div class="intro">
        <h2>订阅号文章抓取管理中心</h2>

        <div>
            请从左侧选择添加账号进入查看，或者<a href="#" @click="$router.push('/add')">添加一个新账号</a>
            <Alert type="info" class="into-doc">
                <h3>添加步骤</h3>
                <span slot="desc">
                    <ol>
                        <li>选择添加</li>
                        <li>使用微信扫描屏幕二维码</li>
                        <li>确认登录</li>
                        <li>登录成功之后，显示微信的基本状态，可以设置抓取的参数</li>
                        <li>监控人用于监控所有机器人的状态，机器人状态发生改变时，会第一时间通知监控人</li>
                        <li>系统只允许有一个监控人，
                            并且替换监控人时，将发送微信消息给监控人，微信确认之后才能替换。
                        </li>
                    </ol>
                </span>
            </Alert>

        </div>
    </div>
</template>
<script>
    export default {};
</script>