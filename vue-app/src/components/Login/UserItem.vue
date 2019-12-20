<template>
    <div :class="'card user float-left ' + loggedClass(user)" :id="'user-' + user.userId">
        <form @submit.prevent="handleSubmit">
            <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" v-on:dblclick="autoLogin(user);" v-on:click="showControls(user.userId);">
                <h2>{{user.name}}</h2>
                <div v-if="user.logged" class="connectedmark">
                    <i class="material-icons">alarm_on</i>
                </div>
                <div v-else class="connectedmark">
                    <i class="material-icons disabled">alarm_off</i>
                </div>
                <div><img :src="'/userimages/' + user.imageurl" /></div>
            </a>
            <div :id="'buttonbox-'+ user.userId" class="collapse">
                <div><input type="password" :ref="'password-' + user.userId" v-model="password"/></div>
                <div><button class="btn btn-bd-primary" v-on:click.prevent="handleSubmit()"><i class="material-icons align-bottom">exit_to_app</i> Entrar</button></div>
                  <div v-if="this.validation.status===403" class="alert alert-danger" role="alert">
                      <span>{{this.validation.message}}</span>
                 </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'user-item',
        props: {
            user: {}
        },
        data() {
            return {
              password: '',
              validation: {status: 200},
              Loggeduser: this.$store.state.LoggedUser
            }
        },
        mounted(){
            //$('#buttonbox-' + this.user.userId).hide();
        },
        methods: {
            handleSubmit() {
                this.submitting = true
                this.clearStatus()

                if (this.invalidName || this.invalidEmail) {
                    this.error = true
                    return
                }
                this.$emit('login:user', this.user.username, this.password, this);
                this.$refs['password-' +this.user.userId].focus();
                this.error = false
                this.success = true
                this.submitting = false
            },

            clearStatus() {
                this.success = false
                this.error = false
            },

            autoLogin(user){
                if(user.autologin){
                    this.$emit('autologin', user.userId);
                }
            },

            showControls(id){
              this.$emit('hideControls');
              $('#buttonbox-' + this.user.userId).collapse('show');
              this.$refs['password-' + id].focus();
            },
            validate(data){
              this.validation = data;
            },
            loggedClass: function(user){
                if(this.Loggeduser.userId==user.userId)
                    return 'logged'
                return '';
            }
        }        
}
</script>

<style scoped>
  img {
    width: 8em;
    height: 8em;
  }
  input{
    width: 100%;
  }
  .user{
    width: 200px;
    margin: 3em;
  }
  .user:hover{
    background: #ffe484;
  }
  .user.logged{
    background: #ffe484;
  }
  .connectedmark{
    position: relative
  }
  .connectedmark i {
    top: 50%;
    left: 50%;
    position: absolute;
    margin-left: -4em;
    margin-top: -1.8em;
}
  .connectedmark .disabled {
    color: #EEE;
}
  h2{
    padding-left: 0.3em;
  }
</style>