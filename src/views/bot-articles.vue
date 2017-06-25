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
                        'title': '发送者',
                        'key': 'sender',
                        'width': 120
                    }, {
                        'title': '文章',
                        'key': 'title',
                        render(h, params) {
                            const row = params.row;
                            return h('a', {
                                attrs: {
                                    href: '/bot/article?id=' + row.id,
                                    target: '_blank'
                                }
                            }, row.title)
                        }
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
            this.$http.get('/bot/articles', {
                params: {
                    name: this.$route.params.bot
                }
            }).then(resp => {
                this.data = resp.data.articles;
            });
        }
    };
</script>