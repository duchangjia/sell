<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left" @click="toggleList">
				<div class="logo-wrapper">
					<div class="logo" :class="{'heightlight':totalCount>0}">
						<i class="iconfont icon-qicheqianlian- icon-shopping" :class="{'heightlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'heightlight':totalCount}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}</div>
			</div>
			<div class="content-right" @click="pay">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>		
		</div>
		<div class="ball-container">
			<transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
	        <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show">
	          <span class="inner_shop inner_hook iconfont icon-zengjia"></span>
	        </div>
	     </transition-group>		
		</div>
		<transition name="fold">
				<div class="shopCart_list" v-show="listShow">	
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" id="list-content">
						<ul>
							<li class="food" v-for="(food,index) in sellectFoods" :key="index">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price*food.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>		
				</div>
			</transition>
		<transition name="maskMove">
			<div class="mask" v-if="listShow" @click="hideList"></div>
		</transition>	
	
	</div>
</template>
<script>
	import cartcontrol from '../cartcontrol/cartcontrol'
	import BScroll from 'better-scroll'
	export default{
		props:{
			sellectFoods:{
				type:Array,
				default(){
					return [
					]
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		components:{
			cartcontrol,
		},
		data(){
			return{
				balls:[
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
				],
				dropBalls:[],
				fold:true,
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.sellectFoods.forEach((food)=>{
					total+=food.price*food.count;
				})
				console.log(total)
				return total
			},
			totalCount(){
				let count=0;
				this.sellectFoods.forEach((food)=>{
					count+=food.count;
				})
				return count;
			},
			payDesc(){
				if(this.totalCount===0){
					return `￥${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					let diff=this.minPrice-this.totalPrice
					return `还差￥${diff}元起送`
				}else{
					return '去结算'
				}
			},
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'not-enough'
				}else{
					return 'enough'
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold=true;
					return false;
				}
				let show=!this.fold;
				if(show){
					this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll=new BScroll(document.getElementById("list-content"),{
								click:true
							})
						}else{
							this.scroll.refresh();
						}
						
					})
				}
				return show;
			}

		},
		created(){
			this.$root.eventHub.$on('cart.add', this.drop);
		},
		methods:{
			drop(ele){
				for (let i = 0; i < this.balls.length; i++) {
			        let ball = this.balls[i];
			        if (!ball.show) {
			          ball.show=true; // 表示可以有下落动画
			          ball.el = ele;
			          this.dropBalls.push(ball);
			          return; // 跳出循环
			        }
				}
			},
			empty(){
				this.sellectFoods.forEach((food)=>{
					food.count=0;
				})
			},
			pay(){
				if(this.totalPrice===0){
					return;
				};
				alert(this.totalPrice);
			},
			beforeEnter(ele){
				 let len = this.balls.length;
			      while (len--) {
			        let ball = this.balls[len];
			        if (ball.show) {
			          let rect = ball.el.getBoundingClientRect(); // 小球盒模型
			          let x = (rect.left - 32); // 小球距离购物车图标的位置
			          let y = -(window.innerHeight - rect.top - 22);
			          console.log(x);
			          console.log(y);
			          ele.style.display = '';
			          ele.style.webkitTransform = `translate3d(0,${y}px,0)`;
			          ele.style.transform = `translate3d(0,${y}px,0)`;
			          let inner = ele.getElementsByClassName('inner_hook')[0];
			          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
			          inner.style.transform = `translate3d(${x}px,0,0)`;
			        }
			      }
			},
			enter(ele){
				 ele.offsetHeight; // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
			      this.$nextTick(() => { // 改回运动初始状态
			        ele.style.webkitTransform = 'translate3d(0, 0, 0)';
			        ele.style.transform = 'translate3d(0,0,0)';
			        let inner = ele.getElementsByClassName('inner_hook')[0];
			        inner.style.webkitTransform = 'translate3d(0,0,0)';
			        inner.style.transform = 'translate3d(0,0,0)';
			      });
			},
			afterEnter(ele) { // 下落小球的下落之后的运动函数钩子
		      let ball = this.dropBalls.shift();
		      if (ball) {
		        ball.show = false;
		        ele.style.display = 'none';
		      }
		    },
		    toggleList(){
		    	if(!this.totalCount){
		    		return;
		    	}
		    	this.fold=!this.fold
		    },
		    hideList(){
		    	this.fold = true;
		    }
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixin.styl"
	.shopcart
		position:fixed
		left:0
		bottom:0
		z-index:50
		width:100%
		height:48px
		background:#000
		.content
			display:flex;
			background:#141d27;
			.content-left
				flex:1
				.logo-wrapper
					display:inline-block
					position:relative
					top:-10px
					margin:0 12px
					padding:6px
					width:50px
					height:50px
					box-size:border-box
					vertical-align:top
					border-radius:50%
					background:#141d27
					.logo
						width:100%
						height:100%
						border-radius:50%
						text-align:center
						background:#2b343c
						&.heightlight
							background:rgb(0,160,220)
						.icon-shopping
							line-height:44px
							font-size:24px
							color:#80858a
							&.heightlight
								color:#fff
					.num
						position:absolute
						top:0
						right:0
						width:24px
						height:16px
						line-height:16px
						text-align:center
						border-radius:16px
						font-size:9px
						font-weight:700
						color:#fff
						background:rgb(240,20,20)
						box-shadow:0 4px 8px rgba(0,0,0,0.4)
				.price
					display:inline-block
					vertical-align:top
					line-height:24px
					margin-top:12px
					line-height:24px
					padding-right:12px
					box-size:border-box
					border-right:1px solid rgba(255,255,255,0.1)
					font-size:16px
					font-weight:700
					color:rgba(255,255,255,0.4)
					&.heightlight
						color:white
				.desc
					display:inline-block
					vertical-align:top
					margin:12px 0 0 12px
					line-height:24px
					color:rgba(255,255,255,0.4)
					font-size:10px
			.content-right
				flex:0 0 105px
				width:105px
				.pay
					height:48px
					line-height:48px
					text-align:center
					font-size:12px
					font-weight:700
					color:rgba(255,255,255,0.4)
					&.not-enough
						background:#2b333b
					&.enough
						background:#00b43c
						color:white
		.ball-container
			.ball
				position:fixed
				left:32px
				bottom:22px
				z-index:200
				&.drop-enter,&.drop-enter-active
					transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
					.inner
						display:inline-block
		        width:16px
		        height:16px
		        border-radius:50%
		        background:rgb(0,160,220)
		        transition:all 0.4s linear
		.shopCart_list
			position:absolute
			top:0
			left:0
			z-index:-1
			width:100%
			transform:translate3d(0,-100%,0)
			&.fold-enter-active,&.fold-leave-active
				transition:all 0.5s
			&.fold-enter-to,&.fold-leave
				transform:translate3d(0,-100%,0)
			&.fold-enter,&.fold-leave-to
				transform:translate3d(0,0,0)
			.list-header
				height:40px
				line-height:40px
				padding:0 18px
				background:#f3f5f7
				border-bottom:1px solid rgba(7,17,27,0.1)
				.title
					float:left
					font-size:14px
					color:rgb(7,17,27)
				.empty
					float:right
					font-size:12px
					color:rgb(0,160,220)
			.list-content
				padding:0 18px
				max-height:217px
				overflow:hidden
				background:#fff
				.food
					position:relative
					padding:12px 0
					border-1px(rgba(7,17,27,0.1))
					.name
						line-height:24px
						font-size:14px
						color:rgb(7,17,27)
					.price
						position:absolute
						right:90px
						bottom:12px
						line-height:24px
						font-size:14px
						font-weight:700
						color:rgb(240,20,20)
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:6px
		.mask
	    width:100%
	    height:100%
	    position:fixed
	    left:0
	    top:0
	    background:rgba(7,17,27,0.6)
	    filter:blur(10px)
	    backdrop-filter:blur(10px)
	    z-index:-2
	    &.maskMove-enter-active,&.maskMove-leave-active
	      transition:all 0.5s;
	    &.maskMove-enter
	      opacity:1
	    &.maskMove-leave-active
	      opacity:0
								
</style>