<template>
  <div id="user-list">
    <p v-if="users.length < 1" class="empty-list">
    loading...
    </p>
    <div class="btn-group" role="group" v-else>
      <ul class="nav nav-pills">
        <li class="nav-item" v-for="user in users" :key="'userselector-' + user.userId">
            <span>
                <a v-if="activeuser.userId==user.userId" href="#" :id="'user-'+ user.userId" class="users badge badge-secondary" v-on:click.prevent="selectUser(user)">{{user.name}}</a>
                <a v-else href="#" class="users badge badge-primary" :id="'user-'+ user.userId" v-on:click.prevent="selectUser(user)">{{user.name}}</a>
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
      selectUser(user){
          this.activeuser = user;
          this.$emit('select:user',user);
          $('.users').removeClass('badge-secondary');
          $('.users').addClass('badge-primary')
          $('#user-'+ user.userId).removeClass('badge-primary');
          $('#user-'+ user.userId).addClass('badge-secondary');
      },
  }
}
</script>

<style scoped>
</style>