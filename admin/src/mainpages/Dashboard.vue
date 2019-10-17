<template>
    <div class="dashboard">

        <!--时间选择器-->
        <div class="picker">
            <el-date-picker v-model="value" type="daterange" align="right" unlink-panels :range-separator="$t('to')" :start-placeholder="$t('startDate')" :end-placeholder="$t('endDate')" :picker-options="pickerOptions"></el-date-picker>
        </div>

        <!--数据呈现-->
        <div class="data-show">
            <DataIncome :date="value"></DataIncome>
        </div>

        <div class="data-show">
            <DataIncomeChart :date="value"></DataIncomeChart>
        </div>

        <div class="data-show i-table fixed">
            <div class="i-cell" style="padding-right:0.5rem;">
                <DataDeskChart :date="value"></DataDeskChart>
            </div>
            <div class="i-cell" style="padding-left:0.5rem;">
                <DataPayChart :date="value"></DataPayChart>
            </div>
        </div>
    </div>
</template>
<script>
import $ from '../tool.js'
import DataIncome from '../components/DataIncome.vue'
import DataIncomeChart from '../components/DataIncomeChart.vue'
import DataDeskChart from '../components/DataDeskChart.vue'
import DataPayChart from '../components/DataPayChart.vue'
export default {
    name: 'Dashboard',
    components:{
        DataIncome,DataIncomeChart,DataDeskChart,DataPayChart
    },
    data: function(){
        return{
            value:[new Date(), new Date()],
            pickerOptions: {
                shortcuts: [{
                    text: this.$t('today'),
                    onClick(picker) {
                        const start = new Date(new Date().toLocaleDateString());
                        const end = new Date(new Date().toLocaleDateString());
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: this.$t('pastWeek'),
                    onClick(picker) {
                        const start = new Date(new Date().toLocaleDateString());
                        const end = new Date(new Date().toLocaleDateString());
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: this.$t('pastMonth'),
                    onClick(picker) {
                        const start = new Date(new Date().toLocaleDateString());
                        const end = new Date(new Date().toLocaleDateString());
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: this.$t('all'),
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
    mounted: function(){
    },
    watch:{
        value(v){
            console.log(v)
        }
    }
}
</script>
<style>
.dashboard .el-card {
    background-color: #e5e5e5;
}
</style>
<style scoped>
.dashboard .card {
    font-size:0.4rem;
    font-weight:bold;
}
.data-show {
    margin-top:0.5rem;
}
.picker{
    text-align:right;
}
</style>
