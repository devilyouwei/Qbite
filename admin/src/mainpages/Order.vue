<template>
    <div class="order">
        <div class="replace" v-if="replace">
            暫無數據
        </div>
        <div class="tip">
            點擊餐桌查看訂單詳細
        </div>
        <el-row :gutter="12" v-if="list.length">
            <el-col :span="8" v-for="(item,index) in list" :key="index">
                <el-card shadow="hover" class="card" :class="item.sit?'lock':''">
                    <div>{{item.title}}</div>
                    <div style="font-size:0.3rem;padding-top:0.2rem;">
                        人數：{{item.num}}
                        <span v-if="item.sit">（有人）</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    data(){
        return{
            list: [],
            replace:false
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await $.post('Admin','deskList')
            if(res.status==1){
                this.list = res.data
                this.list.length==0?this.replace=true:this.replace=false
            }else this.$message.error(res.msg);
        }
    }
}
</script>
<style scoped>
.order{
    padding:0.5rem;
}
.tip{
    text-align:center;
    color:#409EFF;
    font-size:0.3rem;
}
.card{
    width:200px;
    margin:0.5rem auto;
    text-align:center;
    font-size:25px;
    font-weight:bold;
    background:#fff;
    color:#ccc;
}
.card.lock{
    background:#409EFF;
    color:#fff;
}
</style>
