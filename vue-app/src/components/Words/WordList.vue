<template>
  <div id="word-list">
    <div v-if="words.length < 1" class="empty-table">
      <word-editor @save:word="saveWord"/>
      <word-search @search:words="searchWords"/>
      <user-selector v-if="LoggedUser.type==4" :users="users" @select:user="selectUser"/>
      <p>
        Words not found
      </p>
    </div>
    <div v-else>
      <word-editor  @save:word="saveWord" />
      <word-search @search:words="searchWords"/>
      <user-selector :users="users" @select:user="selectUser"/>
      <div class="item-list">
      <template v-for="word in words">
            <word-item v-bind:key="'word-' + word.wordId" :Word="word" @delete:word="deleteWord" @save:word="saveWord"/>
      </template>
      </div>
      <pagination :pages="pages" @select:page="selectPage"/>
  </div>
  </div>
</template>

<script>
  import WordItem from '@/components/Words/WordItem.vue';
  import WordSearch from '@/components/Words/WordSearch.vue';
  import WordEditor from '@/components/Words/WordEditor.vue';
  import UserSelector from '@/components/Words/UserSelector.vue';
  import Pagination from '@/components/Words/Pagination.vue';

  export default {
      name: 'word-list',
      components: {
          WordItem,
          WordSearch,
          WordEditor,
          UserSelector,
          Pagination
      },
      props: {
          words: Array,
          users: Array,
          updateflag: {
            type: Boolean,
            default: false
          },
          numresults: {
            type: Number,
            default: 0
          }

      },
      data() {
          return {
              editing: null,
              searchData: {
                  userId: 0,
                  text: '',
                  type: '',
                  categories: '',
                  lang: 'de',
                  wordsperpage: 30,
                  page: 0
              },
              saveData: {
                  userId: 0,
                  text: '',
                  translation: '',
                  type: '',
                  categories: '',
                  lang: 'de',
                  wordsperpage: 30,
                  page: 0
              },
              pages: [],
              loggeduser: this.$store.state.LoggedUser
          }
      },
      mounted(){
        this.searchData.userId = this.$store.state.LoggedUser.userId;
        this.saveData.userId = this.$store.state.LoggedUser.userId;

      },
      methods: {
          searchWords(searchData){
            this.searchData.text = searchData.text;
            this.searchData.type = searchData.type;
            this.searchData.categories = searchData.categories;
            this.searchData.lang = searchData.lang;
            this.searchData.wordsperpage = searchData.wordsperpage;
            this.searchData.page = searchData.page;
            this.$emit('search:words',this.searchData);

          },
          deleteWord(wordId){
              this.$emit('delete:word', wordId);
          },

          saveWord(saveData){
            this.saveData.text = saveData.text;
            this.saveData.translation = saveData.translation;
            this.saveData.type = saveData.type;
            this.saveData.categories = saveData.categories;
            this.saveData.lang = saveData.lang;
            this.$emit('save:word', this.saveData);
          },
          selectUser(user){
              this.searchData.userId = user.userId;
              this.$emit('search:words', this.searchData);
          },
          selectPage(page){
              this.searchData.page = page;
              this.$emit('search:words', this.searchData);
          },
          generatePages: function(){
              if(this.searchData.wordsperpage>0 && this.numresults>this.searchData.wordsperpage){
                  this.pages = Array(Math.ceil(this.numresults/this.searchData.wordsperpage)).fill(null).map((u, i) => i)
              }else{
                this.pages = [];
              }            
          }

      },
      computed:{
          LoggedUser: function(){
            return this.$store.state.LoggedUser;
          },
          listpages: function(){
            return this.pages;
          }
      },

      watch: {
          updateflag: function(){
              this.generatePages();
          }
      }

 }
</script>

<style scoped>
  button {
    margin: 0 0.5rem 0 0;
  }
</style>