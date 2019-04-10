
// $(document).ready(function(){
//     $("#content").css({
//         "margin-left" : `${$("#sidebar").outerWidth(true)}px`
//     })

// })
var baseurl = "http://localhost:3000"

const app = new Vue({
    el:"#app",
    created(){
        this.sidebar.width = "300px";
        this.divId = 1;
        axios.get(baseurl+'/articles', {})
          .then( (response)=> {
            // console.log(response);
            this.articles = response.data
          })
          .catch(function (error) {
            // console.log(error);
          })
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    computed:{
        contentMargin(){
            return (Number(this.sidebar.width.split("px")[0])+10)+"px"
        },
        publishedArticleLength(){

            return `Published ${this.articles.filter(x=> x.isPublished === true).length} articles`
        },
    },
    watch:{
        searchQuery: function(q){
            
            this.divId = 4;
            axios.get(baseurl+'/articles?title_like='+q, {})
            .then( (response)=> {
              // console.log(response);
              console.log(response.data)
              this.searchResult = response.data;
            })
            .catch(function (error) {
              // console.log(error);
            })
        }
    },
    data:{
        articles:[],
        searchResult:[],
        searchQuery:"",
        sidebar:{
            width: "",
        },
        divId: -1,
        modalTitle:"",
        modalText:"",
        modalTags:"",
        modalError:"",
        modalDeleteId:false,
        modalEditedid:false,
        _articleData:{}
    },
    methods:{
        _modalValidation(title,text){
            if(title.trim()===""){
                this.modalError = "Title is empty"
                return false
            }
            if(text.trim()===""){
                this.modalError = "Content is empty"
                return false
            }
        },
        _updateArticle(id, article){
            axios.patch(baseurl+'/articles/'+id, article)
            .then( (response)=> {
                // console.log(response);
                let clientArticle =  this.articles.find(art => art.id === id)

                //update article data in client
                for(let key in article){
                    clientArticle[key] = article[key];
                }
                this.closeModal();
            })
            .catch(function (error) {
                console.log(error.response)
              this.modalError = error.message
            })
        },
        _createArticle(article){
            console.log("masuk sini")
            
            axios.post(baseurl+'/articles', article)
            .then( (response)=> {

              this.articles.push(response.data) 
              this.closeModal();
            })
            .catch(function (error) {           
                console.log(error)
                console.log(error.response.data.message);
            })
        },
        _getArticleData(isPublish){
            return {
                title: this.modalTitle,
                content: this.modalText,
                tags: this.modalTags.split(","),
                isPublished: isPublish
            }
        },
        addData(id){
            console.log("ini id", id)
        },
        closeModal(){
            this.modalTitle="";
            this.modalText="";
            this.modalTags="";
            this.modalEditedid=false;
            this.$refs['my-modal'].hide()
        },
        draftBtnModal(id){
            if(id){
                this._updateArticle(id,this._getArticleData(false))
            }else{
                this._createArticle(this._getArticleData(false));
            }
        },
        publishBtnModal(id){

            if(id){
                this._updateArticle(id,this._getArticleData(true))
            }else{
                this._createArticle(this._getArticleData(true));
            }
        
        },
        deleteArticle(){
            event.preventDefault()
            axios.delete(baseurl+'/articles/'+this.modalDeleteId)
            .then( (response)=> {
                this.articles = this.articles.filter(x=>x.id !== this.modalDeleteId)
                this.modalDeleteId=false;
            })
            .catch(function (error) {
              this.modalError = error.data.message
            })
        },
        setDeleteId(id){
            this.modalDeleteId = id;
        },
        setEditId(id,article){
            this.modalTitle = article.title;
            this.modalText = article.content;
            this.modalTags = article.tags.join(",")
            this.modalEditedid = id;
        }
    }
})

function modalValidation(title,text){

}