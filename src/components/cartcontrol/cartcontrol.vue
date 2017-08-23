<template>
	<div class="cartcontrol">
		<transition name="fade">
			<div class="cart-decrease iconfont icon-jianshao" v-show="food.count>0" @click.stop.prevent="decreaseCart">		
				<span class="inner"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add iconfont icon-zengjia" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default{
		props:{
			food:{
				type:Object,
			}
		},
		methods:{
			decreaseCart(event){
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--
				}
			},
			addCart(event){	
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1)
				}else{
					this.food.count++
				}
				console.log(this.$root.eventHub);
				this.$root.eventHub.$emit('cart.add', event.target);
			}
		},
	}
</script>

<style scoped>
	.cartcontrol{
		font-size:0px
	}
	.cart-decrease,.cart-add{
		display:inline-block;
		padding:6px;;
		display:inline-block;
		line-height:24px;
		font-size:18px;
		color:rgb(0,160,220);
	}
	.cart-count{
		display:inline-block;
		vertical-align:top;
		width:12px;
		padding-top:6px;
		line-height:24px;
		text-align:center;
		font-size:10px;
		color:rgb(147,153,159);
	}
	.cart-add{
		display:inline-block;
	}
	.fade-enter-active, .fade-leave-active {
		transition: all 0.25s linear;
	}
	.fade-enter, .fade-leave-to {
	   opacity: 0;
	   transform:translate3d(24px,0,0);
	}			
			
			
		
		
</style>