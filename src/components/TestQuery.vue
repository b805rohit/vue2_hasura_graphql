<template>
    <div>
        I m Test Query
        <button @click="fetchUsers">Fetch Users</button>

        <div>
            <span v-if="getUsers.loading">Loading...</span>
            <span v-else-if="getUsers.error">{{getUsers.error}}</span>
            <span v-else-if="getUsers.data.length">{{getUsers.data}}</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        methods: {
            async fetchUsers() {
                await this.$store.dispatch('fetchUsers')
            }
        },
        computed: {
            ...mapGetters(['getUsers'])
        },
    }
</script>

<style lang="scss" scoped>

</style>