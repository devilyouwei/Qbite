<!--收入查詢，按日期-->
<template>
    <div class="data-income">
        <el-dialog :title="$t('revenueDetails')" :visible.sync="dialog" :close-on-click-modal="false" style="width:30rem;margin:0 auto;">
            <el-table :data="pay" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="i-table fixed">
                            <div v-for="(item,index) in props.row.pay" :key="index" class="i-cell text-center">
                                <div style="color:#000;font-size:0.3rem;line-height:0.4rem;font-weight:bold;">{{item.title}}</div>
                                <div style="color:#ff0000;line-height:0.4rem;">{{item.value}}</div>
                                <div style="color:#67C23A;line-height:0.4rem;">{{item.currency}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('orderId')" prop="id"></el-table-column>
                <el-table-column :label="$t('totalPrice')" prop="price"></el-table-column>
                <el-table-column :label="$t('tableNumber')" prop="title"></el-table-column>
                <el-table-column :label="$t('timeFinished')" prop="endtime"></el-table-column>
            </el-table>
        </el-dialog>
        <div class="title">
            {{$t('totalRevenue')}}
        </div>
        <el-table :data="tableData">
            <el-table-column prop="price" :label="$t('revenue') + '(' + $t('unit') + sign+')'"></el-table-column>
            <el-table-column prop="orders" :label="$t('numberOfOrders')"></el-table-column>
            <el-table-column :label="$t('actions')">
                <el-button @click="dialog=true" type="text" size="small">{{$t('revenueDetails')}}</el-button>
                <el-button @click="print" type="text" size="small">{{$t('print')}}</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>
<style>
.data-income .el-form--inline .el-form-item__label {
    font-weight:bold;
    font-size:0.3rem;
    line-height:0.5rem;
    display:block;
}
.data-income .el-form--inline .el-form-item {
    margin-right:0.3rem;
}
</style>
<script>
import $ from '../tool.js'
export default{
    name:'DataIncome',
    data(){
        return {
            sign:$.PRICE_SIGN,
            tableData:[],
            dialog:false,
            pay:[]
        }
    },
    props:{
        value:{}
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(begin=0,end=Date.parse(new Date())){
            end += 3600*24*1000 // 向後延時一天，以獲得今天數據
            let res = await $.post('Index','income',{begin:begin,end:end},true)
            if(res.status==1) {
                this.pay = res.data
                this.tableData = [{
                    price:0,
                    orders:0
                }]
                for(let i in this.pay){
                    this.pay[i].endtime = $.formatDate($.stamp2date(this.pay[i].endtime),'yyyy-MM-dd hh:mm:ss')
                    this.tableData[0].price+=parseFloat(this.pay[i].price)
                    this.tableData[0].orders++
                }
            } else this.$message.error(res.msg)
        },
        print(){
            let begin = Date.parse(this.value[0])
            let end = Date.parse(this.value[1])
            window.open(`/PrintIncome?begin=${begin}&end=${end}`,"_blank")
        }
    },
    watch:{
        value(v){
            this.loadData(Date.parse(v[0]),Date.parse(v[1]))
        }
    }
}
</script>
<style scoped>
.title{
    text-align:left;
    font-size:0.3rem;
    font-weight:bold;
}
.tool{
    text-align:right;
}
</style>
