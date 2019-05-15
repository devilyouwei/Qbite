<!--打印收入报告-->
<template>
    <div class="print-income">
        <div class="table" v-if="tableData">
            <div class="row">
                <div class="cell bold">貨幣/支付方式</div>
                <div class="cell bold" v-for="(item,index) in payway">{{item}}</div>
            </div>
            <div class="row" v-for="(item,index) in currency">
                <div class="cell bold">{{item}}</div>
                <div class="cell" v-for="(item2,index2) in payway">{{tableData[item][item2]}}</div>
            </div>
        </div>
        <div class="date">{{begin}} <b>To</b> {{end}}</div>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    name:'PrintIncome',
    data(){
        return {
            tableData:null,
            pay:[],
            currency:[],
            orders:[],
            payway:[],
            begin:'',
            end:''
        }
    },
    mounted(){
        let begin = parseInt($.getParams()['begin'])
        let end = parseInt($.getParams()['end'])
        this.loadData(begin,end)
        this.begin = $.formatDate($.stamp2date(begin/1000),'yyyy-MM-dd')
        this.end = $.formatDate($.stamp2date(end/1000),'yyyy-MM-dd')
    },
    methods:{
        async loadData(begin=0,end=Date.parse(new Date())){
            this.tableData = null
            this.currency = []
            this.payway = []
            const beginTime = new Date(new Date().toLocaleDateString()).getTime()
            let endTime = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
            begin = isNaN(begin)?beginTime:begin
            end += 3600*24*1000 - 1 // 向後延時一天，以獲得今天數據
            end = end?end:endTime
            let res = await $.post('Index','income',{begin:begin,end:end},true)
            this.begin = $.formatDate($.stamp2date(begin/1000),'yyyy-MM-dd')
            this.end = $.formatDate($.stamp2date(end/1000),'yyyy-MM-dd')
            if(res.status==1) {
                this.orders = res.data
                // 整理支付方式和貨幣種類
                for(let i in res.data){
                    for(let j in res.data[i].pay){
                        this.currency.push(res.data[i].pay[j].currency)
                        this.payway.push(res.data[i].pay[j].title)
                    }
                }
                // 去重
                this.currency = $.removeDuplicatedItem(this.currency)
                this.payway = $.removeDuplicatedItem(this.payway)
                // 初始化表格
                let tableData = []
                for(let i in this.currency){
                    tableData[this.currency[i]] = []
                    for(let j in this.payway){
                        tableData[this.currency[i]][this.payway[j]] = 0
                    }
                }
                // 寫入數據到表格
                for(let i in tableData){
                    for(let j in tableData[i]){
                        for(let k in this.orders){
                            for(let p in this.orders[k].pay){
                                if(this.orders[k].pay[p].currency==i && this.orders[k].pay[p].title==j)
                                    tableData[i][j]+=parseFloat(this.orders[k].pay[p].value)
                            }
                        }
                    }
                }
                // 橫向合計
                for(let i in tableData){
                    let rowSum = 0
                    for(let j in tableData[i]){
                        rowSum+=tableData[i][j]
                    }
                    tableData[i]['合計'] = rowSum
                }
                this.payway.push('合計')
                this.tableData = tableData
            } else this.$message.error(res.msg)
        }
    }
}
</script>
<style scoped>
.print-income{
    padding:0.5rem;
}
.table{
    font-size:0.3rem;
    text-align:center;
    border: 2px solid #ccc;
}
.cell{
    padding:0.1rem;
}
.bold{
    font-weight:bold;
}
.date{
    padding:0.1rem 0;
    font-size:0.25rem;
    text-align:right;
}
</style>
