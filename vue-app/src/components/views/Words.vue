<template>
  <div id="words" class="card text-center">
      <div class="card-header">
        Word list
      </div>
      <div class="card-body">
         <word-list :words="words" :numresults="numresults" :updateflag="updateflag" :users="users" @delete:word="deleteWord" @select:page="selectPage" @save:word="saveWord" @search:words="getWords"/>
      </div>
  </div>
</template>

<script>
import WordList from '@/components/Words/WordList.vue';

export default {
  name: 'words',
  components: {
    WordList
  },
  data() {
    return {
      words: [],
      users: [],
      numresults: 0,
      updateflag: true,
      user: {userId: false},
      searchData: {
        userId: 0,
        text: '',
        type: '',
        categories: '',
        lang: '',
        wordsperpage: 30,
        page: 0
      },
      saveData:{
        wordId: 0,
        userId: 0,
        text: '',
        translation: '',
        type: '',
        categories: '',
        lang: ''
      }

    }
  },
  beforeMount() {
    this.searchData.userId = this.$store.state.LoggedUser.userId;
    this.saveData.userId = this.$store.state.LoggedUser.userId;
    this.getWords(this.searchData);
    this.getUsers();
  },

  methods: {

      async saveWord(word) {
          const response = await fetch(this.$store.state.domain + '/api/words/save?' + $.param(word), {
            method: 'GET',
            credentials: 'include'
          });
          //const data = await response.json();
          if(response.status==200){
              this.getWords(this.searchData);
          }
      },

      async deleteWord(wordId) {
            try {
                await fetch(this.$store.state.domain + '/api/words/delete?wordId=' + wordId, {
                method: "GET",
                credentials: 'include'
            });
            this.getEntries(this.searchData);
            } catch (error) {
                console.error(error);
            }
      },
      async getUsers() {
            try {
                const response = await fetch(this.$store.state.domain + '/api/users',{
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json()
                this.users = data._embedded["rl:entries"];
            }catch (error) {
                console.error(error)
            }
      },
      async getWords(searchData) {
          try {
              const response = await fetch(this.$store.state.domain + '/api/words?userId='+ searchData.userId + '&text=' + searchData.text + '&type=' + searchData.type + '&categories=' + searchData.categories + '&lang=' + searchData.lang + '&numwords=' + searchData.wordsperpage + '&page=' + searchData.page,{
                  method: 'GET',
                  credentials: 'include'
              })
              const data = await response.json();
              this.words = data._embedded["rl:entries"];
              this.countWords(searchData);
              this.updateflag = !this.updateflag;
          } catch (error) {
              console.error(error)
          }
      },
      async countWords(searchData) {
          try {
              const response = await fetch(this.$store.state.domain + '/api/words/countwords?userId='+ searchData.userId + '&text=' + searchData.text + '&type=' + searchData.type + '&categories=' + searchData.categories + '&lang=' + searchData.lang,{
                  method: 'GET',
                  credentials: 'include'
              })
              const data = await response.json();
              this.numresults = data._embedded["rl:results"][0].numresults;
              this.updateflag = !this.updateflag;
          } catch (error) {
              console.error(error)
          }
      },
      selectPage(searchData){
        this.getEntries(searchData);
      }
  }
}
</script>

<style>
</style>