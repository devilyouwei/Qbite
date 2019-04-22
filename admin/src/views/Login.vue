<template>
    <div class="login" :style="bg?'background-image:url('+bg+')':'background-image:none;opacity:0'" :key="bg">
        <el-alert :title="msg" :type="success" v-show="msg" show-icon></el-alert>
        <h1>後台</h1>
        <div class="form-field">
            <el-form :model="form" status-icon :rules="formRule" ref="form" label-width="100px" class="form">
                <el-form-item label="店鋪郵箱" prop="email">
                    <el-input type="text" v-model="form.email" autocomplete="off" @keyup.enter.native="login('form')"></el-input>
                </el-form-item>
                <el-form-item label="用戶" prop="username">
                    <el-input type="text" v-model="form.username" autocomplete="off" @keyup.enter.native="login('form')"></el-input>
                </el-form-item>
                <el-form-item label="密碼" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off" @keyup.enter.native="login('form')"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="primary" @click="login('form')" style="width:4rem;font-size:0.4rem;margin-top:0.5rem;">登入</el-button>
            </div>
            <el-button type="text" @click="toReg()" size="mini" class="reg">沒有店鋪？立即註冊</el-button>
        </div>
    </div>
</template>
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
    background-size:100%;
}
.login h1{
    margin-top:2rem;
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
                    {required:true, message:'請輸入用戶名！', trigger:'blur'}
                ],
                email: [
                    {required:true, message:'請輸入郵箱！', trigger:'blur'}
                ],
                password: [
                    {required:true, message:'請輸入密碼！', trigger:'blur'}
                ]
            },
        }
    },
    mounted: function(){
        if($.getUserInfo().id) this.$router.replace('/Index')
        /*
        let count = 1;
        setInterval(()=>{
            count++
            if(count>10) count=1
            this.bg = '/imgs/bg/bg'+count+'.jpg'
        },5000)
        */
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
                            this.$router.replace('/Index')
                        },800)
                    }
                    else this.success = 'error'
                    this.msg = res.msg
                }
            })
        },
        toReg(){
            this.$router.replace('/Register')
        }
    }
}
</script>
