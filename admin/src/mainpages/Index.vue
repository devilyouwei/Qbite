<template>
    <div class="index">
        <el-row :gutter='40'>
            <el-col :span='8'>
                <el-card shadow="hover" class="card text-center">
                    店鋪<br>
                    {{user.shop}}
                </el-card>
            </el-col>

            <el-col :span='8'>
                <el-card shadow="hover" class="card text-center">
                    用戶<br>
                    {{user.username}}
                </el-card>
            </el-col>

            <el-col :span='8'>
                <el-card shadow="hover" class="card text-center">
                    職位<br>
                    {{user.position}}
                </el-card>
            </el-col>
        </el-row>

        <!--数据呈现-->
        <div class="data-show">
            <DataIncome></DataIncome>
        </div>
        <div class="data-show">
            <DataIncomeChart></DataIncomeChart>
        </div>
        <div class="data-show table fixed">
            <div class="cell">
                <DataDeskChart style="padding-right:0.5rem;">></DataDeskChart>
            </div>
            <div class="cell" style="padding-left:0.5rem;">
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
    name: 'Index',
    components:{
        DataIncome,DataIncomeChart,DataDeskChart,DataPayChart
    },
    data: function(){
        return{
            user:$.getUserInfo()
        }
    },
    mounted: function(){
    }
}
</script>
<style>
.index .el-card {
    background-color: #e5e5e5;
}
</style>
<style scoped>
.index{
    padding:1rem;
}
.index .card {
    font-size:0.4rem;
    font-weight:bold;
}
.data-show {
    margin-top:1rem;
}
</style>
