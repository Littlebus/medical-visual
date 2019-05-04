 <template>
  <div class="history_detail_page">
        <head-top head-title="详情" go-back='true'></head-top>
        <el-container class="home_today_container">
            <el-main class="home_today" id="container">
            </el-main>
        </el-container>
        <!-- <section id="scroll_section" class="scroll_container">
            <section class="scroll_insert">

            </section>
        </section> -->
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import headTop from 'src/components/header/head'
    import {getImgPath} from 'src/components/common/mixin'
    import {getechart} from 'src/service/getData'
    import loading from 'src/components/common/loading'
    import BScroll from 'better-scroll'
    import {imgBaseUrl} from 'src/config/env'

    var echarts = require('echarts');
    export default {

      data(){
            return{
                showLoading: true, //显示加载动画
                imgBaseUrl
            }
        },
        mounted(){
            this.initData();
        },
        mixins: [getImgPath],
        components: {
            headTop,
            loading,
        },
        computed: {
            ...mapState([
                'historyDetail', 'userInfo'
            ]),
        },
        methods: {
            async initData(){
                if (this.userInfo && this.userInfo.id) {
                    let obj = await getechart(this.historyDetail);
                    if(obj.success){
                        var dom = document.getElementById('container');     
                        var myChart = echarts.init(dom);
                        myChart.setOption({
                                title: {
                                        text: '心率记录'
                                },
                                tooltip: {
                                        trigger: 'axis'
                                },
                                xAxis: {
                                        data: obj.data.map(function(item){ return item.time}),
                                },
                                yAxis: {
                                        splitLine: {
                                                show: false
                                        },
                                        min: function(value) {
                                            return Math.max(value.min - 50,0);
                                        },
                                        max: function(value) {
                                            return value.max + 50;
                                        },
                                },
                                dataZoom: [{
                                        start: 80
                                }, {
                                        type: 'inside'
                                }],
                                visualMap: {
                                        show: false,
                                        pieces: [{
                                                gt: 700,
                                                lte: 800,
                                                color: '#096'
                                        }, {
                                                gt: 800,
                                                lte: 900,
                                                color: '#ffde33'
                                        }, {
                                                gt: 900,
                                                lte: 1200,
                                                color: '#ff9933'
                                        }],
                                        outOfRange: {
                                                color: '#999'
                                        }
                                },
                                series: {
                                        name: '心率',
                                        type: 'line',
                                        data: obj.data.map(function(item){ return item.value}),
                                }
                        });
                    }
                    this.showLoading = false;
                    // this.$nextTick(() => {
                    //     new BScroll('#scroll_section', {  
                    //         deceleration: 0.001,
                    //         bounce: true,
                    //         swipeTime: 1800,
                    //         click: true,
                    //     }); 
                    // })
                }
            },
        },
        watch: {
            userInfo: function (value) {
                if (value && value.id) {
                    this.initData();
                }
            }
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .history_detail_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f1f1f1;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .scroll_container{
        // position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
    }
    .scroll_insert{
        padding-bottom: 3rem;
    }
    .history_titel{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .7rem;
        background-color: #fff;
        margin-bottom: 0.5rem;
        img{
            border: 0.05rem solid $blue;
            border-radius: 50%;
            @include wh(3rem, 3rem);
        }
        p:nth-of-type(1){
            @include sc(.9rem, #333);
            font-weight: bold;
            margin-top: .4rem;
        }
        p:nth-of-type(2){
            @include sc(.55rem, #999);
            width: 10rem;
            margin-top: .3rem;
            text-align: center;
        }
        .order_again{
            @include sc(.6rem, $blue);
            margin-top: .5rem;
            border: 0.025rem solid $blue;
            padding: .15rem .4rem;
            border-radius: .1rem;
        }
    }
    
    .loading-enter-active, .loading-leave-active {
        transition: opacity .7s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0
    }
    .home_today_container{
    padding-top: 0.3rem;
		border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
    .home_today{
      background-color: #fff;
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
    }
    .fl_back{
			@include wh(100%, 100%);
		}
  }
    
</style>
