<template>
  <div>
  <button class="badge badge-primary" data-toggle="collapse" href="#newword" aria-expanded="false" aria-controls="newword">
    Add word
  </button>
  <div id="newword" class="collapse">
      <form class="form-outline">
          <div class="input-group mb-3">
              <label for="text">Word: </label>
              <div class="input-group-append searchcontrol">
                  <input type="text" id="text" ref="text" class="form-control" v-model="saveData.text" />
            </div>
          </div>
          <div class="input-group mb-3">
              <label for="translation">Translation: </label>
              <div class="input-group-append searchcontrol">
                  <input type="text" id="translation" class="form-control" ref="translation" v-model="saveData.translation" />
            </div>
          </div>
          <div class="input-group mb-3">
              <label for="lang">Lang: </label>
              <div class="input-group-append searchcontrol">
                <span id="viewnumber">
                    <select id="lang" ref="lang" v-model="saveData.lang" class="form-control form-control-sm">
                        <option selected="selected" value="de">Deutsch</option>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="">all</option>
                    </select>
                </span>
              </div>
          </div>
          <div>
            <div class="input-group mb-3">
                <div class="btn-list" role="group" aria-label="Basic example">
                  <a href="#"  id="Nm" v-on:click.prevent="markType('Nm')" class="badge badge-primary">Nm</a>
                  <a href="#" id="Nf" v-on:click.prevent="markType('Nf')" class="badge badge-primary">Nf</a>
                  <a href="#" id="Nt" v-on:click.prevent="markType('Nt')" class="badge badge-primary">Nt</a>
                  <a href="#" id="Npl" v-on:click.prevent="markType('Npl')" class="badge badge-primary">Npl</a>
                  <a href="#" id="Verb" v-on:click.prevent="markType('Verb')" class="badge badge-primary">Verb</a>
                  <a href="#" id="Adv" v-on:click.prevent="markType('Adv')" class="badge badge-primary">Adverb</a>
                  <a href="#" id="Pron" v-on:click.prevent="markType('Pron')" class="badge badge-primary">Pron</a>
                  <a href="#" id="PP" v-on:click.prevent="markType('PP')" class="badge badge-primary">PP</a>
                  <a href="#" id="PP" v-on:click.prevent="markType('Other')" class="badge badge-primary">Other</a>
                </div>
          <div class="input-group mb-3">
              <label for="lang">Tags: </label>
              <div class="input-group-append searchcontrol">
                    <input type="text" id="tags" ref="tags" v-model="saveData.tags" class="form-control">
              </div>
          </div>

            </div>
          </div>
          <button class="btn btn-secondary" v-on:click.prevent="saveWord">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'word-editor',
        data(){
          return {
              saveData: {
                  wordId: 0,
                  text: '',
                  translation: '',
                  lang: 'de',
                  type: 'Nm',
                  tags: '',
                  userId: 0
              },
          }
        },
        methods:{

          markType(type){
            this.saveData.type = type;
            $('.badge').removeClass('badge-secondary');
            $('.badge').addClass('badge-primary')
            $('#'+ type).removeClass('badge-primary');
            $('#'+ type).addClass('badge-secondary');
          },
          saveWord(){

              this.saveData.translation = this.$refs['translation'].value;
              this.saveData.lang = this.$refs['lang'].value;
              if(this.saveData.type == 'Nm' || this.saveData.type == 'Nf' || this.saveData.type == 'Npl')
                  this.saveData.text = this.capitalize(this.$refs['text'].value);
              else
                  this.saveData.text = this.$refs['text'].value;

              this.saveData.tags = this.formatTags(this.$refs['tags'].value);
              this.$emit('save:word',this.saveData);
              this.$refs['text'].value = '';
              this.$refs['translation'].value = '';
              this.$refs['lang'].value = '';
              this.$refs['tags'].value = '';
          },
          capitalize(strinput){
            return strinput.trim().charAt(0).toUpperCase() + strinput.trim().slice(1);

          },
          formatTags(tags){
            var taglist = tags.split(',');
            return taglist.map(function(value, index, array){
                return value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
            }).join(', ');
          }
        }
    }
</script>