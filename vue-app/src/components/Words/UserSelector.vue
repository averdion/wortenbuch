<template>
  <div id="user-list" v-if="permission">
    <p v-if="users.length < 1" class="empty-list">
    loading...
    </p>
    <div class="btn-group" role="group" v-else>
      <ul class="nav nav-pills">
        <li class="nav-item" v-for="user in users" :key="'userselector-' + user.userId">
            <span>
                <button v-if="activeuser.userId==user.userId" href="#" class="nav-link btn btn-primary active" v-on:click="selectUser(user)">{{user.name}}</button>
                <button v-else href="#" class="nav-link btn btn-primary" v-on:click="selectUser(user)">{{user.name}}</button>
            </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'user-selector',
  props: {
      users: Array
  },
  data(){
    return {
      activeuser: this.$store.state.LoggedUser
    }
  },
  methods: {
      selectUser(user, id){
         this.$emit('select:user',user);
         this.activeuser = user;
      },
  },
      computed: {
          permission: function(){
              return this.$store.state.LoggedUser.type == 4;
          }
      }
}
</script>

<style scoped>
</style>