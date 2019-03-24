<template>
    <div class="index">
        <LeftMenu @select="change"></LeftMenu>
        <div class="content">
            <menuIndex v-if="menu==1"></menuIndex>
            <menuType v-if="menu==21"></menuType>
            <menuMenu v-if="menu==22"></menuMenu>
            <menuOrder v-if="menu==3"></menuOrder>
            <menuSet v-if="menu==4"></menuSet>
            <menuAdmin v-if="menu==110"></menuAdmin>
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
export default {
    name: 'Index',
    components: {
        LeftMenu, menuIndex, menuMenu, menuType, menuSet, menuOrder, menuAdmin
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
.content{
}
</style>
