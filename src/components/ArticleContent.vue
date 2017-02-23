<template>
    <div class="article-container">
        <div @click="$emit('close')" class="overlay"></div>
        <div class="article">
            <h3 class="title is-3">{{ article.title }}</h3>
            <p v-html="article.content"></p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['article'],
    }
</script>

<style scoped>
    .article-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        justify-content: flex-end;
    }
    .overlay {
        height: 100vh;
        flex: 1;
        opacity: .6;
        background: #000;
    }
    .article {
        height: 100vh;
        width: 900px;
        min-width: 75%;
        background: #fff;
        padding: 20px;
    }

    @media screen and (max-width: 1000px) {
        .article {
            width: 100%;
        }
    }
</style>