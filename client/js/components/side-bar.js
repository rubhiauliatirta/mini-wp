Vue.component('side-bar', {
    props:["username", "imgSrc","publishedArticle","divId"],
    methods:{
        setParentView(id){
           
            this.$emit("set-view-id", id)
        }
    },
    template: `
    <div>
        <div id="profile" class="d-flex flex-column p-4">
            <div class="d-flex flex-row">
                <img :src="imgSrc" alt="pp.png" class="rounded-circle ">
                <p class="ml-3 align-self-center">{{username}}</p>
            </div>
            <small class="font-italic font-weight-bold mt-2">{{publishedArticle}}</small>
        </div>
        <side-nav-button @set-view-id="setParentView" viewid="1" title="View Article">
            <i v-bind:class="{ 'glow': (divId == VIEW_ID.ALL_ARTICLE), 'fas':true, 'fa-eye':true}"></i>
        </side-nav-button>
        <a class="w-100" @click="$emit('set-edit-article')"  v-b-modal.mymodal><i class="far fa-plus-square ml-2 mr-2"></i>Write Article</a>
        <side-nav-button @set-view-id="setParentView" viewid="2" title="My Article">
            <i v-bind:class="{ 'glow': (divId == VIEW_ID.MY_ARTICLE), 'fas':true, 'fa-newspaper':true}"></i>
        </side-nav-button>
        <side-nav-button @set-view-id="setParentView" viewid="3" title="Draft">
            <i v-bind:class="{ 'glow': (divId == VIEW_ID.DRAFT), 'fas':true, 'fa-sticky-note':true }"></i>
        </side-nav-button>
    </div>      
    `,
});