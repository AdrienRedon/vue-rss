<template>
    <div class="app">
        <sidebar class="aside"></sidebar>
        <feed class="content" :name="feed"></feed>
    </div>
</template>

<script>
    import Feed from './components/Feed.vue';
    import Sidebar from './components/Sidebar.vue';
    export default {
        name: 'app',
        components: { 
            Feed,
            Sidebar,
        },
        data () {
            return {
                feed: 'All'
            }
        }
    }
</script>

<style scoped>
    .app {
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        height: 100vh;
    }

    .aside, .content {
        height: 100vh;
        overflow-y: auto;
    }

    .content {
        flex: 1;
    }
</style>
