<style scoped>
    .qr {
        margin: auto
    }
</style>
<template>
    <div class="qr">
        <img :src="qr">
        <p>{{message}}</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                message: '请扫描二维码',
                qr: '/bot/qr?t=' + (new Date().getTime())
            }
        },

        methods: {
            getQRStatus() {
                if (this.loading) {
                    this.$http.get('/bot/qr/status')
                        .then(resp => {
                            this.message = resp.data.message;
                            switch (resp.data.code) {
                                case '200':
                                    this.$store.commit('open', resp.data.name);
                                    break;
                                case '201':
                                    setTimeout(this.getQRStatus, 500);
                                    break;
                                //case '408':
                                default:
                                    this.qr = '/bot/qr?t=' + (new Date().getTime());
                                    setTimeout(this.getQRStatus, 500);
                            }
                        });
                }
            }
        },

        mounted() {
            // timer
            this.loading = true;
            this.getQRStatus();
//            this.timer = setInterval(this.getQRStatus, 1000);
        },

        beforeDestroy() {
            this.loading = false;
//            clearInterval(this.timer);
        },
    };
</script>