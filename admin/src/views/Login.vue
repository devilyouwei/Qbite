<template>
    <div class="login">
        <el-alert :title="msg" :type="success" v-show="msg" show-icon></el-alert>
        <h1>後台登錄</h1>
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
                <el-form-item>
                    <el-button type="primary" @click="login('form')">登入</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style scoped>
.login{
    text-align:center;
}
.login h1{
    padding-top:10%;
    font-size:0.8rem;
    font-weight:bolder;
    padding:0.5rem 0;
}
.login .form-field{
    width:60%;
    margin:0 auto;
}
</style>
<script>
import $ from '../tool.js'
export default {
    name: 'Login',
    data: function (){
        return {
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
        }
    }
}
</script>
