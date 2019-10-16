<template>
    <div class="set">
        <!--員工管理-->
        <el-row style="margin-bottom:0.3rem;font-size:0.25rem;"><i class="iconfont icon-info">&nbsp;</i>{{$t('storeInformation')}}</el-row>
        <el-row type="flex" align="middle" class="header" :style="shop.background?'background:url('+shop.background+')':''">
            <el-col :span="4">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="uploadLogoSuccess" :data="{user:JSON.stringify(user)}" :on-error="uploadLogoError">
                    <img v-if="shop.img" :src="shop.img" :key="shop.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
            <el-col :span="10" style="text-align:center">
                <el-input :placeholder="$t('enterStoreDetails')" v-model="shop.title" clearable></el-input>
                <el-input :placeholder="$t('storeDescription')" v-model="shop.description" clearable style="margin-top:0.3rem"></el-input>
                <el-input :placeholder="$t('storePhone')" v-model="shop.phone" clearable style="margin-top:0.3rem"></el-input>
            </el-col>
            <el-col :span="10" style="text-align:right">
                <el-upload class="upload-demo" :action="uploadUrl" :show-file-list="false" :on-success="uploadBgSuccess" :data="{user:JSON.stringify(user)}" :on-error="uploadBgError">
                    <el-button size="small" type="primary">{{$t('uploadBgImage')}}</el-button>
                </el-upload>
                <el-button type="primary" @click="changeShop">{{$t('save2')}}</el-button>
            </el-col>
        </el-row>

        <setDesk></setDesk>
        <setStaff style="margin-top:0.5rem;"></setStaff>
    </div>
</template>
<script>
import $ from '../tool.js'
import setDesk from '../components/SetDesk.vue'
import setStaff from '../components/SetStaff.vue'
export default {
    name:'Set',
    components: {
        setDesk,setStaff
    },
    data(){
        return{
            user:$.getUserInfo(),
            uploadUrl:$.URL+'/Upload/img',
            shop:{
                title:'',
                phone:'',
                description:'',
                background:'',
                img:''
            }
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await  $.post('Admin','setShop')
            if(res.status == 1) {
                this.shop.title = res.data.title
                this.shop.img = res.data.img
                this.shop.phone = res.data.phone
                this.shop.description = res.data.description
                this.shop.background = res.data.background
            }
        },
        async changeShop(){
            if(!this.shop.title) return this.$message.error(this.$t('storeNameError'));
            if(!this.shop.phone) return this.$message.error(this.$t('storePhoneError'));
            if(!this.shop.img) return this.$message.error(this.$t('uploadImageError'));
            if(!this.shop.description) return this.$message.error(this.$t('descriptionError'));
            if(!this.shop.background) return this.$message.error(this.$t('uploadBgImageError'));
            let res = await $.post('Admin','setShop',this.shop,true)
            if(res.status==1) this.$message({ message: res.msg, type: 'success' })
        },
        uploadLogoError(){
            this.$message.error(this.$t('uploadError'))
        },
        uploadLogoSuccess(res){
            if(res.status == 1){
                this.shop.img = res.data
                this.$message({
                    type:'success',
                    message:res.msg
                })
            }
        },
        uploadBgError(){
            this.$message.error(this.$t('uploadError'))
        },
        uploadBgSuccess(res){
            if(res.status == 1){
                this.shop.background = res.data
                this.$message({
                    type:'success',
                    message:res.msg
                })
            }
        }
    }
}
</script>
<style>
.header{
    border:solid 1px #f0f0f0;
    padding:1rem 0.5rem;
    margin-bottom:1rem;
    background-position:center;
    border-radius:0.3rem;
    background-size:100%;
}
.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 2rem;
    color: #8c939d;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
}
.avatar {
    width: 2rem;
    height: 2rem;
    object-fit:cover;
}
</style>
