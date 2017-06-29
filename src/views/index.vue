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
        margin-top: 20px;
    }

    .menu {
        padding-top: 100px;
        position: fixed;
        height: 100%;
        background-color: #f8f8f9 !important;
    }

    .menu .ivu-menu-light {
        background-color: transparent !important;
    }

    .menu .ivu-menu-vertical.ivu-menu-light:after {
        width: 0;
    }
</style>
<template>
    <div class="index">
        <Row type="flex">
            <i-col :span="3" class="menu">
                <h2 style="padding-bottom: 12px">机器人列表
                    <Button @click="addBot" size="small">添加一个</Button>
                </h2>
                <Menu width="auto" @on-select="setCurrentBot" :active-name="currentBot">
                    <Menu-item v-for="item in bots"
                               :key="item" :name="item">{{item}}
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="18" :push="3">
                <div class="banner">
                    <h1>管理系统 <span v-if="master">监控微信 - {{master}}</span></h1>
                </div>
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
                bots: [],
                master: ''
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
            },

            reload() {
                return this.$store.state.reload;
            }
        },

        methods: {
            addBot() {
                this.$router.push({name: 'bot-add'});
            },
            setCurrentBot(bot) {
                if (this.currentBot === bot) {
                    this.loadBot();
                }
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
                        this.master = resp.data.master
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
            },

            reload() {
                this.loadBots();
            }
        },

        mounted() {
            this.loadBots()
        }
    };
</script>