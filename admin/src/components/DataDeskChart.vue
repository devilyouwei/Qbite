<!--訂單，收入，按桌號對比-->
<template>
    <div>
        <div class="table">
            <div class="cell title">
                收入分佈
            </div>
            <div class="cell tool">
                <div class="picker">
                    <el-date-picker v-model="value" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
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
            chart:{
                columns: ['桌號', '訂單數'],
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
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
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
            let res = await $.post('Index','incomeByDesk',{begin:begin,end:end})
            if(res.status==1) {
                this.list = res.data
            } else this.$message.error(res.msg)
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
</style>
