 <template>
  <div class="history_detail_page">
        <head-top head-title="体检记录详情" go-back='true'></head-top>
        <ul class="history_list_ul">
            <li class="history_list_li" v-for="(item,index) in recordDetail" :key="item.id">
                <section class="history_item_right">
                    <section @click="showDetail(item.tag)">
                        <header class="history_item_right_header">
                            <section class="history_header">
                                <h4><span class="ellipsis">{{index}}</span>
                                </h4>
                                
                            </section>
                            <h4 class="history_status">
                                {{item}}
                            </h4>
                        </header>
                    </section>
                </section>
            </li>
        </ul>
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
    import {getbodyrecord} from 'src/service/getData'
    import loading from 'src/components/common/loading'
    import BScroll from 'better-scroll'
    import {imgBaseUrl} from 'src/config/env'

    export default {

      data(){
            return{
                recordDetail: null,
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
                'historyRecordDetail', 'userInfo'
            ]),
        },
        methods: {
            async initData(){
                if (this.userInfo && this.userInfo.id) {
                    let obj = await getbodyrecord(this.historyRecordDetail);
                    if(obj.success){
                        this.recordDetail = obj.data;
                    }
                    this.showLoading = false;
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
        position: absolute;
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
    .history_list_ul{
        .history_list_li{
            background-color: #fff;
            display: flex;
            // margin-bottom: 0.5rem;
            padding: .6rem .6rem 0;
            .history_item_right{
                flex: 5;
                .history_item_right_header{
                    border-bottom: 0.025rem solid #f5f5f5;
                    padding-bottom: .3rem;
                    @include fj;
                    .history_header{
                        h4{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            @include sc(.75rem, #333);
                            line-height: 1rem;
                            margin-left:1rem;
                        }
                    }
                    .history_status{
                        margin-right:1rem;
                        @include sc(0.8rem, #333);
                    }
                }
            }
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
