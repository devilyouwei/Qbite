<template>
    <div class="index">
        <LeftMenu @select="change" class="left-menu"></LeftMenu>
        <div class="content">
            <menuIndex v-if="menu==1"></menuIndex>
            <menuType v-if="menu==21"></menuType>
            <menuMenu v-if="menu==22"></menuMenu>
            <menuOrder v-if="menu==3"></menuOrder>
            <menuSet v-if="menu==4"></menuSet>
            <menuAdmin v-if="menu==1101"></menuAdmin>
            <menuPayWay v-if="menu==1102"></menuPayWay>
        </div>
    </div>
</template>
<script>
import LeftMenu from '../components/LeftMenu.vue'
import menuIndex from '../mainpages/Index.vue'
import menuMenu from '../mainpages/Menu.vue'
import menuType from '../mainpages/Type.vue'
import menuSet from '../mainpages/Set.vue'
import menuOrder from '../mainpages/Order.vue'
import menuAdmin from '../mainpages/Admin.vue'
import menuPayWay from '../mainpages/PayWay.vue'
export default {
    name: 'Index',
    components: {
        LeftMenu, menuIndex, menuMenu, menuType, menuSet, menuOrder, menuAdmin, menuPayWay
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
    width:20%;
    height:100%;
}
.content{
    width:75%;
    position:absolute;
    right:0;
    top:0;
    bottom:0;
    overflow-y:scroll;
    padding:2.5%;
}
</style>
