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
                        'title': '名称',
                        'key': 'name',
                        'width': 120
                    }, {
                        'title': '性别',
                        'key': 'sex',
                        'width': 60
                    }, {
                        'title': '省份',
                        'key': 'province',
                        'width': 100
                    }, {
                        'title': '城市',
                        'width': 100,
                        'key': 'city'
                    }, {
                        'title': '备注',
                        'width': 120,
                        'key': 'remark_name'
                    }, {
                        'title': '签名',
                        'key': 'signature'
                    }
                ],

                data: []
            }
        },

        mounted() {
            this.$http.get('/bot/friends', {
                params: {
                    name: this.$route.params.bot
                }
            }).then(resp => {
                this.data = resp.data.friends;
            });
        }
    };
</script>