<template>
    <div class="fullscreen">
        <transition name="slide">
        <div class="reg-box" v-if="step==1">
            <h1 class="reg-title">Welcome</h1>
            <h1 class="reg-sub-title">STEP1-創建店鋪</h1>
            <el-form ref="form" :model="form" label-width="0px" class="form">
                <el-form-item label="" prop="email" :rules="[{ required: true, message: '郵箱不能為空', trigger: 'blur' }, { type: 'email', message: '輸入正確的郵箱地址', trigger: ['blur'] }]" style="text-left">
                    <el-input v-model="form.email" placeholder="輸入店鋪郵箱（待驗證）" style="width:60%;float:left;"></el-input>
                    <el-button @click="sendMail()" v-if="codeTime==0" style="width:3.3rem;">發送驗證碼</el-button>
                    <el-button v-if="codeTime>0" type="info" style="width:3.3rem;" plain disabled>{{codeTime}}s</el-button>
                </el-form-item>
                <el-form-item label="" prop="code" :rules="[{ required: true, message: '請輸入郵箱獲取的驗證碼', trigger: 'blur' }, { min:4,max:8,message: '驗證碼不符合規範', trigger: ['blur'] }]">
                    <el-input v-model="form.code" placeholder="輸入獲得的驗證碼" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="shop" :rules="[{ required: true, message: '請輸入店鋪名', trigger: 'blur' }, { min:5,max:20,message: '店鋪名5-20個字符', trigger: ['blur'] }]">
                    <el-input v-model="form.shop" placeholder="店鋪名稱" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="username" :rules="[{ required: true, message: '請輸入店長用戶名', trigger: 'blur' }, { min:3,max:20,message: '店長名3-20個字符', trigger: ['blur'] }]">
                    <el-input v-model="form.username" placeholder="店長用戶名" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="password" :rules="[{ required: true, message: '請輸入店鋪名', trigger: 'blur' }, { min:6,max:99,message: '密碼大於6位', trigger: ['blur'] }]">
                    <el-input v-model="form.password" type="password" placeholder="店長密碼" clearable show-password></el-input>
                </el-form-item>
                <el-form-item label="" class="text-left">
                    <span style="padding-right:0.5rem;">地區</span>
                    <el-select v-model="form.area" placeholder="選擇所屬地區">
                        <el-option v-for="(item,index) in area" :index="index" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" size="medium" @click="submit()" style="width:8rem;">創建店鋪</el-button>
                <el-button type="text" @click="toLog()" size="mini" class="log">已有賬戶？立即登錄</el-button>
            </el-form>
        </div>
        </transition>

        <transition name="slide">
        <div class="reg-box" v-if="step==2" style="margin-top:1.2rem;">
            <h1 class="reg-sub-title">STEP2-詳細資料</h1>
            <p style="color:red;">*為了更好的經營和管理您的店鋪，請繼續填寫店鋪的詳細信息</p>
            <el-form ref="form" :model="form" class="form">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :mutiple="false" :on-success="uploadSuccess" :on-error="uploadError" :data="{user:user}">
                    <img v-if="certificate" :src="certificate" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p class="tip">請上傳營業執照或相關產業的資質證明</p>
                <el-form-item label="" class="text-center">
                    <el-input type="textarea" v-model="location" style="width:7rem;" placeholder="請輸入詳細地址"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitMore()" style="width:6rem;margin:0.5rem 0;">提交</el-button>
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
            form:{
                eid:0,
                email:'',
                code:'',
                shop:'',
                username:'',
                area:1,
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
    },
    methods:{
        async submit(){
            let valid = await this.$refs['form'].validate()
            if(!this.form.eid) this.$message.error("請點擊發送驗證碼，并查看對應郵箱")
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
        async submitMore() {
            let data = JSON.parse(localStorage.getItem('reg_info'))
            data.location = this.location
            data.certificate = this.certificate
            if(!data.shopId) return this.$message.error('缺少店鋪ID')
            if(!data.userId) return this.$message.error('缺少用戶ID')
            if(!data.certificate) return this.$message.error('缺少相關證明證件圖')
            if(!data.location) return this.$message.error('缺少詳細地址')
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
        async toLog(){
            let res = await $.post('Config','config')
            if(res.status == 1) location.href = res.data.study_url
        },
        async sendMail(){
            let email = this.form.email
            if(email){
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
            } else this.$message.error("請輸入郵箱")
        },
        uploadSuccess(res){
            if(res.status == 1){
                this.certificate=res.data
            } else this.$message.error(res.msg)
        },
        uploadError(e){
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
    background:url('/imgs/bg/reg_bg.jpg');
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
    paddinG:0.3rem 0;
}
.reg-title{
    margin-top:1.2rem;
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
