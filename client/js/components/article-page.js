Vue.component('article-page', {
    props:["article"],
    computed:{
        getCreatedDate(){
            return new Date(this.article.createdAt).toLocaleString();
        }
    },
    template: `
    <div>
          
        <h1>{{article.title}}</h1>
        <small>{{getCreatedDate}}</small>
        <br>
        <hr>
        <img :src="article.featured_image" alt="article-img" style="height:250px">   
        <div v-html="article.content"></div>
        <div id="article-tag" class="d-flex flex-row">
          <b-badge variant="dark" class="mr-2" v-for="tag in article.tags">{{tag}}</b-badge>
        </div>
    </div>
    `,
});