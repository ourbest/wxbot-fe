<style scoped>

</style>
<template>
    <a :href="href" :target="target" @click.prevent="articleClicked">
        <slot></slot>
    </a>
</template>
<script>
    export default {
        props: {
            href: {
                default: "javascript:void(0);"
            },
            target: {
                default: ""
            }
        },

        methods: {
            articleClicked(e) {
                this.$emit('click', e);
            }
        }
    };
</script>