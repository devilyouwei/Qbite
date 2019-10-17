<template>
    <div class="index">
        <LeftMenu @select="change" class="left-menu"></LeftMenu>
        <div class="content">
            <menuDash v-if="menu==1"></menuDash>
            <menuType v-if="menu==21"></menuType>
            <menuMenu v-if="menu==22"></menuMenu>
            <menuOrder v-if="menu==3"></menuOrder>
            <menuSet v-if="menu==4"></menuSet>
            <!-- 110 爲超級管理員-->
            <adminShops v-if="menu==1101"></adminShops>
            <adminPayWay v-if="menu==1102"></adminPayWay>
        </div>
    </div>
</template>
<script>
import LeftMenu from '../components/LeftMenu.vue' // 左部菜单栏
import menuDash from '../mainpages/Dashboard.vue' // dashboard
import menuMenu from '../mainpages/Menu.vue' // 菜单
import menuType from '../mainpages/Type.vue' // 菜单分类
import menuSet from '../mainpages/Set.vue' // 配置
import menuOrder from '../mainpages/Order.vue' // 订单页面
import adminShops from '../admin/Shops.vue' // 超级管理员devil
import adminPayWay from '../admin/PayWay.vue' // 支付方式
export default {
    name: 'Index',
    components: {
        LeftMenu, menuDash, menuMenu, menuType, menuSet, menuOrder, adminShops, adminPayWay
    },
    data: function(){
        return{
            menu:1
        }
    },
    mounted: function(){
    },
    methods:{
        change(i){
            this.menu = i
        }
    }
}
</script>
<style scoped>
.left-menu{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    width:18%;
    height:100%;
    text-align:left;
}
.content{
    width:78%;
    position:absolute;
    right:0;
    top:0;
    bottom:0;
    overflow-y:scroll;
    padding:2%;
}
</style>
