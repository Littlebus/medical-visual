<template>
  	<div class="paddingTop search_page">

        <head-top head-title="咨询" goBack="true"></head-top>
        <div class="block">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
            </el-carousel-item>
          </el-carousel>
        </div>
        
        <section class="info-data">
            <ul class="clear">
                <router-link to="/chat/chatbox" tag="li" class="info-data-link">
                    <span class="info-data-top"><b>我要咨询</b></span>
                    <span class="info-data-bottom"></span>
                </router-link>
                <router-link to="/" tag="li" class="info-data-link">
                    <span class="info-data-top"><b>咨询历史</b></span>
                    <span class="info-data-bottom"></span>
                </router-link>
            </ul>
        </section>

        <form class="search_form">
            <input type="search" name="search" placeholder="搜索用户" class="search_input" v-model="searchValue" @input="checkInput">
            <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget('')">
        </form>
        <section class="conversation">
            <ul>
                <router-link to="/chat/chatbox" tag="li" v-for="item in contactsList" :key="item.to_user_id" @click.native="refreshInfor(item)">
                    <div class="imgwipe">
                        <i class="redicon_num" v-if="item.unread!=0">
                            <!-- v-if="newinfo" -->
                        {{item.unread}}
                        </i>
                        <i class="redicon" v-if="newtext"></i>
                        <div class="imgstyle" v-if="item.to_user.avatar!=0">
                            <img :src="item.to_user.avatar" alt="">
                        </div>
                        <div class="imgstyle" v-else>
                            <img src="../../images/touxiang.jpg" alt="">
                        </div>
                    </div>
                    <div class="infordetail">
                        <div class="infordetail_top clear">
                            <span class="left ellipsis">{{item.to_user.name}}</span>
                            <span class="right">{{item.last_message_time}}</span>
                        </div>
                        <div class="infordetail_bot ellipsis">
                            {{item.last}}
                        </div>
                    </div> 
                </router-link>
            </ul>
        </section>
        <!-- <section v-if="contactsList.length">
            <ul class="list_container">
                <router-link :to="{path:'/chat/chatbox', query:{to:item.to_user_id}}" tag="li" v-for="item in contactsList" :key="item.to_user_id" class="list_li">
                    <section class="item_left">
                        <img :src="item.to_user.avatar" class="restaurant_img">
                    </section>
                    <section class="item_right">
                        <div class="item_right_text">
                            <p>
                                <span>{{item.to_user.name}}</span>
                            </p>
                            <p>unread：{{item.unread}}</p>
                            <p>{{item.last}}</p>
        
                        </div>
                        <ul class="item_right_detail">
                            <li >
                                <span class="only_phone">{{item.last_message_time}}</span>
                            </li>
                        </ul>
                    </section>
                </router-link>
            </ul>
        </section> -->

        <!-- <section class="search_history" v-if="searchHistory.length&&showHistory">
            <h4 class="title_restaurant">搜索历史</h4>
            <ul>
                <li v-for="(item, index) in searchHistory" :key="index" class="history_list">
                    <span class="history_text ellipsis" @click="searchTarget(item)">{{item}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">
                        <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />
                        <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />
                    </svg>
                </li>
            </ul>
            <footer class="clear_history" @click="clearAllHistory">清空搜索历史</footer>
        </section> -->
        <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>

        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import {searchRestaurant,app_contacts} from '../../service/getData'
import {imgBaseUrl} from '../../config/env'
import {getStore, setStore} from '../../config/mUtils'
import {mapState, mapMutations} from 'vuex'

export default {
	data(){
        return {
            newinfor:true,		//未静音时新消息提醒
            newtext:false,		//静音时消息提醒
            searchValue: '', // 搜索内容
            contactsList: [], // 搜索返回的结果
            imgBaseUrl, // 图片域名地址
            searchHistory: [], // 搜索历史记录
            showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
            emptyResult: false, // 搜索结果为空时显示
        }
    },
    created(){

    },
    mounted(){
        this.searchTarget();
    },
    components:{
        headTop,
        footGuide,
    },
    methods:{
        ...mapMutations([
            "SAVE_MESSAGE"
        ]),
        //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
        async searchTarget(){
            // if (historyValue) {
            //     this.searchValue = historyValue;
            // }else if (!this.searchValue) {
            //     return
            // }
            //隐藏历史记录
            this.showHistory = false;

            let get_contacts = await app_contacts();
            this.emptyResult = !get_contacts.success;
            this.contactsList = get_contacts.data;
        },
        //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
        checkInput(){
            if (this.searchValue === '') {
                this.showHistory = true; //显示历史记录
                this.contactsList = []; //清空搜索结果
                this.emptyResult = false; //隐藏搜索为空提示
            }
        },
        //点击删除按钮，删除当前历史记录
        deleteHistory(index){
            this.searchHistory.splice(index, 1);
            setStore('searchHistory',this.searchHistory);
        },
        //清除所有历史记录
        clearAllHistory(){
            this.searchHistory = [];
            setStore('searchHistory',this.searchHistory);
        },
        refreshInfor(item){
            this.SAVE_MESSAGE(item)
        },
    }
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .search_page{
        margin-bottom: 2rem;
    }
    .search_form{
        background-color: #fff;
        padding: 0.5rem;
        display: flex;
        input{
            height: 1.5rem;
        }
        .search_input{
            flex: 4;
            border: 0.025rem solid $bc;
            @include sc(0.65rem, #333);
            border-radius: 0.125rem;
            background-color: #f2f2f2;
            font-weight: bold;
            padding: 0 0.25rem;
        }
        .search_submit{
            flex: 1;
            border: 0.025rem solid $blue;
            margin-left: .2rem;
            @include sc(0.65rem, #fff);
            border-radius: 0.125rem;
            background-color: $blue;
            font-weight: bold;
            padding: 0 0.25rem;
        }
    }
    .title_restaurant{
        font-size: 0.6rem;
        line-height: 2rem;
        text-indent: 0.5rem;
        font-weight: bold;
        color: #666;
    }
    .list_container{
        background-color: #fff;
    }
    .list_li{
        display: flex;
        justify-content: 'center';
        padding: 0.5rem;
        border-bottom: 0.025rem solid $bc;
        .item_left{
            margin-right: 0.25rem;
            .restaurant_img{
                @include wh(1.7rem, 1.7rem);
            }
        }
        .item_right{
            font-size: 0.55rem;
            flex: 1;
            .item_right_text{
                padding-bottom: 0.25rem;
                border-bottom: 0.025rem solid $bc;
                p{
                    line-height: .9rem;
                }
                .pay_icon{
                    margin-bottom: -0.08rem;
                }
            }
            .item_right_detail{
                margin-top: 0.25rem;
                li{
                    font-size: 0;
                    span{
                        font-size: .5rem;
                        vertical-align: middle;
                        display: inline-block;
                        margin-bottom: 0.2rem;
                    }
                    .activities_icon{
                        @include sc(.5rem, #fff);
                        font-weight: bold;
                        padding: .04rem;
                        border-radius: 0.15rem;
                        margin-right: 0.125rem;
                    }
                    .only_phone{
                        color: #FF6000;
                    }
                }
            }
        }
    }
    .search_history{
        .history_list{
            background-color: #fff;
            border-bottom: 0.025rem solid $bc;
            @include font(0.7rem, 2rem);
            padding: 0 0.3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .history_text{
                display: inline-block;
                width: 80%;
            }
            .delete_icon{
                @include wh(1rem, 1rem);
            }
        }
        .clear_history{
            background-color: #fff;
            color: $blue;
            @include font(.7rem, 2rem);
            font-weight: bold;
            text-align: center;
        }
    }
    .search_none{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-align: center;
        margin-top: 0.125rem;
    }

    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }


  .el-carousel__item:nth-child(3n) {
    background-image: url("../../images/2.jpg");
    background-size:100% 100%;
  }
  .el-carousel__item:nth-child(3n+1) {
    background-image: url("../../images/3.jpg");
    background-size:100% 100%;
  }
  .el-carousel__item:nth-child(3n+2) {
    background-image: url("../../images/4.jpg");
    background-size:100% 100%;
  }


  .info-data{
        width:100%;
        background:$fc;
        box-sizing: border-box;
        border-bottom: 1px solid #f5f5f5;
        ul{
            .info-data-link{
                float:left;
                width:50%;
                display:inline-block;
                border-right:1px solid #f1f1f1;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .info-data-top{
                    @include sc(.55rem,#333);
                    padding: .853333rem 0 .453333rem;
                    b{
                        display:inline-block;
                        @include sc(1.0rem,#f90);
                        font-weight:400;
                        line-height:1rem;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .info-data-bottom{
                    @include sc(.57333rem,#666);
                    font-weight:400;
                    padding-bottom:.453333rem;

                }
            }
            .info-data-link:nth-of-type(1){
                .info-data-top{
                    b{
                        color:#ff5f3e;
                    }
                }

            }
            .info-data-link:nth-of-type(2){
                border:0;
                .info-data-top{
                    b{
                        color:#ff5f3e;
                    }
                }
            }
        }
   }
   .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }


    .conversation{
        background-color: #fff;
        width:100%;
        ul{
            width:100%;
            li{
                padding:0.3413333333rem 0.5973333333rem;
                box-sizing:border-box;
                border-bottom:1px solid #e0e0e0;
                @include fj(flex-start);
                .imgwipe{
                    @include wh(2.0906666667rem,2.0906666667rem);
                    position: relative;
                    margin-right:0.512rem;
                    .redicon_num{
                        position: absolute;
                        right:-0.4rem;
                        top:-0.3rem;
                        @include wh(0.8106666667rem,0.8106666667rem);
                        @include sc(0.512rem,#fff);
                        line-height:0.8806666667rem;
                        padding:0 4px;
                        text-align:center;
                        @include bis('../../images/warn.png');
                    }
                    .redicon{
                        position: absolute;
                        right:-0.21rem;
                        top:-0.21rem;
                        @include wh(0.4266666667rem,0.4266666667rem);
                        @include bis('../../images/warn.png');
                        border-radius:50%;
                    }
                    .imgstyle{
                        @include wh(2.0906666667rem,100%);
                        display: flex;
                        justify-content: center;
                        flex-flow:row wrap;
                        align-items: flex-start;
                        align-content: flex-start;
                        overflow: hidden;
                        background: #dddbdb;
                        img{
                            width: 10%;
                            height: auto;
                            border: 0;
                            flex-grow:2;
                        }
                    }
                    .imgstyletwo{
                        img{
                            width: 50%;
                            height:50%;
                            flex-grow:0;
                        }
                    }
                }
                .infordetail{
                    width:11.5626666667rem;
                    padding-top:0.2133333333rem;
                    .infordetail_top{
                        width:100%;
                        padding-bottom:0.2133333333rem;
                        span:nth-of-type(1){
                            // width:8.7466666667rem;
                            width: 6rem;
                            @include sc(0.5973333333rem,#38373c);
                        }
                        span:nth-of-type(2){
                            @include sc(0.4266666667rem,#b2b6b9);
                        }
                    }
                    .infordetail_bot{
                        width:9.5573333333rem;
                        @include sc(0.512rem,#9e9e9e);
                    }

                }
                
            }
        }
    }
	
</style>
