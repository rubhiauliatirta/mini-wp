Vue.component('article-data', {
    props:["index", "article"],
    methods:{
        editArticle(article){
            this.$emit("set-edit-article",article)
        },
        deleteArticle(articleId){
            //swal confirmation
            //send articleId to filter myArticle
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
                if (result.value) {  
                    return myaxios({
                       method:'DELETE',
                       url: `/articles/${articleId}`,
                    })
                }else{
                    throw new Error("delete canceled")
                }
            })
            .then(result=>{
                this.$emit("delete-success", articleId)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            })
            .catch(function (error) {
                handleAxiosError(error)
            })
            
        }
    },
    template: `      
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1 d-flex flex-row justify-content-between align-items-center" role="tab">
        <p class="m-2">{{article.title}}</p>
        <div class="d-flex flex-row">
          <b-button class="mr-2" v-b-toggle="'accordion-'+index"><i class="fa fa-eye"></i></b-button>
          <b-button @click="editArticle(article)" v-b-modal.mymodal class="mr-2"><i class="fa fa-edit"></i></b-button>
          <b-button @click="deleteArticle(article._id)" class="mr-2"><i class="fa fa-trash-alt"></i></b-button>
        </div>
      </b-card-header>
      <b-collapse v-bind:id="'accordion-'+index" accordion="my-accordion" role="tabpanel">
        <b-card-body>
            <article-page :article="article"></article-page>
        </b-card-body>
      </b-collapse>
    </b-card>
    `,
});