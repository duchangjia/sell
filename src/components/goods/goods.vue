<template>
	<div class="goods">
		<div class="menu-wrapper" id="wrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" id="wrapperContent" style="width:100%">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
							<div class="icon">
								<img :src="food.icon" width="57" height="57" alt="">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>					
								</div>
								<div class="cartcontrol-wrapper">
									<cart-control :food="food"></cart-control>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shop-cart :sellect-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
		<v-foodinfo :food="selectedFood" :show="showFloag" ref="foodinfo" @close-food="hide"></v-foodinfo>	
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import shopcall from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
export default{
	props:{
		seller:{
			type:Object,
		}
	},
	components:{
		'shop-cart':shopcall,
		'cart-control':cartcontrol,
		'v-foodinfo':food,
	},
	data(){
		return{
			goods:[],
			listHeight:[],
			scrollY:0,
			selectedFood:{},
			showFloag:false
		}
	},
	computed:{
		currentIndex(){
			for(let i=0;i<this.listHeight.length;i++){
				let height1=this.listHeight[i];
				let height2=this.listHeight[i+1];
				if(!height2||this.scrollY>=height1&&this.scrollY<height2){
					return i
				}
			}
			return 0;
		},
		selectFoods(){
			let foods=[];
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{ 
					if(food.count){
						foods.push(food);			
					}
				})		
			})
			return foods;
		}
	},
	methods:{
		selectMenu(index,event){
			if(!event._constructed){
				return;
			}			
			let foodList=document.querySelectorAll(".food-list-hook")
			let el=foodList[index];
			this.scrollContent.scrollToElement(el, 300)
		},
		selectFood(food,event){
			if(!event._constructed){
				return;
			}
			this.selectedFood=food;
			this.showFloag=true;
			this.$refs.foodinfo.initShow();
		},
		hide(){
			this.showFloag=false
		},
		_initScroll(){
			this.scroll = new BScroll(document.getElementById('wrapper'), {
			  startX: 0,
			  startY: 0,
			  scrollY: true,
			  click:true 
			})
			this.scrollContent = new BScroll(document.getElementById('wrapperContent'), {
			  startX: 0,
			  startY: 0,
			  scrollY: true,
			   click:true,
			  probeType:3 
			})
			this.scrollContent.on('scroll',(pos)=>{
				this.scrollY=Math.abs(Math.round(pos.y));

			})
		},
		_calculateHeight(){
			let foodList=document.querySelectorAll(".food-list-hook");
			console.log(foodList)
			let height=0;
			this.listHeight.push(height)
			for(let i=0;i<foodList.length;i++){
				let item=foodList[i];
				height+=item.clientHeight;
				this.listHeight.push(height);
			}
		},
	},
	created(){
		this.classMap=['decrease','discount','special','invoice','guarantee'];
		this.$http.get('https://duchangjia.github.io/sell/data.json').then((response)=>{
			response=response.body.goods;
			
				console.log(this.goods)
				this.goods=response;
				this.$nextTick(()=>{
					this._initScroll()
					this._calculateHeight()
				})
				
			
		})
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/style/mixin.styl"
.goods
	display:flex
	position:absolute
	top:174px
	bottom:46px
	width:100%
	overflow:hidden
	.menu-wrapper
		flex:0 0 80px
		width:80px
		background:#f3f5f7
		.menu-item
			display:table
			height:54px
			width:56px
			padding:0 12px
			line-height:14px
			&.current
				position:relative
				z-index:10
				margin-top:-1px
				background:white
				font-weight:700
				.text
					border-none()
			.icon
				display:inline-block
				width:12px
				height:12px
				margin-right:2px
				background-size:12px 12px
				background-repeat:no-repeat
				&.decrease
					bg-image('decrease_3')
				&.discount
					bg-image('guarantee_3')
				&.invoice
					bg-image('invoice_3')
				&.special
					bg-image('special_3')
				&.guarantee
					bg-image('guarantee_3')
			.text
				display:table-cell
				width:56px
				vertical-align:middle
				border-1px(#e5e5e5)
				font-size:12px
	.foods-wrapper
		flew:1
		.title
			padding-left:14px
			height:26px
			line-height:26px
			border-left:2px solid #d9dde1
			font-size:12px
			color:rgb(147,153,159)
			background:#f3f5f7
		.food-item
			display:flex
			margin:18px
			border-1px(raba(7,17,27,0.1))
			&:last-child
				border-none()
				margin-bottom:0
			.icon
				flex:0 0 57px
				margin-right:10px
			.content
				flex:1
				.name
					margin:2px 0 8px 0
					height:14px
					line-height:14px
					font-size:14px
					color:rgb(7,17,27) 
				.desc,.extra
					margin-bottom:8px
					line-height:10px
					font-size:10px
					color:rgb(147,153,159)
				.extra
					&.count
						margin-right:12px
				.price
					font-weight:700
					line-height:24px
					.now
						margin-right:8px
						font-size:14px
						color:rgb(240,20,20)
					.old
						text-decoration:line-through
						font-size:10px
						color:rgb(147,153,159)
				.cartcontrol-wrapper
					position:absolute
					right:0
					bottom:0px					
</style>