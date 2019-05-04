<template>
    <section id='foot_guide'>
        
        <section @click = "gotoAddress('/msite')" class="guide_item">
        	<svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('msite') !== -1? '#icon-active-shouye' : '#icon-shouye'"></use>
            </svg>
            <span>首页</span>
        </section>
        <section @click = "gotoAddress('/history')" class="guide_item">
        	<svg class="icon_style">

                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('history') !== -1? '#icon-active-history' : '#icon-history'"></use>
            </svg>
            <span>历史</span>
        </section>
        <section @click = "gotoAddress({path: `/chat`})" class="guide_item">
        	<svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('chat') !== -1? '#icon-active-chat' : '#icon-chat'"></use>
            </svg>
            <span>咨询</span>
        </section>
        <section @click = "gotoAddress('/profile')" class="guide_item">
        	<svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('profile') !== -1? '#icon-active-me' : '#icon-me'"></use>
            </svg>
            <span>我</span>
        </section>
    </section>
    
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        created(){

        },
        mounted(){

        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 1.95rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		.icon_style{
			@include wh(.8rem, .8rem);
			margin-top: .3rem;
			fill: #ccc;
		}
		span{
			@include sc(.45rem, #666);
		}
    }

</style>
