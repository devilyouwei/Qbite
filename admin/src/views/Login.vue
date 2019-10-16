<template>
    <div class="login" :style="bg?'background-image:url('+bg+')':'background-image:none;opacity:0'" :key="bg">
        <el-alert :title="msg" :type="success" v-show="msg" show-icon></el-alert>
        <div class="language">
            <div class="i-table">
                <div class="i-cell">
                    <a href="#" @click="setLocale('en')">English</a>&nbsp;&nbsp;
                    <a href="#" @click="setLocale('zh')">繁體中文</a>
                </div>
                <div class="i-cell i-text-right">
                    <a href="/">{{$t("goIndex")}}</a>
                </div>
            </div>
        </div>
        <h1>{{$t("loginTitle")}}</h1>
        <div class="form-field">
            <el-form :model="form" status-icon :rules="formRule" ref="form" label-width="100px" class="form">
                <el-form-item :label="$t('storeEmailAddress')" prop="email">
                    <el-input type="text" v-model="form.email" autocomplete="off" @keyup.enter.native="login('form')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('username')" prop="username">
                    <el-input type="text" v-model="form.username" autocomplete="off" @keyup.enter.native="login('form')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('password')" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off" @keyup.enter.native="login('form')"></el-input>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button type="primary" @click="login('form')" style="width:4rem;font-size:0.4rem;margin-top:0.5rem;">{{$t("loginButtonLabel")}}</el-button>
            </div>
            <el-button type="text" @click="toReg()" size="mini" class="reg">{{$t("signupLabel")}}</el-button>
        </div>
    </div>
</template>
<style>
.el-message-box {
    width:auto!important;
}
</style>
<style scoped>
.reg{
    position:absolute;
    right:0.4rem;
    bottom:0.2rem;
}
.login{
    text-align:center;
    position:absolute;
    top:0;
    bottom:0;
    width:100%;
    height:100%;
    overflow:hidden;
    background-color:rgba(0,0,0,0.1);
    background-repeat:no-repeat;
    background-position:center;
    background-size:100% 100%;
}
.login h1{
    margin-top:0.3rem;
    font-size:0.8rem;
    font-weight:bolder;
    padding:0.5rem 0;
    color:#fff;
}
.login .form-field{
    position:relative;
    width:8rem;
    margin:0 auto;
    background-color:#fff;
    padding:1rem 0.6rem;
    color:#fff;
}
.language {
    text-align:left;
    padding:0.3rem 0.5rem;
}
.language a{
    color:#fff;
}
</style>
<script>
import $ from '../tool.js'
export default {
    name: 'Login',
    data: function (){
        return {
            bg:'/imgs/bg/bg'+parseInt($.random(1,10))+'.jpg',
            msg: '',
            success: 'success',
            form: {
                username: '',
                email:localStorage.getItem('s_email') || '',
                password: ''
            },
            formRule : {
                username: [
                    {required:true, message:this.$t('enterUsername'), trigger:'blur'}
                ],
                email: [
                    {required:true, message:this.$t('enterEmailError'), trigger:'blur'}
                ],
                password: [
                    {required:true, message:this.$t('passwordError'), trigger:'blur'}
                ]
            },
        }
    },
    mounted: function(){
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            this.$msgbox({
                title: this.$t('notice'),
                message: `<font color="red">${this.$t('mobileNotice')}</font><br>${this.$t('mobileNotice2')}<div style="font-weight:bold;">www.cocodata.xyz</div>${this.$t('mobileNotice3')}`,
                dangerouslyUseHTMLString: true,
                showCancelButton: true,
                confirmButtonText: this.$t('confirmButtonText'),
                cancelButtonText: this.$t('cancelButtonText'),
            }).then(async action => {
                if(action=='confirm') {
                    let res = await $.post('Config','config')
                    if(res.status == 1) location.href = res.data.study_url
                }
            })
        }
        if($.getUserInfo().pid==1) this.$router.replace('/Index')
        if($.getUserInfo().pid==2) this.$router.replace('/Cooker')
        if($.getUserInfo().pid==3) this.$router.replace('/Waiter')
    },
    methods: {
        login: function(form){
            this.$refs[form].validate(async valid => {
                if(valid) {
                    let res = await $.post('User','login',this.form,true)
                    if(res.status === 1) {
                        this.success = 'success'
                        localStorage.setItem('userinfo',JSON.stringify(res.data))
                        localStorage.setItem('s_email',this.form.email)
                        setTimeout(()=>{
                            switch(res.data.pid){
                                case 1:return this.$router.replace('/Index') // 店长
                                case 2:return this.$router.replace('/Cooker') // 厨师
                                case 3:return this.$router.replace('/Waiter') // 服务员
                                default:this.$router.replace('/Index') // 店长
                            }
                        },800)
                    }
                    else this.success = 'error'
                    this.msg = res.msg
                }
            })
        },
        setLocale(locale){
            localStorage.setItem('LANG',locale)
            this.$root.$i18n.locale = locale
        },
        toReg(){
            this.$router.replace('/Register')
        }
    }
}
</script>
