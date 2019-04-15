
// const User = {
//     template: '<div>{{ $route.params.username }}</div>',

//   }
  
//   const router = new VueRouter({
//     routes: [
//       // dynamic segments start with a colon
//     //   { path: '/user/:username/post/:slug', component: User }
//     { path: '/user/:username', component: User }
//     ]
//   })
  
//   Vue.use(router)
const app = new Vue({
    el:"#app",
    // router,
    created(){
   
        this.sidebar.width = "300px";
        this.divId = 1;
        
        if(localStorage.token){
            myaxios.defaults.headers.common['Authorization'] = localStorage.token;
            this.isLogin = true
            this.getUser()
            
        }else{
            this.isLogin = false
        }
    },
    computed:{
        contentMargin(){
            return (Number(this.sidebar.width.split("px")[0])+10)+"px"
        },
        publishedArticleLength(){
            return `Published ${this.myArticles.filter(x=> x.isPublished === true).length} articles`
        },
    },
    watch:{
        isLogin: function(val){
            if(val){
                this.getArticle();
            }else{
               this.logout();
            }
        }
    },
    data:{
        wantLogin :true,
        username:"",
        imgSrc:"",
        isLogin:"",
        editArticle:null,
        myArticles:[],
        viewedArticles:[],
        sidebar:{
            width: "",
        },
        viewId: VIEW_ID.ALL_ARTICLE,
    },
    methods:{
        getUser(){
          
            myaxios({
               method:'get',
               url: "/users/user",
            })
            .then(({data})=>{
               this.username = data.name;
               this.imgSrc = data.imageUrl;
            })
            .catch(error=>{
               
                handleAxiosError(error)
            })
        },
        getArticle(){
            myaxios({
               method:'GET',
               url: "/articles",
            })
            .then(({data})=>{
                this.myArticles = data;
                this.viewedArticles = data
            })
            .catch(error=>{
                handleAxiosError(error)
            })
        },
        updateArticle(article){
             //tadinya mau di update dari sisi client tapi rada susah jadi sementara di get ulang aja
             this.getArticle()
        },
        createArticle(article){
            this.myArticles.push(article);
        },
        deleteArticle(id){ 
            let index = this.myArticles.findIndex(x=>x._id === id)
            this.myArticles.splice(index,1)
        },
        setEditArticle(article){
      
            if(article){
                this.editArticle = article
            }else{
                this.editArticle = null;
            }
           
        },
        authSuccess(data){
            localStorage.token = data.token;
            localStorage.username = data.username;
            localStorage.imgSrc = data.imgSrc;
            this.username = data.username;
            this.imgSrc = data.imgSrc;
            myaxios.defaults.headers.common['Authorization'] = data.token;
            this.isLogin=true;
            this.setViewId(VIEW_ID)
        },
        setLogout(){
            myaxios({
               method:'POST',
               url: "/users/logout",
            })
            .then(({data})=>{
               if(data.accountType === "google"){
                    googleSignOut()
               }else{
                    this.isLogin = false
               }
            })
            .catch(error=>{
                handleAxiosError(error)
            })
            
        },
        logout(){
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("imgSrc")
            myaxios.defaults.headers.common['Authorization'] = ""
        },
        setViewId(id){
            this.viewId = Number(id);
        },
        setViewedArticles(articles){
            this.viewedArticles = articles
        },
        setWantLogin(){
            this.wantLogin = !this.wantLogin
        },
        updatePicture(src){
            this.imgSrc = src
        }
    }
})
