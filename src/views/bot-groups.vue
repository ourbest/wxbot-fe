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
                        'key': 'name'
                    }, {
                        'title': '群主',
                        'key': 'owner'
                    }, {
                        'title': '人数',
                        'width': 100,
                        'key': 'members'
                    }
                ],

                data: []
            }
        },

        mounted() {
            this.$http.get('/bot/groups', {
                params: {
                    name: this.$route.params.bot
                }
            }).then(resp => {
                this.data = resp.data.groups;
            });
        }
    };
</script>