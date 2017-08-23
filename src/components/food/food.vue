<template>
	<div v-show="show" class="foodInfo" id="foodInfo">
		<div class="food_content">
			<div class="img_header">
				<img class="img" :src="food.image" alt="">
				<div class="back" @click="hide">
					<i class="iconfont icon-next icon-arrow_lift"></i>
				</div>
			</div>
			<div class="content">
	          <div class="title">{{food.name}}</div>
	          <div class="extra">
	            <span class="count">月售{{food.sellCount}}份</span>
	            <span>好评率{{food.rating}}%</span>
	          </div>
	          <div class="price">
	            <span class="now">￥{{food.price}}</span>
	            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
	          </div>
	          <div class="caraControl_wrapper">
	            <cart-control :food="food"></cart-control>
	          </div>
	          <transition name="addCartMove">
	            <div class="addCartShop" @click="addFirst($event)" v-show="!food.count || food.count===0">加入购物车</div>
	          </transition>
	        </div>
	        <split v-show="food.info"></split>
	        <div class="info" v-show="food.info">
	          <h1 class="title">商品信息</h1>
	          <p class="text">{{food.info}}</p>
	        </div>
	        <split v-show="food.info"></split>
	        <div class="rating">
	        	 <h1 class="title">商品评价</h1>
	        	 <rating-select :desc="desc" :selectType="selectType" :onlyContent="onlyContent" @selRatings="selRatings" @isContent="isContent" :ratings="food.ratings"></rating-select>
	        	 <div class="ratings_wrapper">
	        	 	<ul v-show="food.ratings && food.ratings.length">
	        	 		<li v-for="rating in food.ratings" class="ratings_item border-1px" v-show="needShowList(rating.rateType,rating.text)">
	        	 			<div class="user">
	        	 				<span class="name">{{rating.username}}</span>
	        	 				<img :src="rating.avatar" class="avatar" width="12" height="12">
	        	 			</div>
	        	 			<div class="time">{{rating.rateTime}}</div>
	        	 			<p class="text">
	        	 				<span class="iconfont" :class="{'icon-thumb_up icon-dianzan':rating.rateType===0,'icon-thumb_down icon-dianzancopy3':rating.rateType===1}"></span>{{rating.text}}
	        	 			</p>
	        	 		</li>
	        	 	</ul>
					<div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
	        	 </div>
	        </div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import Split from '../split/split';
	import ratingSelect from '../ratingSelect/ratingSelect';
	import cartControl from '../cartcontrol/cartcontrol';
	const ALL = 2;
	export default{
		components:{
			Split,
			ratingSelect,
			cartControl
		},
		props:{
			food:{
				type:Object
			},
			show:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				desc:{
					all:'全部',
					positive:'推荐',
					negitive:'吐槽',
				},
				selectType:ALL,
				onlyContent:false,
			}
		},
		methods:{
			hide(){
				this.$emit('close-food')
			},
			initShow(){
				this.$nextTick(()=>{
					console.log("111")
					  // 初始化显示状态
				      this.selectType = ALL;
				      this.onlyContent = false;
					if(!this.scroll){
						this.scroll=new BScroll(document.getElementById('foodInfo'),{
							startX: 0,
							startY: 0,
							scrollY: true,
							click: true
						})
					}else{
						this.scroll.refresh();
					}			
				})
				
			},
			selRatings(type){
				this.selectType=type
			},	
			isContent(only){
				this.onlyContent=only
			},
			needShowList(type,text){
				if(this.onlyContent&&!text){
					return false;
				}
				if(this.selectType===ALL){
					return true
				}else{
					return this.selectType===type
				}
			}		
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.foodInfo
	  position:fixed
	  left:0
	  top:0
	  bottom:48px
	  z-index:30
	  width:100%
	  background:#fff
	  transition:all 0.3s
	  &.move-enter-active
	    transform:translate3d(0,0,0)
	  &.move-enter,&.move-leave-to
	    transform:translate3d(100%,0,0)
	  .img_header
	    position:relative
	    width:100%
	    height:0
	    padding-top:100%
	    .img
	      position:absolute
	      top:0
	      left:0
	      width:100%
	      height:100%
	    .back
	      position:fixed
	      left:0
	      top:10px
	      .icon-arrow_lift
	        display:block
	        padding:10px
	        font-size:20px
	        color:#fff
	  .content
	    position:relative
	    padding:18px
	    .title
	      font-size:14px
	      line-height:14px
	      margin-bottom:8px
	      font-weight:700
	      color:rgb(7,17,27)
	    .extra
	      margin-bottom:18px
	      line-height:10px
	      height:10px
	      font-size:10px
	      color:rgb(147,153,159)
	      .count
	        margin-right:12px
	    .price
	      line-height:24px
	      font-weight:700px
	      .now,.old
	          line-height:24px
	          margin-right:0px
	      .now
	          font-size:14px
	          font-weight:700px
	          color:rgb(240,20,20)
	      .old
	          font-size:10px
	          color:rgb(147,153,159)
	          text-decoration:line-through
	  .caraControl_wrapper
	    position:absolute
	    right:12px
	    bottom:12px
	  .addCartShop
	    position:absolute
	    right:18px
	    bottom:18px
	    z-index:10
	    padding:0 12px
	    text-align:center
	    line-height:24px
	    height:24px
	    font-size:10px
	    color:#fff
	    background:rgb(0,160,220)
	    border-radius:12px
	    box-sizing:border-box
	    transition:all 0.2s
	    &.addCartMove-enter-active
	      opacity:1
	    &.addCartMove-enter,&.addCartMove-leave-to
	      opacity:0
	  .info
	    padding:18px
	    .title
	      line-height:14px
	      margin-bottom:16px
	      font-size:14px
	      font-weight:700
	      color:rgb(7,17,27)
	    .text
	      color:rgb(77,85,93)
	      line-height:24px
	      font-size:12px
	      font-weight:200
	      padding:0 8px
	  .rating 
	    padding-top:18px
	    .title
	      line-height:14px
	      margin-left:18px
	      font-size:14px
	      font-weight:700
	      color:rgb(7,17,27)
	    .ratings_wrapper
	      padding:0 18px
	      .ratings_item
	        position:relative
	        padding:16px 0
	        border-1px(rgba(7,17,27,0.1))
	        font-size:0
	        .rating_time
	          display:inline-block
	          position:absolute
	          left:0
	          top:16px
	          font-size:10px
	          line-height:12px
	          color:rgb(147,153,159)
	        .user
	          display:inline-block
	          position:absolute
	          right:0
	          top:16px
	          line-height:12px
	          font-size:10px
	          color:rgb(147,153,159)
	          .name
	            font-size:10px
	            line-height:12px
	            color:rgb(147,153,159)
	            vertical-align:top
	          .avatar
	            width:12px
	            height:12px
	            border-radius:50%
	            vertical-align:top
	        .text
	          font-size:12px
	          line-height:24px
	          color:rgb(7,17,27)
	          margin-top:18px
	          .icon
	            margin-right:4px
	            &.icon-thumb_up
	              color:rgb(0,160,220)
</style>