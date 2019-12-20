<template>
  <div style="border:1px solid black; float: left; padding:0.5em; margin: 1.5em;">
      <div><strong>{{word.text}}</strong> (<em>{{word.type}}</em>)</div>
      <div>{{word.translation}}</div>
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
          formatDate(ts){
              var date = new Date(ts);
              return (date.getDate()+100).toString().substr(1,2) + '/' + (date.getMonth()+101).toString().substr(1,2) + '/' + date.getFullYear() + ' ' + (date.getHours()+100).toString().substr(1,2) + ':' + (date.getMinutes()+100).toString().substr(1,2);
          },

          formatSum(miliseconds){
              var strout= '';
              var minutes = Math.ceil((miliseconds % 3600000)/60000);
              var hours = Math.floor(miliseconds/3600000);

              if(hours>0){
                  strout += hours + ' horas ';
              }
              if(minutes>0){
                  strout += minutes + ' minutos ';
              }
              return (strout==='' ? 'activo': strout) ;
          },

          parseDate(strdate){
              var days = parseInt(strdate.substr(0,2));
              var months = parseInt(strdate.substr(3,2))+1;
              var years = parseInt(strdate.substr(6,4));
              var hours = parseInt(strdate.substr(11,2));
              var mins = parseInt(strdate.substr(14,2));
              return new Date(years, months, days, hours, mins);
          },
          editWord(word) {
              this.editing = word.wordId;
              this.originalword = this.word;
          },
          setCalendar(id, ts){
              var d = new Date(ts);
              var options = {format : 'DD/MM/YYYY HH:mm', currentDate: d, triggerEvent: 'dblclick'};
              $('#' + id).bootstrapMaterialDatePicker(options);
          },
          openCalendar(id){
              $('#' + id).dblclick();
          },
          saveWord() {
              try{
                  var startdate = this.parseDate(this.$refs['refstart'].value);
                  var enddate = this.parseDate(this.$refs['refend'].value);
                  if(startdate.getTime()<enddate.getTime()){

                      this.word.start = startdate.getTime();
                      this.word.end = enddate.getTime();
                      this.word.sum = this.word.end - this.word.start;
                      this.$emit('save:word', this.word);
                      this.cancelEdit();
                  }else{
                      this.endclass = 'is-invalid';
                  }
              }catch(err){
                console.log(err);
              }
          },
          cancelEdit() {
              this.editing = null;
              this.endclass = '';
          },
        },
        computed:{
            startformated: {
                get: function(){
                    return this.formatDate(this.word.start);
                },
                set: function(startformated){
                  this.startformated = startformated;

                }
            },
            endformated: {
                get: function(){
                         return this.formatDate(this.word.end);
                },
                set: function(endformated){
                  this.endformated = endformated;
                }
            },
            sumformated: function(){
                              return this.formatSum(this.word.sum)
                          },
            stateword: function(){
                              if(this.word.state == 1){
                                  return "table-warning";
                              }else if(this.word.state == 3){
                                  return "";
                              }else{
                                if(this.word.daygroup==this.PreviousWord.daygroup){
                                  return ""
                                }

                              }
                          }


        },
    }
</script>

<style scoped>
.error-icon{
  padding-top: 0.5em;
}
.additional-row{
  margin-right: 3em;
}
</style>