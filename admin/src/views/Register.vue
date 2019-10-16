<template>
    <div class="fullscreen">
        <transition name="slide">
        <div class="reg-box" v-if="step==1">
            <h1 class="reg-title">Welcome</h1>
            <h1 class="reg-sub-title">STEP1-{{$t('createStoreLabel')}}</h1>
            <el-form ref="form" :model="form" label-width="0px" class="form">
                <el-form-item label="" prop="email" :rules="[{ required: true, message: $t('emptyStoreEmail'), trigger: 'blur' }, { type: 'email', message: $t('validEmailAddress'), trigger: ['blur'] }]" style="i-text-left">
                    <el-input v-model="form.email" :placeholder="$t('emailVerificationMessage')" style="width:60%;float:left;"></el-input>
                    <el-button @click="sendMail()" v-if="codeTime==0" style="width:3.3rem;">{{$t('sendVerificationCode')}}</el-button>
                    <el-button v-if="codeTime>0" type="info" style="width:3.3rem;" plain disabled>{{codeTime}}s</el-button>
                </el-form-item>
                <el-form-item label="" prop="code" :rules="[{ required: true, message: $t('verificationCodeInput'), trigger: 'blur' }, { min:4,max:8,message: $t('verificationCodeError'), trigger: ['blur'] }]">
                    <el-input v-model="form.code" :placeholder="$t('verificationCode')" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="shop" :rules="[{ required: true, message: $t('storeNameEnter'), trigger: 'blur' }, { min:5,max:20,message: $t('storeNameRequirements'), trigger: ['blur'] }]">
                    <el-input v-model="form.shop" :placeholder="$t('storeName')" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="username" :rules="[{ required: true, message: $t('usernameInput'), trigger: 'blur' }, { min:3,max:20,message: $t('usernameRequirements'), trigger: ['blur'] }]">
                    <el-input v-model="form.username" :placeholder="$t('usernamePlaceholder')" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="password" :rules="[{ required: true, message:  $t('passwordInput'), trigger: 'blur' }, { min:6,max:99,message: $t('passwordRequirements'), trigger: ['blur'] }]">
                    <el-input v-model="form.password" type="password" :placeholder="$t('passwordPlaceholder')" clearable show-password></el-input>
                </el-form-item>
                <el-form-item label="" class="i-text-left">
                    <span style="padding-right:0.5rem;">{{$t('location')}}</span>
                    <el-select v-model="form.area" :placeholder="$t('locationSelect')">
                        <el-option v-for="(item,index) in area" :index="index" :label="item.title+item.title_en" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" size="medium" @click="submit()" style="width:80%;">{{$t('createAccButtonLabel')}}</el-button>
                <el-button type="text" @click="toLog()" size="mini" class="log">{{$t('accountExistsLabel')}}</el-button>
                <el-button v-if="study" type="primary" @click="toStudy()" size="mini" class="study"><i class="iconfont icon-shubiaozhizhen">&nbsp;</i>{{$t('learnSystemLinkLabel')}}</el-button>
            </el-form>
        </div>
        </transition>

        <transition name="slide">
        <div class="reg-box" v-if="step==2" style="margin-top:1.2rem;">
            <h1 class="reg-sub-title">STEP2-{{$t('detailedInformation')}}</h1>
            <p style="color:red;">*{{$t('detailedInformationNote')}}</p>
            <el-form ref="form" :model="form" class="form">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :mutiple="false" :on-success="uploadSuccess" :on-error="uploadError" :data="{user:user}">
                    <img v-if="certificate" :src="certificate" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p class="tip">{{$t('uploadFilesTip')}}</p>
                <el-form-item label="" class="text-center">
                    <el-input type="textarea" v-model="location" style="width:7rem;" :placeholder="$t('enterFullAddress')"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitMore()" style="width:6rem;margin:0.5rem 0;">{{$t('submit')}}</el-button>
            </el-form>
        </div>
        </transition>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    data(){
        return {
            step:0,
            uploadUrl:$.URL+'/Upload/img',
            study:false,
            form:{
                eid:0,
                email:'',
                code:'',
                shop:'',
                username:'',
                area:'',
                password:''
            },
            user:localStorage.getItem('userinfo')||null,
            location:'',
            certificate:'',
            interval:0,
            codeTime:localStorage.getItem('code_time') || 0,
            area:[]
        }
    },
    async mounted(){
        if(localStorage.getItem('reg_info')) return this.step = 2
        this.step = 1
        let res = await $.post('User','areas')
        this.area = res.data
        if(this.codeTime>0){
            this.interval = setInterval(()=>{
                if(this.codeTime>0) this.codeTime--
                else clearInterval(this.interval)
                localStorage.setItem('code_time',this.codeTime)
            },1000)
        }
        if(!localStorage.getItem('study')) setTimeout(()=>{this.study = true},300)
    },
    methods:{
        // step1
        async submit(){
            let valid = await this.$refs['form'].validate()
            if(!this.form.eid) this.$message.error($t('verificationError'))
            if(valid){
                let res = await $.post('User','register',this.form)
                if(res.status == 1){
                    this.$message({message: res.msg,type: 'success'})
                    setTimeout(()=>{
                        localStorage.setItem('reg_info',JSON.stringify(res.data))
                        localStorage.setItem('userinfo',JSON.stringify(res.data.user)) // 登錄
                        this.user = JSON.stringify(res.data.user)
                        this.step = 2
                    },500)
                } else this.$message.error(res.msg)
            }
        },
        // step2
        async submitMore() {
            let data = JSON.parse(localStorage.getItem('reg_info'))
            data.location = this.location
            data.certificate = this.certificate
            if(!data.shopId) return this.$message.error($t('noStoreID'))
            if(!data.userId) return this.$message.error($t('noUserID'))
            if(!data.certificate) return this.$message.error($t('noSupportDocuments'))
            if(!data.location) return this.$message.error($t('noFullAddress'))
            delete data.user
            let res = await $.post('User','regMore',data,true)
            if(res.status == 1){
                this.$message({message: res.msg,type: 'success'})
                localStorage.removeItem('reg_info')
                localStorage.removeItem('userinfo')
                localStorage.removeItem('code_time')
                setTimeout(()=>{
                    this.$router.replace('/')
                },800)
            } else this.$message.error(res.msg)
        },
        async toStudy(){
            let res = await $.post('Config','config')
            if(res.status == 1) location.href = res.data.study_url
        },
        toLog(){
            this.$router.replace('/Login')
        },
        async sendMail(){
            let email = this.form.email
            if(!email) return this.$message.error(this.$t('enterEmailError'))
            let res = await $.post('User','sendCode',{email:email},true)
            if(res.status==1){
                this.codeTime = 60
                localStorage.setItem('code_time',this.codeTime)
                this.interval = setInterval(()=>{
                    if(this.codeTime>0) this.codeTime--
                    else clearInterval(this.interval)
                    localStorage.setItem('code_time',this.codeTime)
                },1000)
                this.$message({message: res.msg,type: 'success'})
                this.form.eid = res.data
            } else this.$message.error(res.msg)
        },
        uploadSuccess(res){
            if(res.status == 1){
                this.certificate=res.data
            } else this.$message.error(res.msg)
        }
    }
}
</script>
<style>
.reg-box .el-upload {
    border: 1px dashed #7b7b7b;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
}
</style>
<style scoped>
.fullscreen{
    background:#f0f0f0;
    background-attachment:fixed;
    background-repeat:no-repeat;
    background-size:auto 100%;
    background-position:center;
}
.avatar-uploader{
    margin:0.5rem 0 0.1rem 0;
}
p.tip{
    padding-bottom:0.5rem;
    font-size:0.33rem;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.reg-box{
    text-align:center;
    width:9rem;
    margin:0 auto;
    background:none;
}
.upload-box{
    margin:0.5rem 0;
}
.form{
    position:relative;
}
.form .log{
    padding-top:0.5rem;
}
.form .study{
    position:fixed;
    top:0;
    width:100%;
    left:0;
    right:0;
    margin:0;
    border-radius:0;
    font-size:0.5rem;
    font-weight:bold;
}
.reg-title{
    margin-top:1rem;
    padding:0.3rem 0;
    font-size:0.6rem;
    font-weight:bold;
}
.reg-sub-title{
    padding:0.3rem 0;
    font-size:0.5rem;
    text-align:left;
}
</style>
