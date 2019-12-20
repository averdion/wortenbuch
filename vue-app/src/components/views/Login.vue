<template>
<div id="login" class="card text-center">
    <div class="card-header">
    Login
    </div>
    <div class="card-body">
        <user-list :users="users" @autologin="autoLogin" @login:user="login" />
    </div>
</div>
</template>



<script>
  import UserList from '@/components/Login/UserList.vue';
  
  export default {
    name: "Login",
    components: {
        UserList
    },
    props: ['LoggedUser'],
    data() {
        return {
            users: []
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            try {
                const response = await fetch(this.$store.state.domain + '/api/users',{
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json()
                this.users = data._embedded["rl:entries"];
            }catch (error) {
                this.users = [];
            }
        },
        async login(username, password, target){
            try {
                const response = await fetch(this.$store.state.domain + '/api/auth/login?username='+ username + '&password=' + password,{
                    method: 'GET',
                    credentials: 'include'
                });

                const data = await response.json();
                if(response.status==403){
                    data['status'] = 403;
                    data['message'] = 'Contraseña incorrecta';
                    target.validate(data);
                }else{

                    this.$store.state.LoggedUser = data.embeds["rl:entries"];
                    this.$emit('Login');
                    this.$router.push('/words', () =>{});
                }
            }catch (error) {
                target.validate({status: 403, message: 'Se produjo un error'});

            }
        },
        async autoLogin(userId){
            try {
                const response = await fetch(this.$store.state.domain + '/api/auth/autologin?userId='+ userId,{
                    method: 'GET',
                    credentials: 'include'
                });
                var data = await response.json();

                if(response.status==403){
                    data['status'] = 403;
                    data['message'] = 'AutoLogin no permitido';
                }else{
                	this.getUsers();
                }
            }catch (error) {
                console.log({status: 403, message: 'Se produjo un error'});

            }
        }
    }
  }
</script>