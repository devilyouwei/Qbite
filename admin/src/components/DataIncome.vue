<!--收入查詢，按日期-->
<template>
    <div>
        <div class="table">
            <div class="cell title">
                收入
            </div>
            <div class="cell tool">
                <div class="picker">
                    <el-date-picker v-model="value" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                </div>
            </div>
        </div>
        <el-table :data="tableData">
            <el-table-column prop="price" :label="'收入(單位'+sign+')'"></el-table-column>
            <el-table-column prop="orders" label="訂單數目"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    name:'DataIncome',
    data(){
        return {
            value:'',
            sign:$.PRICE_SIGN,
            tableData:[],
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
            let res = await $.post('Index','income',{begin:begin,end:end})
            if(res.status==1) {
                this.tableData = res.data
            } else this.$message.error(res.msg)
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
