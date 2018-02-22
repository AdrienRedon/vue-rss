<template>
    <div class="feed">
        <h2 class="title is-2">{{ name }}</h2>
        <ul class="articles">
            <article-link class="article-link" v-for="article in articles" :article="article"></article-link>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import ArticleLink from './ArticleLink.vue';

    const api = 'http://localhost:1337/api';

    export default {
        props: ['name'],
        components: {
            ArticleLink,
        },
        data () {
            return {
                feeds: [
                    'http://feeds.feedburner.com/TechCrunch/',
                    'https://korben.info/feed',
                    'http://rss.liberation.fr/rss/latest/'
                ],
                articles: []
            }
        },
        created () {
            this.articles = JSON.parse(localStorage.getItem('articles')) || [];
            this.feeds.map(url => {
                axios.post(api+'/fetch', { url })
                    .then(response => {
                        const articles = response.data;
                        if (articles.length) {
                            this.articles = articles;
                            localStorage.setItem('articles', JSON.stringify(this.articles));
                        }
                        this.articles.map(article => {
                            return { ...article, isVisible: false };
                        })
                    }
                );
            });
        }
    }
</script>

<style scoped>
    .feed {
        background-color: #eee;
        padding: 20px;
    }

    .articles {
        list-style-type: none;
    }

    .article-link {
        font-size: 1.1rem;
        padding: 5px;
    }
</style>
