<template>
  <div id="pagination" v-if="pages.length>0">
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li v-for="page in pages" :key="'page-' + page" class="page-item"><a v-on:click.prevent="selectPage(page)" class="page-link" href="#">{{page}} <span v-if="currentpage==page" class="sr-only">(current)</span></a></li>
        </ul>
      </nav>
  </div>
</template>

<script>
  export default {
  name: 'pagination',
  props: {
      pages: Array
  },
  data(){
    return {
      currentpage: 0,
    }
  },
  methods: {
      selectPage(page){
         this.$emit('select:page',page);
         this.currentpage = page;
      3}
  }
}
</script>

<style scoped>
</style>