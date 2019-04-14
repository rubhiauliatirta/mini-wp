

Vue.component('login-card', {
    data() {
        return {
            errorMessage: "",
            email:"",
            password:""
        };
    },
    methods: {
        login(){

            let data = {
                email:this.email,
                password:this.password
            }
            myaxios({
               method:'POST',
               url: "/users/login",
               data,

            })
            .then(({data})=>{
                this.$emit("auth-success", data)
            })
            .catch(error=>{
                handleAxiosError(error)
            })

            
        }
    },
    template: `
    <b-card class="text-center myauthcard">
        <b-card-header>
            LOGIN
        </b-card-header>
        <b-card-body class="d-flex flex-column">   
            <input type="email" class=" mt-2" v-model="email" placeholder="Email..." required>
            <input type="password" class="f mt-2" v-model="password" placeholder="Password..." required>
            <button @click="login" type="submit" class="btn btn-primary mt-5">LOGIN</button>
            <div class="g-signin2 mt-2" data-onsuccess="onSignIn"></div>
            <small class="text-danger">{{errorMessage}}</small>  
        </b-card-body>
        <b-card-footer class="d-flex-inline">
            <p>Don't have an account? <span> <a href="#" v-on:click="$emit('change-auth')">REGISTER</a></span></p>
        </b-card-footer>   
    </b-card>
    `,
});