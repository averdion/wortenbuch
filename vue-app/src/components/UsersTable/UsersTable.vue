<template>
  <div id="user-table">
    <p v-if="users.length < 1" class="empty-table">
    No users
    </p>
    <table v-else  class="table table-striped table-bordered">
      <thead class="thead-light">
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="user in users" :key="user.userId">
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td>
                  <button class="btn btn-link" @click="editMode(user)">Edit</button>
                  <button class="btn btn-link" @click="$emit('delete:user', user.userId, user.name)">Delete</button>
              </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
  name: 'user-table',
  props: {
      users: Array
  },
  data() {
      return {
          editing: null,
      }
  },
  methods: {
      editMode(user) {
          user.password = '@@nopassword@@';
          this.editing = user.userId;
          this.$emit('edit:user',user);
      },

      editUser(user) {
          if (user.name === '' || user.email === '') return
              this.$emit('edit:user', user.userId, user);
              this.editing = null
      }
   }

 }
</script>

<style scoped>
  button {
    margin: 0 0.5rem 0 0;
  }
</style>