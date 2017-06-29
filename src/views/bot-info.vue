<style scoped>
    .settings {
        width: 400px;
        margin: auto;
    }

    .settings .switch {
        float: right
    }

    .settings li {
        display: block;
        clear: both;
        padding: 5px;
    }
</style>
<template>
    <div>
        <div class="settings">
            <Alert type="info">
                设置
                <span slot="desc">
                <ul>
                    <li>自动接收好友<span class="switch"><i-switch v-model="autoAccept" @on-change="changeAccept"></i-switch></span></li>
                    <li>抓取公众号文章<span class="switch"><i-switch v-model="crawlerArticles"
                                                              @on-change="changeCrawlerArticles"></i-switch></span></li>
                    <li>自动发送抓取的文章<span class="switch"><i-switch v-model="autoSend"
                                                                @on-change="changeAutoSend"></i-switch></span></li>
                    <li>AppID<span class="switch">
                        <Row type="flex"><i-col><i-input v-model.lazy="appId"></i-input></i-col><i-col><Button
                                @click="saveAppId">保存</Button></i-col></Row></span> </li>
                </ul>
                </span>
            </Alert>
        </div>
        <pre>{{info}}</pre>
        <Button @click="logoutBot" type="primary">注销</Button>
        <Button @click="setAsMaster" type="error">设置为监控人</Button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                autoAccept: false,
                crawlerArticles: false,
                autoSend: false,
                info: '',
                appId: null
            }
        },
        computed: {
            bot() {
                return this.$route.params.bot;
            }
        },

        methods: {
            changeAccept() {
                this.$http.post('/bot/config', {
                    name: this.bot,
                    key: 'auto_accept',
                    value: !!this.autoAccept
                }).then(resp => {
                    this.$Message.info(resp.data.message)
                });
            },
            changeCrawlerArticles() {
                this.$http.post('/bot/config', {
                    name: this.bot,
                    key: 'crawler_articles',
                    value: !!this.crawlerArticles
                }).then(resp => {
                    this.$Message.info(resp.data.message)
                })
            },
            changeAutoSend() {
                this.$http.post('/bot/config', {
                    name: this.bot,
                    key: 'auto_send',
                    value: !!this.autoSend
                }).then(resp => {
                    this.$Message.info(resp.data.message)
                })
            },

            saveAppId() {
                this.$http.post('/bot/config', {
                    name: this.bot,
                    key: 'app_id',
                    value: this.appId
                }).then(resp => {
                    this.$Message.info(resp.data.message)
                })
            },
            logoutBot() {
                this.$http.get('/bot/logout', {
                    params: {
                        name: this.bot
                    }
                }).then(() => {
                    this.$router.push('/')
                });
            },

            setAsMaster() {
                this.$http.get('/bot/master/assign', {
                    params: {
                        name: this.bot
                    }
                }).then(resp => {
                    if (resp.data.code === 0) {
                        this.$store.commit('reload');
                        this.$store.commit('login', '');
                        this.$router.push('/');
                    } else {
                        this.$Message.info(resp.data.message);
                    }
                });
            }
        },

        mounted() {
            if (this.bot === '') {
                this.$router.push("/");
            } else {
                this.$http.get('/bot/info', {
                    params: {
                        name: this.bot
                    }
                }).then(resp => {
                    this.info = resp.data.friends;
                    this.autoAccept = resp.data.config.auto_accept;
                    this.appId = resp.data.config.app_id;
                    this.crawlerArticles = resp.data.config.crawler_articles;
                })
            }
        }
    };
</script>