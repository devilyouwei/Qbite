<!--收入查詢，按日期-->
<template>
    <div class="data-income">
        <el-dialog title="收入詳細" :visible.sync="dialog" :close-on-click-modal="false" style="width:30rem;margin:0 auto;">
            <el-table :data="pay" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="table fixed">
                            <div v-for="(item,index) in props.row.pay" :key="index" v-if="item.value" class="cell text-center">
                                <div style="color:#000;font-size:0.3rem;line-height:0.4rem;font-weight:bold;">{{item.title}}</div>
                                <div style="color:#ff0000;line-height:0.4rem;">{{item.value}}</div>
                                <div style="color:#67C23A;line-height:0.4rem;">{{item.currency}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="訂單編號" prop="id"></el-table-column>
                <el-table-column label="總價" prop="price"></el-table-column>
                <el-table-column label="桌號" prop="title"></el-table-column>
                <el-table-column label="結束時間" prop="endtime"></el-table-column>
            </el-table>
        </el-dialog>
        <div class="table">
            <div class="cell title">
                總收入
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
            <el-table-column label="操作">
                <el-button @click="dialog=true" type="text" size="small">收入詳細</el-button>
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
            value:'',
            sign:$.PRICE_SIGN,
            tableData:[],
            dialog:false,
            pay:[],
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
            let res = await $.post('Index','income',{begin:begin,end:end},true)
            if(res.status==1) {
                this.tableData = res.data.all
                this.pay = res.data.pay
                for(let i in this.pay){
                    this.pay[i].endtime = $.formatDate($.stamp2date(this.pay[i].endtime),'yyyy-MM-dd hh:mm:ss')
                }
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
