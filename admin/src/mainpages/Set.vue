<template>
    <div class="set">
        <el-dialog title="編輯店員" :visible.sync="dialogFormVisible" width="36%">
            <el-form :model="form" :rules="rules" ref="form" label-width="1.5rem">
                <el-row>
                    <el-form-item label="用戶名" prop="username">
                        <el-input v-model="form.username" type="text" style="width:6rem;" :disabled="form.id!=0"></el-input>
                    </el-form-item>
                    <el-form-item label="密碼" prop="password">
                        <el-input v-model="form.password" type="text" style="width:6rem;"></el-input>
                    </el-form-item>
                    <el-form-item label="職位" prop="pid">
                        <el-select v-model="form.pid" placeholder="選擇用戶職位" style="width:6rem;">
                            <el-option v-for="(item,index) in position" :key="index" :label="item.title" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" @click="submit">確定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="編輯新桌" :visible.sync="dialogFormVisible2">
            <el-form :model="form2" :rules="rules2" ref="form2">
                <el-form-item label="桌編號" prop="title">
                    <el-input v-model="form2.title" type="text"></el-input>
                </el-form-item>
                <el-form-item label="人數" prop="num">
                    <el-input v-model="form2.num" type="number"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2=false">取消</el-button>
                <el-button type="primary" @click="submit2">確定</el-button>
            </div>
        </el-dialog>

        <!--員工管理-->
        <el-row style="margin-bottom:0.3rem;font-size:0.25rem;"><i class="iconfont icon-info">&nbsp;</i>店鋪信息</el-row>
        <el-row type="flex" align="middle" class="header">
            <el-col :span="4">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="uploadSuccess" :data="{user:JSON.stringify(user)}" :on-error="uploadError">
                    <img v-if="shop.img" :src="shop.img" :key="shop.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
            <el-col :span="11">
                <el-input placeholder="请输入店名" v-model="shop.title">
                    <template slot="prepend">店鋪名</template>
                    <el-button slot="append" @click="changeShop">保存</el-button>
                </el-input>

            </el-col>
        </el-row>

        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <i class="iconfont icon-iconset0203">&nbsp;</i>店員管理
                </template>
                <el-row>
                    <el-table :data="users.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))" style="width:100%">
                        <el-table-column prop="id" label="編號" width="180"></el-table-column>
                        <el-table-column prop="username" label="用戶名" width="180"></el-table-column>
                        <el-table-column prop="position" label="店內職務"></el-table-column>
                        <el-table-column align="left" width="300">
                            <template slot="header" slot-scope="scope">
                                {{scope.length}}
                                <el-input v-model="search" size="mini" placeholder="輸入用戶名搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="userEdit(scope.row)">編輯</el-button>
                                <el-button size="mini" type="text" @click="userDelete(scope.row)">刪除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true" style="margin-top:0.3rem;float:right;">新增店員</el-button>
                </el-row>
            </el-collapse-item>
        </el-collapse>

        <!--餐桌管理-->
        <el-collapse accordion style="margin-top:1rem;">
            <el-collapse-item>
                <template slot="title">
                    <i class="iconfont icon-iconset0203">&nbsp;</i>餐桌管理
                </template>
                <el-row>
                    <el-table :data="desks.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))" style="width:100%">
                        <el-table-column prop="id" label="編號" width="180"></el-table-column>
                        <el-table-column prop="title" label="桌編號" width="180"></el-table-column>
                        <el-table-column prop="num" label="人數"></el-table-column>
                        <el-table-column align="left" width="300" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="deskDelete(scope.row)">刪除</el-button>
                                &nbsp;&nbsp;&nbsp;
                                <el-popover placement="right" width="400" trigger="click">
                                    <img :src="scope.row.qrcode" style="width:3rem;margin:0 auto;">
                                    <el-button size="mini" type="text" slot="reference">二維碼</el-button>
                                </el-popover>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible2=true" style="margin-top:0.3rem;float:right;">新增餐桌</el-button>
                </el-row>
            </el-collapse-item>
        </el-collapse>

    </div>
</template>
<script>
import $ from '../tool.js'
export default {
    name:'Set',
    data(){
        return{
            user:$.getUserInfo(),
            users:[],
            desks:[],
            uploadUrl:$.URL+'/Upload/img',
            search:'',
            dialogFormVisible:false,
            dialogFormVisible2:false,
            position:[],
            shop:{
                title:'',
                img:''
            },
            form:{
                id:0,
                username:'',
                password:'',
                pid:''
            },
            rules:{
                username:[
                    {required:true, message:'輸入用戶名', trigger:'blur'},
                    {min:5, max:20, message:'長度小於20個字符大於5個字符', trigger:'blur'}
                ],
                password:[
                    {required:true, message:'輸入密碼', trigger:'blur'},
                    {min:5, max:20, message:'長度小於50個字符大於5個字符', trigger:'blur'}
                ],
                pid:[{required:true, message:'請輸入職位', trigger:'blur'}],
            },
            form2: {
                title:'',
                num:0
            },
            rules2: {
                title:[{ required:true, message:'輸入桌號', trigger:'blur' }, { min: 1, max: 20, message: '長度小於20個字符', trigger: 'blur' }],
                num:[{ required: true, message: '请輸入桌人數', trigger: 'blur' },{min:1,max:99,message:'人數不合法',trigger:'blur'}]
            }
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await $.post('Admin','setUserList',{},true)
            if(res.status == 1) this.users = res.data
            else this.$message.error(res.msg)
            res = await  $.post('Admin','setShop')
            if(res.status == 1) {
                this.shop.title = res.data.title
                this.shop.img = res.data.img
            }
            res = await $.post('Admin','deskList')
            if(res.status==1){
                this.desks = res.data
            }else this.$message.error(res.msg);
        },
        async userDelete(item){
            let res = await $.post('Admin','setUserDelete',{id:item.id})
            if(res.status == 1) this.loadData()
            else this.$message.error(res.msg)
        },
        async deskDelete(item){
            let res = await $.post('Admin','setDeskDelete',{id:item.id})
            if(res.status==1) this.loadData()
            else this.$message.error(res.msg)
        },
        userEdit(item){
            this.form.id = item.id
            this.form.username = item.username
            this.form.pid = item.pid
            this.dialogFormVisible = true
        },
        // 提交用戶信息
        async submit(){
            let valid = await this.$refs['form'].validate()
            if(valid){
                let res = await $.post('Admin','setUserSave',this.form,true)
                if(res.status == 1) {
                    this.loadData()
                    this.dialogFormVisible = false
                } else this.$message.error(res.msg)
            }
        },
        // 提交餐桌
        async submit2(){
            let valid = await this.$refs['form2'].validate()
            if(!valid) return
            let form = this.form2
            if(form.title && form.num){
                let res = await $.post('Admin','deskSave',form,true)
                if(res.status==1){
                    this.loadData()
                    this.dialogFormVisible2 = false
                }else this.$message.error(res.msg);
            }
        },
        async changeShop(){
            let res = await $.post('Admin','setShop',{title:this.shop.title,img:this.shop.img},true)
            if(res.status==1) this.$message({ message: res.msg, type: 'success' })
        },
        uploadError(){
            this.$message.error('上傳失敗')
        },
        uploadSuccess(res){
            if(res.status == 1){
                this.shop.img = res.data
                this.$message({
                    type:'success',
                    message:res.msg
                })
            }
        }
    },
    watch:{
        async dialogFormVisible(v){
            if(v==true) {
                let res = await $.post('Admin','setPositionList')
                if(res.status == 1) this.position=res.data
            } else {
                this.form.id=0
                this.form.username=''
                this.form.password=''
                this.form.pid=''
            }
        },
        async dialogFormVisible2(v){
            if(v==false){
                this.form2.title=''
                this.form2.num=0
            }
        }
    }
}
</script>
<style>
.set{
    padding:0.5rem;
}
.header{
    border:solid 1px #f0f0f0;
    padding:0.2rem;
    margin-bottom:1rem;
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
    display: block;
}
</style>
