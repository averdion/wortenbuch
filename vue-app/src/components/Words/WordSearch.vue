<template>
  <div>
      <form class="form-inline">
          <div class="input-group mb-3">
              <label for="text">Word</label>
              <div class="input-group-append searchcontrol">
                  <input type="text" id="Stext" ref="text" />
            </div>
          </div>
          <div class="input-group mb-3">
              <label for="lang">Language</label>
              <div class="input-group-append searchcontrol">
                <span id="viewnumber">
                    <select id="Slang" ref="lang" v-model="searchData.lang" class="form-control form-control-sm">
                        <option selected="selected" value="de">Deutsch</option>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="">all</option>
                    </select>
                </span>
              </div>
          </div>
          <div class="input-group mb-3">
              <label for="type">Type</label>
              <div class="input-group-append searchcontrol">
                <span id="viewnumber">
                    <select id="Stype" ref="type" v-model="searchData.type" class="form-control form-control-sm">
                        <option selected="selected" value="nouns">Nouns</option>
                        <option value="verb">Verbs</option>
                        <option value="PP">Prepositions</option>
                        <option value="Adv">Adverb</option>
                        <option value="Adj">Adjektiv</option>
                        <option value="PP">Prepositions</option>
                        <option value="Pron">Pronouns</option>
                        <option value="Other">Others</option>
                        <option value="">all</option>
                    </select>
                </span>
              </div>
          </div>
          <div class="input-group mb-3">
              <label for="Stags">Tags: </label>
              <div class="input-group-append searchcontrol">
                  <input type="text" id="Stags" ref="tags" />
            </div>
          </div>
          <button class="btn btn-secondary" v-on:click.prevent="searchWords">Search</button>
      </form>
    </div>
</template>

<script>
    export default {
        name: 'word-search',
        data(){
          return {
              searchData: {
                  userId: 0,
                  text: '',
                  lang: 'de',
                  type: '',
                  tags: '',
                  wordsperpage: 30,
                  page: 0
              }
          }
        },
        methods:{

          searchWords(){
              this.searchData.text = this.$refs['text'].value;
              this.searchData.type = this.$refs['type'].value;
              this.searchData.tags = this.$refs['tags'].value;
              this.searchData.lang = this.$refs['lang'].value;
              this.searchData.page = 0;
              this.$emit('search:words',this.searchData);
          }
        }
    }
</script>

<style scoped>
.searchbutton{
    padding: 2px;
    margin-top: -1em;
    margin-left: 1em;
}
.searchcontrol{
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.form-inline{
  margin-top: 1em;
}
</style>