<template>
	<span class="icon" :class="classMap[iconType]"></span>
</template>
<script>
	export default{
		props:{
			iconType:{
				type:Number,
			}
		},
		created(){
			this.classMap=['decrease', 'discount', 'special', 'invoice', 'guarantee']
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/style/mixin.styl'

.icon
  display:inline-block
  width:12px
  height:12px
  background-size:100% 100%
  background-repeat:no-repeat
  vertical-align:top
  &.decrease
      bg-image("decrease_4")
  &.discount
      bg-image("discount_4")
  &.invoice
      bg-image("invoice_4")
  &.special
      bg-image("special_4")
  &.guarantee
      bg-image("guarantee_4")
</style>