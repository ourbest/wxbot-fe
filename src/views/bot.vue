<style scoped>
    .margin {
        margin: 10px;
    }
</style>
<template>
    <div>
        <h2>机器人 【{{bot}}】</h2>
        <Menu mode="horizontal" :active-name="menu" @on-select="openInfo">
            <Menu-item name="info">基本信息</Menu-item>
            <Menu-item name="friends">好友</Menu-item>
            <Menu-item name="mps">公众号</Menu-item>
            <Menu-item name="groups">群聊</Menu-item>
            <Menu-item name="messages">消息</Menu-item>
            <Menu-item name="articles">文章</Menu-item>
        </Menu>
        <div class="margin">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            menu() {
                const path = this.$route.path;
                return path.substr(path.lastIndexOf('/') + 1)
            },

            bot() {
                return this.$route.params.bot;
            }
        },


        methods: {
            openInfo(name) {
                this.$router.push({
                    'name': 'bot-' + name,
                    'params': {
                        bot: this.bot
                    }
                })
            }
        }
    };
</script>