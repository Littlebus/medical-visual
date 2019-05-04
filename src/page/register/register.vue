<template>
    <div class="restContainer">
        <head-top head-title="注册" goBack="true"></head-top>
        <form class="restForm">
            <section class="input_container phone_number">
                <input type="text" placeholder="请输入邮箱" name="Email" v-model="Email">
                <!-- <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
                <button  @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button> -->
            </section>
             <section class="input_container">
                <input type="text" placeholder="请输入姓名" name="Name" v-model="Name">
            </section>
            <section class="input_container">
                <input type="text" placeholder="请输入密码" name="PassWord" v-model="PassWord">
            </section>
            <!-- <section class="input_container">
                <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
            </section>
            <section class="input_container">
                <input type="text" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section> -->
        </form>
        <div class="login_container" @click="registerButton">确认注册</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {registerUser} from 'src/service/getData'

    export default {
        data(){
            return {
                Email: null,
                Name: null,
                PassWord: null,
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        components: {
            headTop,
            alertTip,
        },
        methods: {
            async registerButton(){
                if (!this.Email) {
                    this.showAlert = true;
                    this.alertText = '请输入正确的邮箱';
                    return
                }else if(!this.Name){
                    this.showAlert = true;
                    this.alertText = '请输入姓名';
                    return
                }else if(!this.PassWord){
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return
                }
                // 发送信息
                let res = await registerUser(this.Email, this.Name, this.PassWord);
                alert(res.success);
                if (res.success) {
                    this.showAlert = true;
                    this.alertText = '注册成功';
                }else{
                    this.showAlert = true;
                    this.alertText = res.data;
                    return
                }
            },
            closeTip(){
                this.showAlert = false;
            }   
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .restContainer{
        padding-top: 1.95rem;
    }
    .restForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .captcha_code_container{
        height: 2.2rem;
        .img_change_img{
            display: flex;
            align-items: center;
            img{
                @include wh(3.5rem, 1.5rem);
                margin-right: .2rem;
            }
            .change_img{
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 2rem;
                justify-content: center;
                p{
                    @include sc(.55rem, #666);
                }
                p:nth-of-type(2){
                    color: #3b95e9;
                    margin-top: .2rem;
                }
            }
        }
    }
    .login_container{
        margin: 1rem .5rem;
        @include sc(.7rem, #fff);
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
</style>
