<template>
  <div class="container">
    <div>
        <navigation @logout="Logout"/>
    </div>
    <div>
        <router-view @login:user="Login"/>
    </div>
</div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';

export default {
    name: 'app',
    components: {
        Navigation
    },
    data(){
        return { loggeduser: {}
        }
    },
    beforeMount(){
        this.getLoggedUser();
    },
    methods: {
        async getLoggedUser(){
            try {
                const response = await fetch(this.$store.state.domain + '/api/auth/loggeduser',{
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if(response.status==200){
                    this.loggeduser = data.embeds["rl:entries"];
                    this.$store.state.LoggedUser = this.loggeduser
                }else{
                    this.loggeduser = {'name': 'Anonimo', 'type': 0 }
                    this.$router.push('/login', () =>{});
                }
            }catch(error){
                this.loggeduser = {'name': 'Anonimo', 'type': 0 }
                this.$router.push('/login', () =>{});
            }
        },
        Login(){
            this.$router.push('/clockin', () =>{});
        },
        async Logout(){
            try {
                const response = await fetch(this.$store.state.domain + '/api/auth/logout',{
                    method: 'GET',
                    credentials: 'include'
                });
                if(response.status==200){
                    this.$store.state.LoggedUser = { userId:0, type: 0};
                    this.$router.push('/login', () =>{});
                }
            }catch(error){
                this.$store.state.LoggedUser = { userId:0, type: 0};
                this.$router.push('/login', () =>{});
            }
        }
    }
}
</script>

<style>

  .custom1 {
    border: 1px solid black;
  }
  .custom2 {
    border: 1px solid black;
  }
</style>