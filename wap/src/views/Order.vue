<template>
    <div class="order">
        <div class="desk" v-if="order">
            桌號 {{order.title}}
        </div>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    name:'order',
    data(){
        return{
            oid:0,
            order:null
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let sid = localStorage.getItem('sid')
            let did = localStorage.getItem('did')
            let oid = localStorage.getItem('oid')
            let order = localStorage.getItem('order')
            let res = await $.post('Wap','sit',{sid:sid,did:did,order:order,oid:oid})
            if(res.status == 1){
                this.order = res.data
                localStorage.setItem('oid',res.data.id)
            }else { // 訂單有問題
                localStorage.removeItem('oid')
                this.$router.replace('/')
            }
        }
    }
}
</script>
<style scoped>
.desk{
    text-align:center;
    font-size:1rem;
    padding-top:2rem;
}
</style>
