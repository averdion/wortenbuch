<template>
    <header class="navbar navbar-expand navbar-dark flex-column flex-md-row bg-primary">
      <a class="navbar-brand mr-0 mr-md-2" href="/"><img src="/img/logo.png"></a>
      <div class="navbar-nav-scroll">
          <ul class="navbar-nav bd-navbar-nav flex-row">
            <li class="nav-item">
              <router-link v-if="activeroute=='/login' || activeroute=='/'" to="/" class="nav-link active">Login</router-link>
              <router-link v-else to="/" class="nav-link">Login</router-link>
            </li>
            <li v-if="logged" class="nav-item">
                  <router-link v-if="activeroute=='/words'" to="/words" class="nav-link active">Words</router-link>
                  <router-link v-else to="/words" class="nav-link">Words</router-link>
            </li>
            <li v-else class="nav-item"><router-link to="/words" class="nav-link disabled">Words</router-link></li>
            <li v-if="permission" class="nav-item">
                  <router-link v-if="activeroute=='/users'" to="/users" class="nav-link active">Usuarios</router-link>
                  <router-link v-else to="/users" class="nav-link">Usuarios</router-link>
            </li>
            <li v-else class="nav-item"><router-link to="/users" class="nav-link disabled">Usuarios</router-link></li>
          </ul>
      </div>
      <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex"></ul>
      <user-information @logout="$emit('logout')" />
    </header>
</template>

<script>
  import UserInformation from './UserInformation.vue';

  export default {
      'name': 'navigation',
      components: {
          UserInformation
      },
      computed: {
          permission: function(){
              return this.$store.state.LoggedUser.type == 4;
          },
          logged: function(){
              return this.$store.state.LoggedUser.userId>0;
          },
          activeroute(){
            return this.$route.path;
          }
      }

  }
</script>
<style scoped>
  nav{
    margin-top: 2em;
  }
</style>