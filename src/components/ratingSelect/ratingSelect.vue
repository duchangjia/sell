<template>
	<div class="RatingSelect">
		<div class="rating_type">
			<span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
			<span class="block negative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negitive}}<span class="count">{{negitive.length}}</span></span>
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
			<i class="iconfont icon-dagou icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>		
	</div>
</template>
<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return []
				}
			},
			desc:{
				type:Object,
				default(){
					return{
						all:'全部',
						positive:'满意',
						negitive:'不满意',
					}
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
		},
		computed:{
			positive(){
				return this.ratings.filter((item)=>{
					return item.rateType===POSITIVE;
				})
			},
			negitive(){
				return this.ratings.filter((item)=>{
					return item.rateType===NEGATIVE;
				})
			},
		},
		methods:{
			select(type,event){			
				/*if(!event._constructed){
					return;
				}*/
				//this.selectType=type;
				console.log("33")
				this.$emit('selRatings',type);
			},
			toggleContent(event){
				/*if(!event._constructed){
					return;
				}*/
				let only=!this.onlyContent;
				this.$emit('isContent',only);
			}
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/style/mixin.styl'

.RatingSelect
  .rating_type
    padding:18px 0
    margin:0 18px
    font-size:0
    border-1px(rgba(7,17,27,0.1))
    .block
      display:inline-block
      padding:8px 12px
      margin-right:8px
      border-radius:1px
      color:rgb(77,85,93)
      font-size:12px
      line-height:24px
      &.active
        color:#fff
      .count
        margin-left:2px
        font-size:8px
        line-height:16px
      &.positive
        background:rgba(0,160,220,0.2)
        &.active
          background:rgb(0,160,220)
      &.negative
        background:rgba(77,85,93,0.2)
        &.active
          background:rgb(77,85,93)
  .switch
    padding:12px 18px
    line-height:24px
    color:rgb(147,153,159)
    border-bottom:1px solid rgba(7,17,27,0.1)
    &.on
      .icon-check_circle
        color:#00c850
    .icon-check_circle
      margin-right:4px
      font-size:24px
    .text
      font-size:12px
      vertical-align:top
  .no_rating
    padding:16px 0
    font-size:12px
    line-height:24px
    color:rgb(147,153,159)
</style>