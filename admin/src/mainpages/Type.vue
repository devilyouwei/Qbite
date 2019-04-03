<template>
    <div class="type">
        <el-row :gutter='12' style="margin-bottom:0.5rem;">
            <el-col :span="12">
                <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true">新增</el-button>
            </el-col>
        </el-row>
        <el-table :data="list">
            <el-table-column prop="title" label="名稱" width="180"></el-table-column>
            <el-table-column prop="rank" label="排名" width="180"></el-table-column>
            <el-table-column prop="time" label="最終編輯時間"></el-table-column>
            <el-table-column label="操作" fixed="right" width="100">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">編輯</el-button>
                    <el-button @click="del(scope.row)" type="text" size="small">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--新增對話框-->
        <el-dialog title="編輯類別" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="類別名" prop="title">
                    <el-input v-model="form.title" type="text"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="rank">
                    <el-input v-model="form.rank" type="number"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">確定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import $ from '../tool.js'
export default {
    name: 'Type',
    data: function(){
        return{
            user:$.getUserInfo(),
            list:[],
            dialogFormVisible: false,
            form:{
                id: 0,
                title:'',
                rank:0
            },
            rules:{
                title:[{ required:true, message:'輸入分類標題', trigger:'blur' }, { min: 1, max: 20, message: '長度小於20個字符', trigger: 'blur' }],
                rank:[{ required: true, message: '请輸入排名', trigger: 'blur' }]
            }
        }
    },
    mounted: function(){
        this.loadData()
    },
    methods: {
        async submit(){
            let valid = await this.$refs['form'].validate()
            if(valid){
                let res = await $.post('Admin','typeSave',this.form,true)
                if(res.status == 1) {
                    this.dialogFormVisible = false
                    this.loadData()
                }
            }
        },
        async loadData(){
            let res = await $.post('Admin','typeList',{},true)
            if(res.status == 1) {
                this.list = res.data
                for(let i in this.list){
                    this.list[i].time = $.formatDate($.stamp2date(this.list[i].time),'yyyy-MM-dd hh:mm:ss')
                }
            }
        },
        async del(item){
            let res = await $.post('Admin','typeDelete',{id:item.id},true)
            if(res.status == 1) this.loadData()
            else this.$message.error(res.msg);
        },
        async edit(item){
            this.form.id = item.id
            this.form.rank = item.rank
            this.form.title = item.title
            this.dialogFormVisible=true
        }
    },
    watch:{
        dialogFormVisible(v){
            if(v===false) {
                this.form.id = 0
                this.form.title = ''
                this.form.rank = 0
            }
        }
    }
}
</script>
<style scoped>
.type{
    padding:0.5rem;
}
</style>
