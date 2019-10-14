<template>
    <div class="dashboard">
        <el-row :gutter='40'>
            <el-col :span='8'>
                <el-card shadow="hover" class="card text-center">
                    {{$t('store')}}<br>
                    {{user.shop}}
                </el-card>
            </el-col>

            <el-col :span='8'>
                <el-card shadow="hover" class="card text-center">
                    {{$t('username')}}<br>
                    {{user.username}}
                </el-card>
            </el-col>

            <el-col :span='8'>
                <el-card shadow="hover" class="card text-center">
                    {{$t('position')}}<br>
                    {{user.position}}
                </el-card>
            </el-col>
        </el-row>

        <!--时间选择器-->
        <div class="picker">
            <el-date-picker v-model="value" type="daterange" align="right" unlink-panels :range-separator="$t('to')" :start-placeholder="$t('startDate')" :end-placeholder="$t('endDate')" :picker-options="pickerOptions"></el-date-picker>
        </div>

        <!--数据呈现-->
        <div class="data-show">
            <DataIncome :date="value"></DataIncome>
        </div>

        <div class="data-show">
            <DataIncomeChart></DataIncomeChart>
        </div>

        <div class="data-show i-table fixed">
            <div class="i-cell">
                <DataDeskChart style="padding-right:0.5rem;">></DataDeskChart>
            </div>
            <div class="i-cell" style="padding-left:0.5rem;">
                <DataPayChart></DataPayChart>
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
            user:$.getUserInfo(),
            value:'',
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
    margin-top:1rem;
}
.picker{
    padding-top:1rem;
    text-align:right;
}
</style>
