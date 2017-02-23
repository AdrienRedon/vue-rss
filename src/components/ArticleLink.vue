<template>
    <div>
        <li class="article-link" @click="isVisible = true">{{ article.title }}</li>
        <article-content @close="isVisible = false" :article="article" v-if="isVisible"></article-content>
    </div>
</template>

<script>
    import ArticleContent from './ArticleContent.vue';

    export default {
        data () {
            return {
                isVisible: false
            }
        },
        components: {
            ArticleContent,
        },
        props: ['article']
    }
</script>

<style scoped>
    .article-link {
        cursor: pointer;
    }
</style>