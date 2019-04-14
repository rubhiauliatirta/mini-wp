Vue.component('article-list', {
    props:["articles","type", "needPublished"],
    methods:{
        deleteSuccess(articleId){
            this.$emit("on-delete-success", articleId)
        },
        setEditArticle(article){
            this.$emit("on-edit-article",article)
        }
    },
    template: `
    <div>
        <div v-if="this.type === 'page'">
            <div v-for="(article) in articles">
                <article-page class="m-4 p-4 article-view" v-if="article.isPublished"
                    :article="article">
                </article-page>
            </div>
        </div>
        <div v-if="this.type === 'data'">
            <div role="tablist">
                <div v-for="(article, index) in articles">
                    <article-data v-if="article.isPublished == needPublished"
                        :article="article"
                        :index="index"
                        @set-edit-article="setEditArticle"
                        @delete-success="deleteSuccess">
                    </article-data>
                </div>
            </div>
        </div>
    </div>      
    `,
});