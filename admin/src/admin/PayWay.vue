<!-- 管理支付方式，貨幣和地區-->
<template>
    <!--管理支付方式-->
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
        <!--管理貨幣-->
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
        <!--管理地區-->
        <div class="block">
            <div class="title">{{$t('areas')}}</div>
            <div class="list">
                <div class="replace" v-if="replace3">
                    {{$t('noAreasAdded')}}
                </div>
                <el-tag type="warning" class="tag" v-for="(item,index) in listArea" :key="index" closable @close="delArea(item.id)">{{item.title+item.title_en}}</el-tag>
            </div>
            <div class="form">
                <el-form :model="form3" :rules="rules3" ref="form3">
                    <el-row :gutter=20>
                        <el-col :span=6>
                            <el-form-item prop="title">
                                <el-input v-model="form3.title" :placeholder="$t('areaName')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span=6>
                            <el-input v-model="form3.title_en" :placeholder="$t('englishLabel')"></el-input>
                        </el-col>
                        <el-col :span=6>
                            <el-button type="warning" size="normal" @click="addArea()">{{$t('confirm')}}</el-button>
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
            listArea:[],
            replace:false,
            replace2:false,
            replace3:false,
            form:{
                title:'',
                title_en:''
            },
            form2:{
                title:'',
                unit:'',
                title_en:''
            },
            form3:{
                title:'',
                title_en:''
            },
            rules:{
                title:[
                    {required:true, message:this.$t('inputPaymentMethod'), trigger:'blur'},
                    {min:1, max:15, message:this.$t('paymentMethodNameLength'), trigger:'blur'}
                ]
            },
            rules2:{
                title:[
                    {required:true, message:this.$t('enterCurrencyName'), trigger:'blur'},
                    {min:1, max:15, message:this.$t('paymentMethodNameLength'), trigger:'blur'}
                ],
                unit:[
                    {required:true, message:this.$t('enterCurrencyUnit'), trigger:'blur'},
                    {min:1, max:15, message:this.$t('paymentMethodNameLength'), trigger:'blur'}
                ]
            },
            rules3:{
                title:[
                    {required:true, message:this.$t('enterAreaName'), trigger:'blur'},
                    {min:1, max:15, message:this.$t('paymentMethodNameLength'), trigger:'blur'}
                ]
            }
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await $.post('SuperAdmin','setList',{},true)
            if(res.status == 1){
                this.listPay = []
                this.listCurrency = []
                this.listArea = []

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
                if(res.data.area.length==0) this.replace3 = true
                else{
                    this.replace3 = false
                    this.listArea = res.data.area
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
            this.$confirm(this.$t('removePaymentMethodMessage'),this.$t('removePaymentMethod')).then(async ()=>{
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
            this.$confirm(this.$t('removeCurrencyMessage'),this.$t('removeCurrency')).then(async ()=>{
                let res = await $.post('SuperAdmin','currencyDel',{id:id},true)
                if(res.status == 1){
                    this.loadData()
                } else this.$message.error(res.msg)
            }).catch(()=>{})
        },
        // 添加地區
        async addArea(){
            let valid = await this.$refs['form3'].validate()
            if(valid){
                let res = await $.post('SuperAdmin','areaAdd',this.form3,true)
                if(res.status == 1){
                    this.loadData()
                } else this.$message.error(res.msg)
            }
        },
        async delArea(id){
            if(!id) return
            this.$confirm(this.$t('removeAreaMessage'),this.$t('removeArea')).then(async ()=>{
                let res = await $.post('SuperAdmin','areaDel',{id:id},true)
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
