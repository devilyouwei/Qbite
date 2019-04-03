<template>
    <div class="admin">
        <el-dialog title="編輯商铺" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="1rem">
                <el-row :gutter="12">
                    <el-col :span="24">
                        <el-form-item label="店名" prop="title">
                            <el-input v-model="form.title" type="text"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="12">
                    <el-col :span="24">
                        <el-form-item label="email" prop="email">
                            <el-input v-model="form.email" type="text"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="12">
                    <el-col :span="12">
                        <el-form-item label="店長" prop="username">
                            <el-input v-model="form.username" type="text"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密碼" prop="password">
                            <el-input v-model="form.password" type="text"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" @click="submit">確定</el-button>
            </div>
        </el-dialog>
        <el-col :span="4">
            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true">新增</el-button>
        </el-col>
        <el-table :data="shops.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" style="width:100%">
            <el-table-column prop="id" label="編號" width="180"></el-table-column>
            <el-table-column prop="title" label="店鋪名" width="180"></el-table-column>
            <el-table-column prop="email" label="郵箱" width="180"></el-table-column>
            <el-table-column prop="time" label="加入時間"></el-table-column>
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
    </div>
</template>

<script>
import $ from '../tool.js'
export default{
    name: 'Admin',
    mounted(){
        this.loadData()
    },
    data(){
        return{
            shops:[],
            dialogFormVisible: false,
            form: {
                title:'',
                username:'',
                email:'',
                password:''
            },
            rules:{
                title:[
                    {required:true, message:'輸入店鋪名', trigger:'blur'},
                    {min:1, max:20, message:'長度小於20個字符', trigger:'blur'}
                ],
                email:[
                    {required:true, message:'輸入郵箱', trigger:'blur'},
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                ],
                username:[{required:true, message:'請輸入用戶名', trigger:'blur'}],
                password:[{required:true, message:'請輸入密碼', trigger:'blur'}],
            },
            search:''
        }
    },
    methods:{
        async loadData(){
            let res = await $.post('Admin','adminListShops')
            if(res.status == 1){
                for(let i in res.data){
                    res.data[i].time = $.formatDate($.stamp2date(res.data[i].time),'yyyy-MM-dd')
                }
                this.shops = res.data
            }
        },
        async submit(){
            let valid = await this.$refs['form'].validate()
            if(valid){
                let res = await $.post('Admin','adminAddShops',this.form,true)
                if(res.status==1){
                    this.loadData()
                } else this.$message.error(res.msg)
            }
        }
    }
}
</script>

<style scoped>
.admin{
    padding:0.5rem;
}
</style>
