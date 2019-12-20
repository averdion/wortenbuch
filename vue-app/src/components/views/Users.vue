<template>
  <div id="users">
      <div class="card-header">
        Usuarios
      </div>
      <div class="card-body">
          <user-form @save:user="saveUser" :editinguser="editinguser" />
          <user-table :users="users" @delete:user="deleteUser" @edit:user="editUser"/>
      </div>
  </div>
</template>

<script>
import UserTable from '@/components/UsersTable/UsersTable.vue';
import UserForm from '@/components/UsersTable/UsersForm.vue';

export default {
  name: 'users',
  components: {
    UserTable,
    UserForm
  },
  props: ['LoggedUser'],
  data() {
    return {
      users: [],
      editinguser: {}
    }
  },

  mounted() {
    if(!this.$store.state.LoggedUser || this.$store.state.LoggedUser.type==0)
      this.$router.push('/login', () =>{});
    this.getUsers();
  },

  methods: {
      async saveUser(user) {
          try {
              const response = await fetch(this.$store.state.domain + '/api/users/save?' + $.param(user), {
                  method: 'GET',
                  credentials: 'include'
              })
              const data = await response.json()
              this.getUsers();
          } catch (error) {
              console.error(error)
          }
      },
      editUser(user) {
        this.editinguser = user;
      },

      async deleteUser(userId, name) {
        if(confirm('¿Seguro que quieres borrar a ' + name + '?')){
            try {
                const response = await fetch(this.$store.state.domain + '/api/users/delete?userId=' + userId, {
                    method: 'GET',
                    credentials: 'include'
                });
                this.users = this.users.filter(function checkAdult(user) {
                    return user.userId!=userId;
                });
            } catch (error) {
                console.error(error);
            }
        }
      },

      async getUsers() {
          try {
              const response = await fetch(this.$store.state.domain + '/api/users')
              const data = await response.json();
              this.users = data._embedded["rl:entries"];
          } catch (error) {
              console.error(error)
          }
      }
  }
}
</script>

<style>
</style>