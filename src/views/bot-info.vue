<style scoped>

</style>
<template>
    <div>
        <pre>{{info}}</pre>
        <Button @click="logoutBot" type="primary">注销</Button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info: ''
            }
        },
        computed: {
            bot() {
                return this.$route.params.bot;
            }
        },

        methods: {
            logoutBot() {
                this.$http.get('/bot/logout', {
                    params: {
                        name: this.bot
                    }
                }).then(() => {
                    this.$router.push('/')
                });
            }
        },

        mounted() {
            this.$http.get('/bot/info', {
                params: {
                    name: this.bot
                }
            }).then(resp => {
                this.info = resp.data.friends;
            })
        }
    };
</script>