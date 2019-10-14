<template>
    <div class="payway">
        <div class="block">
            <div class="title">{{$t('paymentMethod')}}</div>
            <div class="list">
                <div class="replace" v-if="replace">
                    {{$t('noPaymentMethodsAdded')}}
                </div>
                <el-tag class="tag" v-for="(item,index) in listPay" :key="index" closable @close="delPay(item.id)">{{item.title}}&nbsp;&nbsp;{{item.title_en}}</el-tag>
            </div>
            <div class="form">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-row :gutter=20>
                        <el-col :span=6>
                            <el-form-item prop="title">
                                <el-input v-model="form.title" :placeholder="$t('inputPaymentMethod')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span=6>
                                <el-input v-model="form.title_en" :placeholder="$t('englishLabel')"></el-input>
                        </el-col>
                        <el-col :span=6>
                            <el-button type="primary" size="normal" @click="addPay()">{{$t('confirm')}}</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="block">
            <div class="title">{{$t('acceptedCurrencies')}}</div>
            <div class="list">
                <div class="replace" v-if="replace2">
                    {{$t('noCurrenciesAdded')}}
                </div>
                <el-tag type="success" class="tag" v-for="(item,index) in listCurrency" :key="index" closable @close="delCurrency(item.id)">{{item.title}}</el-tag>
            </div>
            <div class="form">
                <el-form :model="form2" :rules="rules2" ref="form2">
                    <el-row :gutter=20>
                        <el-col :span=6>
                            <el-form-item prop="title">
                                <el-input v-model="form2.title" :placeholder="$t('enterCurrencyName')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span=6>
                            <el-form-item prop="unit">
                                <el-input v-model="form2.unit" :placeholder="$t('enterCurrencyUnit')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span=6>
                                <el-input v-model="form2.title_en" :placeholder="$t('englishLabel')"></el-input>
                        </el-col>
                        <el-col :span=6>
                            <el-button type="success" size="normal" @click="addCurrency()">{{$t('confirm')}}</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    name:'PayWay',
    data(){
        return{
            listPay:[],
            listCurrency:[],
            replace:false,
            replace2:false,
            form:{
                title:'',
                title_en:''
            },
            form2:{
                title:'',
                unit:'',
                title_en:''
            },
            rules:{
                title:[
                    {required:true, message:'輸入支付方式名稱', trigger:'blur'},
                    {min:1, max:15, message:'長度小於15個字符', trigger:'blur'}
                ]
            },
            rules2:{
                title:[
                    {required:true, message:'輸入貨幣名稱（例如港幣）', trigger:'blur'},
                    {min:1, max:15, message:'長度小於15個字符', trigger:'blur'}
                ],
                unit:[
                    {required:true, message:'輸入貨幣的單位', trigger:'blur'},
                    {min:1, max:15, message:'長度小於15個字符', trigger:'blur'}
                ]
            }
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await $.post('SuperAdmin','payList',{},true)
            if(res.status == 1){
                if(res.data.payway.length==0) this.replace = true
                else{
                    this.replace = false
                    this.listPay = res.data.payway
                }
                if(res.data.currency.length==0) this.replace2 = true
                else{
                    this.replace2 = false
                    this.listCurrency = res.data.currency
                }
            }
        },
        async addPay(){
            let valid = await this.$refs['form'].validate()
            if(valid){
                let res = await $.post('SuperAdmin','payWayAdd',this.form,true)
                if(res.status == 1){
                    this.loadData()
                } else this.$message.error(res.msg)
            }
        },
        async delPay(id){
            if(!id) return
            this.$confirm('是否刪除該支付方式，刪除後用戶無法使用該支付方式','刪除支付方式').then(async ()=>{
                let res = await $.post('SuperAdmin','payWayDel',{id:id},true)
                if(res.status == 1){
                    this.loadData()
                } else this.$message.error(res.msg)
            }).catch(()=>{})
        },
        // 新增貨幣
        async addCurrency(){
            let valid = await this.$refs['form2'].validate()
            if(valid){
                let res = await $.post('SuperAdmin','currencyAdd',this.form2,true)
                if(res.status == 1){
                    this.loadData()
                } else this.$message.error(res.msg)
            }

        },
        // 刪除貨幣
        async delCurrency(id){
            if(!id) return
            this.$confirm('是否刪除該貨幣？刪除後貨幣無法使用','刪除貨幣').then(async ()=>{
                let res = await $.post('SuperAdmin','currencyDel',{id:id},true)
                if(res.status == 1){
                    this.loadData()
                } else this.$message.error(res.msg)
            }).catch(()=>{})
        }
    }
}
</script>
<style scoped>
.payway .block{
    padding-bottom:0.5rem;
}
.payway .block .title{
    font-size:0.3rem;
}
.payway .block .list{
    padding:0.5rem 0;
}
.payway .tag{
    margin-left:0.3rem;
}
</style>
