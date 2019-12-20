<template>
  <div id="user-list">
    <p v-if="users.length < 1" class="empty-list">
    No hay usuarios registrados
    </p>
    <div v-else>
        <div v-for="user in users" :key="user.userId">
            <user-item :user="user" @login:user="login" @autologin="autoLogin" @hideControls="hideControls"/>
        </div>
    </div>
  </div>
</template>

<script>
  import UserItem from '@/components/Login/UserItem.vue';
  export default {
  name: 'user-list',
  props: {
      users: Array
  },
  components: {
      UserItem
  },
  data: function() {
      return { }
  },
  mounted: function(){
    this.data = this.users;
    this.hideControls();
  },
  methods: {
      login(username, password, target){
         this.$emit('login:user', username, password, target);

      },
      autoLogin(userId){
         this.$emit('autologin', userId);

      },

      hideControls(){
          for(var i in this.users){
              $('#buttonbox-' + this.users[i].userId).collapse('hide');
          }
      }
  }
}
</script>

<style scoped>
</style>