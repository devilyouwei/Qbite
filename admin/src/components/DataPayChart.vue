<!--收入查詢，按日期-->
<template>
    <div>
        <div class="i-table">
            <div class="i-cell title">
                {{$t('paymentMethodDistribution')}}
            </div>
            <div class="i-cell tool">
                <div class="picker">
                    <el-date-picker v-model="value" type="daterange" align="right" unlink-panels :range-separator="$t('to')" :start-placeholder="$t('startDate')" :end-placeholder="$t('endDate')" :picker-options="pickerOptions"></el-date-picker>
                </div>
            </div>
        </div>
        <!--走勢圖-->
        <div class="chart">
            <ve-pie :data="chart"></ve-pie>
        </div>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    name:'DataDeskChart',
    data(){
        return {
            value:'',
            list:[],
            payway:[],
            chart:{
                columns: ['支付方式', '收入'],
                rows: []
            },
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        const start = new Date(new Date().toLocaleDateString());
                        const end = new Date(new Date().toLocaleDateString());
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '近一周',
                    onClick(picker) {
                        const start = new Date(new Date().toLocaleDateString());
                        const end = new Date(new Date().toLocaleDateString());
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '一個月',
                    onClick(picker) {
                        const start = new Date(new Date().toLocaleDateString());
                        const end = new Date(new Date().toLocaleDateString());
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '全部',
                    onClick(picker) {
                        const start = new Date(new Date().toLocaleDateString());
                        const end = new Date(new Date().toLocaleDateString());
                        start.setTime(0);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(begin=0,end=Date.parse(new Date())){
            end += 3600*24*1000 // 向後延時一天，以獲得今天數據
            let res = await $.post('Index','incomeByPayWay',{begin:begin,end:end},true)
            if(res.status==1) {
                this.payway = res.data.payway
                this.list = res.data.orders
            } else this.$message.error(res.msg)
        }
    },
    watch:{
        value(v){
            this.loadData(Date.parse(v[0]),Date.parse(v[1]))
        },
        list(v){
            this.chart.rows = []
            for(let i in this.payway){
                this.chart.rows.push({
                    '支付方式': this.payway[i].title,
                    '收入': 0
                })
            }
            for(let i in v){ // 遍历订单
                for(let k in v[i].pay){ // 遍历支付方式
                    for(let j in this.chart.rows){ // 遍历饼图
                        if(this.chart.rows[j]['支付方式']==v[i].pay[k].title){
                            this.chart.rows[j]['收入'] += parseFloat(v[i].pay[k].value)
                        }
                    }
                }
            }
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
.chart{
    padding-top:1rem;
}
</style>
