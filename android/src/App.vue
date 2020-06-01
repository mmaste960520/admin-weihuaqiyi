<template>
  <div class="tp_box">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // mounted(){
  //   let TwoLine = document.querySelector("#TwoLine");
  //   let ThreeLine = document.querySelector("#ThreeLine");
  //   this.TwoLine()
  // },
  // methods:{
  //   TwoLine(){
  //     if(TwoLine.innerHtml.length == 5){
  //       return TwoLine.innerHtml.slice(0,5) + '...'
  //     }
  //   }
  // }
}
</script>

<style>
.tp_box{
  height: 100%;
  width: 100%;
}
</style>
