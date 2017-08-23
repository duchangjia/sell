<template>
	<div class="seller" id="sellerWrapper">
		<div class="seller_content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="text">{{seller.ratingCount}}</span>
					<span class="text">月售{{seller.sellCount}}</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2 class="text">起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>
						</div>
					</li>
					<li class="block">
						<h2 class="text">商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>
						</div>
					</li>
					<li class="block">
						<h2 class="text">平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="iconfont icon-shoucang1 icon-favorite" :class="{'active':isFavorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>	
			<div class="bulletin_wrapper">
				<h1 class="title">公告与活动</h1>
				<p class="text border-1px">{{seller.bulletin}}</p>
				<ul class="supports_wrapper">
					<li class="supports_item border-1px" v-for="(supportItem,index) in seller.supports" :key="index">
						<icon-class-map :iconType="supportItem.type"></icon-class-map>
						<span class="description">{{supportItem.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic_wrapper" id="picsWrapper">
					<ul class="pic_list" id="piclist">
						<li class="pic_item" v-for="(picItem,index) in seller.pics" :key="index">
							<img class="pic" width="120" height="90" :src="picItem" alt="">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="infos_wrapper">
				<h1 class="title border-1px">商家信息</h1>
				<ul class="infos_list">
					<li class="infos_item border-1px" v-for="(item,index) in seller.infos">
						<span class="text">{{item}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Star from '../star/star.vue'
	import Split from '../split/split'
	import IconClassMap from '../iconClassMap/iconClassMap.vue'
	import {saveToLocal,loadFromlocal} from '../../common/js/store.js'
	export default{
		props:{
			seller:{
				type:Object,
			}
		},
		data(){
			return{
				//isFavorite:false
				isFavorite:(()=>{
					loadFromlocal(this.seller.id,'isFavorite',false);		
				})()
			}
		},
		components:{
			Star,
			Split,
			IconClassMap,
		},
		mounted(){
			this.$nextTick(()=>{
				this._intoScroll();
				this._intoPicScroll();	
			})
		},
		watch:{
			seller(){
				this.$nextTick(()=>{
					this._intoScroll();
					this._intoPicScroll();	
				})			
			},

		},
		methods:{
			_intoScroll(){
				if(!this.scroll){
					this.scroll=new BScroll(document.getElementById("sellerWrapper"),{
						click:true,
					})
				}else{
					this.scroll.refresh();
				}
			},
			_intoPicScroll(){
				if(this.seller.pics){
					let picW=120;
					let margin=6;
					let w=(picW+margin)*this.seller.pics.length-margin;
					document.getElementById("piclist").style.width=w+'px';
					console.log(w)
					if(!this.Picscroll){
						this.Picscroll=new BScroll(document.getElementById("picsWrapper"),{
							scrollX: true,
							click:true,
						})
					}else{
						this.Picscroll.refresh();
					}
				}
				
			},
			toggleFavorite(){
				this.isFavorite=!this.isFavorite
				saveToLocal(this.seller.id,'isFavorite',this.isFavorite)
			},		
		},
		computed:{
			favoriteText(){
				return this.isFavorite ? '已收藏':'收藏'
			}
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/style/mixin.styl';

.seller
  position:absolute
  left:0
  top:174px
  width:100%
  bottom:0
  overflow:hidden
  .overview
    padding:0 18px
    position:relative
    .title
      font-size:14px
      line-height:14px
      color:rgb(7,17,27)
      padding:18px 0 8px 0
    .desc
      padding-bottom:18px
      border-1px(rgba(7,17,27,0.1))
      font-size:0
      .star
        display:inline-block
        margin-right:8px
        vertical-align:top
      .text
        display:inline-block
        font-size:10px
        line-height:18px
        color:rgb(77,85,93)
        margin-right:12px
        vertical-align:top
    .remark
      padding:18px 0
      display:flex
      .block
        flex:3
        border-right:1px solid rgba(7,17,27,0.1)
        text-align:center
        &:last-child
          border-right:none
        .text
          font-size:10px
          line-height:10px
          color:rgb(147,153,159)
        .content
            margin-top:4px
            font-size:10px
            line-height:24px
            color:rgb(7,17,27)
          .stress
            font-size:24px
            font-weight:200
    .favorite
      position:absolute
      right:18px
      top:18px
      width:40px
      .icon-favorite
        display:block
        margin-bottom:4px
        font-size:24px
        line-height:24px
        color:#d4d6d9
        text-align:center
        &.active
          color:rgb(240,20,20)
      .text 
        display:block
        font-size:10px
        line-height:10px
        color:rgb(77,85,93)
        text-align:center     
  .bulletin_wrapper
    padding:0 18px
    .title
      font-size:14px
      line-height:14px
      color:rgb(7,17,27)
      padding:18px 0 8px 0
    .text
      padding:0 12px 16px 12px
      font-size:12px 
      line-height:24px
      font-weight:200
      color:rgb(240,20,20)
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        border-none()
  .supports_wrapper
    .supports_item
      border-1px(rgba(7,17,27,0.1))
      padding:16px 12px
      .icon
        width:16px
        height:16px
        vertical-align:top
      .description
        font-size:12px
        line-height:16px
        font-weight:200
        color:rgb(7,17,27)
        vertical-align:top
  .pics
    padding:18px
    .title
      font-size:14px
      line-height:14px
      color:rgb(7,17,27)
      padding-bottom:12px
    .pic_wrapper
      width:100%
      overflow:hidden
      white-space:nowrap
      .pic_list
        font-size:0
        .pic_item
          display:inline-block
          margin-right:6px
          width:120px
          height:90px
          &:last-child
            margin:0
  .infos_wrapper
    padding:18px
    .title
      font-size:14px
      line-height:14px
      color:rgb(7,17,27)
      padding-bottom:12px
      border-1px(rgba(7,17,27,0.1))
    .infos_item
      padding:16px 12px
      border-1px(rgba(7,17,27,0.1))
      &.last-child
        border-none()
      .text
        line-height:16px
        
</style>