Vue.component('side-nav-button', {
    props:["viewid", "title"],
    methods:{
        setParentView(){
           
            this.$emit("set-view-id", this.viewid)
        }
    },
    template: `      
        <a class="ml-3 w-100 d-flex flex-row align-items-center" @click="setParentView">
            <slot></slot>
            <p class="m-2">{{this.title}}</p>
        </a>
    `,
});