<template>
    <div class="index">
        <el-row :gutter='12'>
            <el-col :span='6'>
                <el-card shadow="hover" class="card">
                    店鋪：{{user.shop}}
                </el-card>
            </el-col>

            <el-col :span='6'>
                <el-card shadow="hover" class="card">
                    用戶：{{user.username}}
                </el-card>
            </el-col>

            <el-col :span='6'>
                <el-card shadow="hover" class="card">
                    職位：{{user.position}}
                </el-card>
            </el-col>

            <el-col :span='6'>
                <el-card shadow="hover" class="card">
                    收入：{{user.position}}
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import $ from '../tool.js'
export default {
    name: 'Index',
    data: function(){
        return{
            user:$.getUserInfo()
        }
    },
    mounted: function(){
    }
}
</script>
<style scoped>
.index{
    padding:0.5rem;
}
.index .card {
    font-size:0.4rem;
    font-weight:bold;
}
</style>
