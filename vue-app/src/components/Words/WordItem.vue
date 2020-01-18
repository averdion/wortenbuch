<template>
  <div :class="'worditem ' + word.type">
    <span v-if="loggedId==word.userId"><a href="#" v-on:click.prevent="deleteWord(Word)"><i class="delete-icon material-icons">close</i></a></span>
      <div><strong>{{word.text}}</strong> <em><a href="#" class="searchlink" v-on:click.prevent="selectType(word.type)">({{word.type}})</a></em></div>
      <div>{{word.translation}}</div>
      <div>Tags: <em v-for="tag in tagList"><a href="#" class="searchlink" v-on:click.prevent="selectTag(tag)">{{tag}}</a></em></div>
  </div>
</template>

<script>
    export default {
        name: 'word-item',
        props: {
          'Word': Object,
          'PreviousWord': Object
        },
        data() {
            return {editing: null,
              word: this.Word,
              loggeduser: this.$store.state.LoggedUser,
              endclass: '',
            }
        },
        updated(){
          if(this.editing){
              this.setCalendar('startdate-' + this.word.wordId, this.word.start);
              this.setCalendar('enddate-' + this.word.wordId, this.word.end);
          }
        },
        methods:{
          deleteWord(word) {
              if(confirm('are you sure you want to delete "' + word.text + '"?'))
                  this.$emit('delete:word', word.wordId);
          },
          selectTag(tag){
            $('#Stags').val(tag);
          },
          selectType(type){
            $('#Stype').val(type);
          }
        },
        computed:{
          loggedId: function(){
              return this.$store.state.LoggedUser.userId;
          },
          tagList: function(){
            return this.Word.tags.replace(' ', '').split(',');
          }
        }
    }
</script>