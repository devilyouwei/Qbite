<!--訂單，收入，按桌號對比-->
<template>
    <div>
        <div class="title">
            {{$t('tableRevenueDistribution')}}
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
    props:{
        date: Array
    },
    data(){
        return {
            list:[],
            chart:{
                columns: ['桌號', '訂單數'],
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
            let res = await $.post('Index','incomeByDesk',{begin:begin,end:end},true)
            if(res.status==1) {
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
            for(let i in v){
                this.chart.rows.push({
                    '桌號': v[i].title,
                    '訂單數': v[i].orders
                })
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
