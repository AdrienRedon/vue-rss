<template>
    <div class="feed">
        <h2 class="title is-2">{{ name }}</h2>
        <ul>
            <li v-for="article in articles">{{ article.title }}</li>
        </ul>
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
                    'https://korben.info/feed',
                    'http://rss.liberation.fr/rss/latest/'
                ],
                articles: []
            }
        },
        created () {
            this.feeds.map(url => {
                axios.post(api+'/fetch', { url })
                    .then(response => this.articles = [...this.articles, ...response.data]);
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