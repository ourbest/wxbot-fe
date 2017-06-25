<style scoped>

</style>
<template>
    <div>
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        'title': '聊天',
                        'key': 'chat',
                        'width': 120
                    }, {
                        'title': '发送者',
                        'key': 'sender',
                        'width': 120
                    }, {
                        'title': '类型',
                        'key': 'type',
                        'width': 80
                    }, {
                        'title': '消息',
                        'key': 'message'
                    }, {
                        'title': '时间',
                        'key': 'created_at',
                        'width': 100
                    }
                ],

                data: []
            }
        },

        mounted() {
            this.$http.get('/bot/messages', {
                params: {
                    name: this.$route.params.bot
                }
            }).then(resp => {
                this.data = resp.data.messages;
            });
        }
    };
</script>