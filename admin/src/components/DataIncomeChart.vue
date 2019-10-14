<!--收入查詢，按日期-->
<template>
    <div>
        <div class="title">
            {{$t('revenueDailyTrend')}}
        </div>
        <!--走勢圖-->
        <div class="chart" v-if="list.length">
            <ve-line :data="chart"></ve-line>
        </div>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    name:'DataIncomeChart',
    data(){
        this.chartSettings = {
            metrics: ['收入'],
            dimension: ['日期']
        }
        return {
            value:'',
            list:[],
            chart: {
                columns: ['日期', '收入'],
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
            let res = await $.post('Index','incomeByDay',{begin:begin,end:end},true)
            this.list = []
            if(res.status==1) {
                if(res.data.length>0){
                    let allDate = this.getDaysBetween(begin/1000 || res.data[0].endtime,end/1000) // 获得范围内所有日期
                    // 填充0收入，0订单的日期，为图表
                    for(let i in allDate){
                        let dataPush = {
                            day:allDate[i],
                            price:0,
                            orders:0
                        }
                        for(let j in res.data){
                            if(res.data[j].day==allDate[i]) {
                                dataPush={
                                    day:res.data[j].day,
                                    price:res.data[j].price,
                                    orders:res.data[j].orders
                                }
                                break;
                            }
                        }
                        this.list.push(dataPush)
                    }
                }
            } else this.$message.error(res.msg)
        },
        getDaysBetween(start,end){
            let date=[]
            let startTime = $.stamp2date(start)
            let endTime = $.stamp2date(end)
            while((endTime.getTime()-startTime.getTime())>0){
                let year = startTime.getFullYear()
                let month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():(startTime.getMonth()+1).toString()
                let day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate()
                date.push(year+"-"+month+"-"+day)
                startTime.setDate(startTime.getDate()+1)
            }
            return date
        }
    },
    watch:{
        value(v){
            this.loadData(Date.parse(v[0]),Date.parse(v[1]))
        },
        list(v){
            this.chart.rows = []
            for(let i in v){
                this.chart.rows.push({
                    '日期':v[i].day,
                    '收入':v[i].price
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
</style>
