<style scoped>

</style>
<template>
    <div>
        <!--<Page :total="total" :current="currentPage" show-elevator-->
        <!--style="padding-bottom: 10px" size="small" @on-change="changePage"></Page>-->
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" :current="currentPage" show-elevator :page-size="100"
              style="padding-top: 10px" size="small" @on-change="changePage"></Page>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                total: 0,
                columns: [
                    {
                        title: '发送者',
                        key: 'sender',
                        width: 120
                    }, {
                        title: '文章',
                        key: 'title',
                        render: (h, params) => {
                            const row = params.row;
                            return h('ArticleLink', {
                                props: {
                                    href: '/bot/article?id=' + row.id,
                                    target: '_blank'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'article-view',
                                            params: {
                                                uid: row.id,
                                                title: row.title
                                            }
                                        });
                                        return false;
                                    }
                                }
                            }, row.title + (row.status ? ' [已发送]' : ''))
                        }
                    }, {
                        title: '时间',
                        key: 'created_at',
                        width: 100
                    }, {
                        title: '操作',
                        width: 250,
                        key: 'action',
                        render: (h, params) => {
                            const row = params.row;
                            return h('div', [h('Button', {
                                props: {type: 'text'},
                                on: {
                                    click: () => {
                                        this.sendToCutt(row);
                                    }
                                }
                            }, '发到发稿箱'),
                                h('Button', {
                                    props: {type: 'text'},
                                    on: {
                                        click: () => {
                                            this.$router.push({name: 'article-editor', params: {uid: row.id}});
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {type: 'text'},
                                    on: {
                                        click: () => {
                                            this.removeArticle(row);
                                        }
                                    }
                                }, '删除')]);
                        }
                    }
                ],

                data: [],

                loadData() {
                    this.$http.get('/bot/articles', {
                        params: {
                            name: this.$route.params.bot,
                            page: this.currentPage - 1
                        }
                    }).then(resp => {
                        this.data = resp.data.articles;
                        this.total = resp.data.total;
                    });
                }
            }
        },

        computed: {
            currentPage() {
                return this.$route.params.page || 1
            }
        },

        methods: {
            sendToCutt(row) {
                console.log(row);
                this.$http.post('/bot/send/cutt', {
                    name: this.$route.params.bot,
                    id: row.id
                }).then(() => {
                    row.status = 1;
                });
            },

            removeArticle(row) {
                let vm = this;
                vm.$Modal.confirm({
                    content: `确认要删除【${row.title}】吗？`,
                    onOk: () => {
                        vm.$http.post('/bot/article/remove', {
                            id: row.id
                        }).then(() => {
                            vm.data.splice(vm.data.indexOf(row), 1)
                        });
                    }
                })
            },
            changePage(page) {
                this.$router.push({
                    name: 'bot-articles-page',
                    params: {
                        page: page
                    }
                })
            }
        },

        mounted() {
            this.loadData();
        },

        watched: {
            currentPage() {
                this.loadData();
            }
        }
    };
</script>