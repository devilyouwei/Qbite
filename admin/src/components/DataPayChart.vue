<!--饼图：支付方式-->
<template>
    <div>
        <div class="title">
            {{$t('paymentMethodDistribution')}}
        </div>

        <div class="chart">
            <ve-pie :data="chart"></ve-pie>
        </div>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    name:'DataDeskChart',
    props:{
        date: Array
    },
    data(){
        return {
            list:[],
            chart:{
                columns: ['支付方式', '收入'],
                rows: []
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
                this.list = []
                this.list = res.data
            } else this.$message.error(res.msg)
        }
    },
    watch:{
        date:{
            immediate: true, 
            handler (v, oldVal) {
                this.loadData(Date.parse(v[0]),Date.parse(v[1]))
            }
        },
        list(v){
            this.chart.rows = []
            // 整理出所有的支付方式
            let arr = []
            for(let i in v){
                for(let j in v[i]['pay']){
                    arr.push(v[i]['pay'][j]['title'])
                }
            }
            arr = $.unique(arr)
            for(let i in arr){
                this.chart.rows.push({
                    '支付方式': arr[i],
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
