<template>
  <div id="app">
   <v-header :seller="seller"></v-header>
   <div class="tab">
      <div class="tab-item">
        <router-link :to="{path:'/sell/dist/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/sell/dist/ratings'}">评论</router-link>
      </div>
       <div class="tab-item">
        <router-link :to="{path:'/sell/dist/seller'}">商家</router-link>
      </div>
   </div>
   <div>
       <router-view :seller="seller"></router-view> 
    </div>
  <!--  <div>i am footer</div> -->
  </div>
</template>

<script>
import VHeader from './components/header/header.vue';
import {urlParse} from './common/js/tools.js';
const ERR_OK=0
export default {
  components:{
    VHeader,
  },
  data(){
    return{
      seller:{
        id:(()=>{
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    }
  },
  created(){
    this.$http.get('https://duchangjia.github.io/sell/data.json?'+this.seller.id)
    .then((rel)=>{
      rel=rel.body.seller
      this.seller=Object.assign({},this.seller,rel);
      console.log(this.seller)    
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "common/style/mixin.styl"
#app
  .tab
    display:flex
    width:100%
    height:40px
    line-height:40px
    border-1px(#e5e5e5)
    .tab-item
      flex:1
      text-align:center
      &>a
        display:block
        font-size:14px;
        color:rgb(77,85,93)
        &.active
          color:rgb(240,20,20)
</style>
