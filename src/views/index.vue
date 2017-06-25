<style scoped>
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }

    .banner {
        height: 60px;
    }
</style>
<template>
    <div class="index">
        <Row>
            <i-col :span="24">
                <div class="banner">
                    <h1>管理系统</h1>
                </div>
            </i-col>
        </Row>
        <Row type="flex">
            <i-col :span="4">
                <h2>机器人列表
                    <Button @click="addBot">添加一个</Button>
                </h2>
                <Menu width="auto" @on-select="setCurrentBot" :active-name="currentBot">
                    <Menu-item v-for="item in bots"
                               :key="item" :name="item">{{item}}
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="18">
                <router-view></router-view>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import Util from '../libs/util';

    export default {
        data() {
            return {
                bots: []
            }
        },
        computed: {
            currentBot: {
                get() {
                    return this.$store.state.currentBot;
                },
                set(bot) {
                    this.$store.commit('open', bot);
                }
            }
        },
        methods: {
            addBot() {
                this.$router.push({name: 'bot-add'});
            },
            setCurrentBot(bot) {
                this.currentBot = bot;
            },

            loadBot(){
                if (this.bots.indexOf(this.currentBot) === -1) {
                    this.loadBots();
                }
                this.$router.push({name: 'bot-info', params: {bot: this.currentBot}});
                Util.title(this.currentBot);
            },

            loadBots() {
                this.$http.get('/bot/bots')
                    .then(resp => {
                        this.bots = resp.data.bots
                    });
            },

            handleStart() {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            }
        },

        watch: {
            currentBot() {
                this.loadBot();
            }
        },

        mounted() {
            this.loadBots()
        }
    };
</script>