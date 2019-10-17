<template>
    <div class="setstaff">
        <el-dialog :title="$t('editUser')" :visible.sync="dialogFormVisible" width="36%" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" label-width="1.5rem">
                <el-row>
                    <el-form-item :label="$t('employeeUsername')" prop="username">
                        <el-input v-model="form.username" type="text" style="width:6rem;" :disabled="form.id!=0"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('password')" prop="password">
                        <el-input v-model="form.password" type="text" style="width:6rem;"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('position')" prop="pid">
                        <el-select v-model="form.pid" :placeholder="$t('selectPosition')" style="width:6rem;">
                            <el-option v-for="(item,index) in position" :key="index" :label="item.title" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="submit">{{$t('confirm')}}</el-button>
            </div>
        </el-dialog>


        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <i class="iconfont icon-iconset0203">&nbsp;</i>{{$t('staffManagement')}}
                </template>
                <el-row>
                    <el-table :data="users.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))" style="width:100%">
                        <el-table-column prop="id" :label="$t('id')" width="200"></el-table-column>
                        <el-table-column prop="username" :label="$t('employeeUsername')"></el-table-column>
                        <el-table-column prop="position" :label="$t('position2')" width="200"></el-table-column>
                        <el-table-column align="left" width="200">
                            <template slot="header" slot-scope="scope">
                                {{scope.length}}
                                <el-input v-model="search" size="mini" :placeholder="$t('searchByUsername')"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="userEdit(scope.row)">{{$t('edit')}}</el-button>
                                <el-button size="mini" type="text" @click="userDelete(scope.row)">{{$t('delete')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true" style="margin-top:0.3rem;float:right;">{{$t('addNewStaff')}}</el-button>
                </el-row>
            </el-collapse-item>
        </el-collapse>

    </div>
</template>

<script>
import $ from '../tool.js'
export default {
    name:'SetStaff',
    data(){
        return{
            users:[],
            dialogFormVisible:false,
            search:'',
            position:[],
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
        },
        async userDelete(item){
            let res = await $.post('Admin','setUserDelete',{id:item.id})
            if(res.status == 1) this.loadData()
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
        }
    }

}
</script>

<style>
</style>
