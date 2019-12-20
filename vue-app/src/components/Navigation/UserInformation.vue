<template>
    <div class="btn-group" v-if="logged">
        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{this.$store.state.LoggedUser.name}}
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" v-on:click.prevent="$emit('logout')" href="#">Logout <i class="material-icons align-middle">exit_to_app</i></a>
        </div>
  </div>
</template>

<script>
  export default {
      'name': 'user-information',
      computed: {
          logged: function(){
              return this.$store.state.LoggedUser.userId;
          }
      },

  }
</script>
