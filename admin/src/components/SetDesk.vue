<template>
    <div class="setdesk">
        <el-dialog :title="$t('editNewTable')" :visible.sync="dialogFormVisible2" :close-on-click-modal="false">
            <el-form :model="form2" :rules="rules2" ref="form2">
                <el-form-item :label="$t('tableNumber2')" prop="title">
                    <el-input v-model="form2.title" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('tableNumber2')" prop="num">
                    <el-input v-model.number="form2.num" type="number"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2=false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="submit2">{{$t('confirm')}}</el-button>
            </div>
        </el-dialog>

        <!--餐桌管理-->
        <el-collapse accordion style="margin-top:1rem;">
            <el-collapse-item>
                <template slot="title">
                    <i class="iconfont icon-iconset0203">&nbsp;</i>{{$t('tableManagement')}}
                </template>
                <el-row>
                    <el-table :data="desks" style="width:100%">
                        <el-table-column prop="id" :label="$t('id')" width="180"></el-table-column>
                        <el-table-column prop="title" :label="$t('tableNumber2')" width="180"></el-table-column>
                        <el-table-column prop="num" :label="$t('numberOfPeople')"></el-table-column>
                        <el-table-column align="left" width="300" :label="$t('qrCode')">
                            <template slot-scope="scope">
                                <div v-html="scope.row.qrcode" style="width:2rem;">
                                    {{scope.row.qrcode}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column align="left" width="100" :label="$t('actions')">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="deskEdit(scope.row)">{{$t('edit')}}</el-button>
                                <el-button size="mini" type="text" @click="deskDelete(scope.row)">{{$t('delete')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible2=true" style="margin-top:0.3rem;float:right;">{{$t('addNewTable')}}</el-button>
                </el-row>
            </el-collapse-item>
        </el-collapse>

    </div>
</template>
<script>
import $ from '../tool.js'
export default {
    name:'SetDesk',
    data(){
        return{
            desks:[],
            dialogFormVisible2:false,
            form2: {
                id:0,
                title:'',
                num:0
            },
            rules2: {
                title:[{ required:true, message:this.$t('enterTableNumber'), trigger:'blur' }, { min: 1, max: 20, message: this.$t('tableNumberLength'), trigger: 'blur' }],
                num:[{ required: true, message: this.$t('enterNumberOfPeople'), trigger: 'blur' },{type:'number',min:1,max:99,message:this.$t('numberOfPeopleError'),trigger:'blur'}]
            }
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await $.post('Admin','deskList')
            if(res.status==1){
                let QR = require('qr-image')
                for(let i in res.data){
                    let url = `${$.CLIENT}?sid=${res.data[i].sid}&did=${res.data[i].id}`
                    res.data[i].qrcode = QR.imageSync(url, { type: 'svg' })
                }
                this.desks = res.data
            } else this.$message.error(res.msg)
        },
        async deskDelete(item){
            let flag = await this.$confirm(this.$t('confirmTableDelete'), this.$t('notice'), {
                confirmButtonText: this.$t('confirm'),
                cancelButtonText: this.$t('cancel'),
                type: 'warning'
            })
            if(flag=='confirm'){
                let res = await $.post('Admin','setDeskDelete',{id:item.id})
                if(res.status==1) this.loadData()
                else this.$message.error(res.msg)
            }
        },
        deskEdit(item){
            this.form2.id = parseInt(item.id)
            this.form2.title = item.title
            this.form2.num = parseInt(item.num)
            this.dialogFormVisible2 = true
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
    },
    watch:{
        async dialogFormVisible2(v){
            if(v==false){
                this.form2.title=''
                this.form2.num=0
                this.form2.id=0
            }
        }
    }
}
</script>
<style>
</style>
