<template>
<form @submit.prevent="handleSubmit" class="needs-validation">
    <div id="container-user-form">
        <div><label>Nombre</label></div>
        <div class="col-sm-3">
            <input
              ref="first"
              type="text"
              class="form-control"
              v-model="user.name" required />
        </div>
        <div><label>Password</label></div>
        <div class="col-sm-3">
            <input
              type="password" 
              class="form-control"
              v-model="user.password"/>
        </div>
        <div><label>Email</label></div>
        <div class="col-sm-3">
            <input
              type="text" 
              class="form-control"
              v-model="user.email"/>
        </div>
        <div>
            <input type="radio" id="user" value="0" v-model="user.type">
            <label for="user">usuario</label>
            <br>
            <input type="radio" id="admin" value="4" v-model="user.type">
            <label for="admin">Administrador</label>
        </div>

        <div v-if="successmodified" class="alert alert-success">
        	✅ Usuario modificado correctamente.
          <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
        </div>
        <div v-if="successadd" class="alert alert-success">
          ✅ Usuario añadido correctamente.
          <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
        </div>
        <div v-if="editing"><button class="btn btn-primary">Guardar cambios</button><button class="btn btn-primary" v-on:click.prevent="clearStatus()">Cancelar</button></div>
        <button class="btn btn-primary" v-else>Nuevo Usuario</button>
    </div>
   </form>
</template>
<script>
export default {
  name: 'user-form',
  props: ['editinguser'],
  data() {
      return {
        editing: false,
        submitting: false,
        error: false,
        successmodified: false,
        successadd: false,
        user: {
            name: '',
            email: ''
        }
      }
  },
  watch: { 
      editinguser: function(newVal) { // watch it
          this.user = newVal;
          this.editing = true;
      }
  },
  methods: {
      handleSubmit() {
        this.submitting = true;
        this.successmodified = false;
        this.successadd = false;
        this.$emit('save:user', this.user);
        this.$refs.first.focus();
        if(this.user.userId){
            this.successmodified = true;
        }else{
        	this.successadd = true;
        }
        this.clearStatus();

      },

      clearStatus() {
          this.error = false;
          this.submitting = false;
          this.editing = false;
          this.user = {
              name: '',
              email: '',
          }
      }
  }
}
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }

  [class*='-message'] {
    font-weight: 500;
  }

  .last-input{
    margin-bottom: 2em;
  }
</style>