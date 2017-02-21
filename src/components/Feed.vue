<template>
    <div class="feed">
        <h2 class="title is-2">{{ name }}</h2>
    </div>
</template>

<script>
    import axios from 'axios';
    const api = 'http://localhost:1337';

    export default {
        props: ['name'],
        data () {
            return {
                feeds: [
                    'http://feeds.feedburner.com/TechCrunch/',
                    'https://korben.info/feed'
                ]
            }
        },
        created () {
            this.feeds.map(url => {
                axios.post(api+'/fetch', { url })
                    .then(response => console.log(response));
            });
        }
    }
</script>

<style scoped>
    .feed {
        background-color: #ddd;
        padding: 20px;
    }
</style>