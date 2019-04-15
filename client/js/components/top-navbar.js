Vue.component('top-navbar', {
    data(){
        return {
            searchQuery : ""
        }
    },
    methods:{
        search(){
            if(this.searchQuery!==""){
                let stringQuery = "";
                if(this.searchQuery[0] === "#"){
                    stringQuery = `?tag=${this.searchQuery.slice(1)}`
                }else{
                    stringQuery = `?title=${this.searchQuery}`
                }
                console.log(stringQuery)
                myaxios({
                method:'GET',
                url: `/articles${stringQuery}`,
                })
                .then(({data})=>{
                    this.$emit("search-success",data)
                })
                .catch(error=>{
                    handleAxiosError(error)
                })
            }else{
                this.$emit("show-all")
            }
            
        }
    },
    watch:{
        searchQuery: function(val){
            this.search()
        }
    },
    template: `
    <div>
        <b-navbar class="m-1" toggleable="lg" type="light" variant="light">
            <b-navbar-brand href="#" class="rock-salt">RAT Mini-WP</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto align-items-end m-1">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" v-model="searchQuery" placeholder="Search for 'title' or '#tag'"></b-form-input>
                        <button class="m-2 btn btn-primary" size="small" @click.prevent="$emit('invoke-logout')">Logout</button>
                    </b-nav-form>
                </b-navbar-nav>           
            </b-collapse>
        </b-navbar>
    </div>      
    `,
});