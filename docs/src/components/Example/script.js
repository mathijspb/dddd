export default {
    props: ['data'],

    computed: {
        code() {
            return this.data.code.trim();
        },
    },

    mounted() {
        this.data.dddd(this.$refs['dddd-container']);
    },
};
