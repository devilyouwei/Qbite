<template>
    <div class="menu">
        <el-row :gutter="10" style="margin-bottom:0.5rem;">
            <el-col :span="4">
                <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true">{{$t('addNew')}}</el-button>
            </el-col>
            <el-col :span="10">
                <el-input :placeholder="$t('searchDish')" prefix-icon="el-icon-search" v-model="search" @keyup.enter.native="doSearch()"></el-input>
            </el-col>
        </el-row>
        <el-table :data="list">
            <el-table-column prop="title" :label="$t('name')" width="200"></el-table-column>
            <el-table-column prop="price" :label="$t('price')" width="150"></el-table-column>
            <el-table-column prop="type" :label="$t('category')" width="180"></el-table-column>
            <el-table-column prop="rank" :label="$t('rank')" width="80"></el-table-column>
            <el-table-column prop="time" :label="$t('lastEdited')"></el-table-column>
            <el-table-column :label="$t('actions')" fixed="right" width="100">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">{{$t('edit')}}</el-button>
                    <el-button @click="del(scope.row)" type="text" size="small">{{$t('delete')}}</el-button>
                </template>
            </el-table-column>
            <el-table-column :label="$t('supply')" fixed="right" width="80">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_effect" active-value="1" inactive-value="0" active-color="#409EFF" inactive-color="#ccc" @change="switchEffect(scope.row.id,scope.row.is_effect)"></el-switch>

                </template>
            </el-table-column>
        </el-table>

        <!--新增對話框-->
        <el-dialog :title="$t('editDish')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" label-width="1rem" v-loading="uploading">
                <el-row :gutter="12" style="text-align:center;padding-bottom:0.5rem">
                    <el-col :span="24">
                        <el-upload :action="uploadUrl" :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError" :on-progress="uploadProgress" :data="{user:JSON.stringify(user)}" drag accept="image/gif,image/jpeg,image/png">
                            <img v-if="form.thumb" :src="form.thumb" :key="form.thumb" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row :gutter="12" style="text-align:center;">
                    <el-col :span="12">
                        <el-form-item :label="$t('nameOfDish')" prop="title">
                            <el-input v-model="form.title" type="text" style="width:4rem;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('rank')" prop="rank">
                            <el-input-number v-model="form.rank" :min="0" :max="999" :label="$t('rank')" style="width:4rem;"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="12" style="text-align:center;">
                    <el-col :span="12">
                        <el-form-item :label="$t('category')" prop="tid">
                            <el-select v-model="form.tid" :placeholder="$t('dishCategory')" style="width:4rem;">
                                <el-option v-for="(item,index) in type" :key="index" :label="item.title" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('price')" prop="price">
                            <el-input-number v-model="form.price" :min="0" :label="$t('price')" style="width:4rem;"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('description')">
                            <el-input type="textarea" v-model="form.intro"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="submit">{{$t('confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import $ from '../tool.js'
export default {
    name: 'Index',
    data: function(){
        return{
            user:$.getUserInfo(),
            dialogFormVisible: false,
            search:'',
            list:[],
            type:[],
            uploadUrl:$.URL+'/Upload/img',
            uploading:false,
            form:{
                id:0,
                title:'',
                tid:'',
                price:0,
                rank:0,
                intro:'',
                thumb:''
            },
            rules:{
                title:[
                    {required:true, message:'輸入菜品名稱', trigger:'blur'},
                    {min:1, max:20, message:'長度小於20個字符', trigger:'blur'}
                ],
                rank:[{required:true, message:'請輸入排名', trigger:'blur'}],
                tid:[{required:true, message:'請輸入所屬分類', trigger:'blur'}],
                price:[{required:true, message:'請輸入價格', trigger:'blur'}]
            }
        }
    },
    mounted: function(){
        if(!this.user) return
        this.loadData()
    },
    methods: {
        async loadData(){
            let res = await $.post('Admin','menuList',{search:this.search},true)
            if(res.status == 1){
                this.list = res.data
                for(let i in this.list){
                    this.list[i].time = $.formatDate($.stamp2date(this.list[i].time),'yyyy-MM-dd hh:mm:ss')
                    this.list[i].is_effect = this.list[i].is_effect+''
                }
            }
        },
        async submit(){
            let valid = await this.$refs['form'].validate()
            if(!this.form.thumb) return this.$message.error('請上傳圖片')
            if(valid){
                let res = await $.post('Admin','menuSave',this.form,true)
                if(res.status == 1){
                    this.loadData()
                    this.dialogFormVisible = false
                } else this.$message.error(res.msg)
            }
        },
        async edit(item){
            this.form.id=item.id
            this.form.title=item.title
            this.form.tid=item.tid
            this.form.price=item.price
            this.form.rank=item.rank
            this.form.thumb=item.thumb
            this.form.intro=item.intro
            this.dialogFormVisible=true
        },
        async del(item){
            let res = await $.post('Admin','menuDelete',{id:item.id},true)
            if(res.status==1) this.loadData()
            else this.$message.error(res.msg)
        },
        async doSearch(){
            this.loadData()
        },
        async switchEffect(id,effect){
            let res = await $.post('Admin','menuEffect',{id:id,effect:effect})
            if(res.status==1) this.$message({ message: res.msg, type: 'success' })
            else this.$message.error(res.msg)

        },
        uploadProgress(){
            this.uploading = true
        },
        uploadError(){
            this.uploading = false
            this.$message.error('上傳失敗')
        },
        uploadSuccess(res){
            this.uploading = false
            if(res.status == 1){
                this.form.thumb = res.data
                this.$message({
                    type:'success',
                    message:res.msg
                })
            }
        }
    },
    watch:{
        async dialogFormVisible(v){
            if(v===true){
                let res = await $.post('Admin','typeList')
                if(res.status == 1) this.type=res.data
            }else{
                this.form.id=0
                this.form.title=''
                this.form.intro=''
                this.form.tid=''
                this.form.price=0
                this.form.rank=0
                this.form.thumb=''
            }
        }
    }
}
</script>
<style scoped>
.menu{
    padding:1rem;
}
.avatar-uploader .el-upload {
    border: 0.1rem solid #000;
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
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
}
.avatar {
    height: 100%;
    width:auto;
    margin:0 auto;
    display: block;
}
</style>
