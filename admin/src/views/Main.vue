<template class="h-100">
    <div class="main">
        <div class="head">
            <div class="table">
                <div class="cell logo" @click="toIndex"><i class="iconfont icon-letter-q"></i>uick Bite</div>
                <div class="cell">
                    <a href="#" @click="setLocale('en')"><flag iso="us"></flag></a>
                    <a href="#" @click="setLocale('zh')"><flag iso="cn"></flag></a>
                </div>
                <div class="cell sign-in"><router-link to="/login">{{$t('signIn')}}</router-link></div>
            </div>
        </div>

        <div class="banner table">
            <div class="banner-align">
                <div class="title-align">
                    <h1 class="banner-title">{{$t('bannerTitle')}}</h1>
                </div>
                <div class="search-align">
                    <div class="banner-search-box">
                        <el-input v-model="search" :placeholder="$t('bannerSearchBox')"></el-input>
                    </div>
                    <div>
                        <el-button class="search-btn">{{$t('bannerSearchButton')}}</el-button>
                    </div>
                </div>
            </div>
        </div>


        <div class="top-rated-content container-fluid d-flex flex-column border-bottom ">
            <div class="list-title">{{$t('topRatedFood')}}</div>
            <div class="top-rated-container  overflow-auto d-flex flex-row justify-content-around flex-wrap">
                <div class="top-rated-content-list d-flex" v-for="(item,index) in list" :key="index">
                    <div class="">
                        <div class=""><img :src="item.thumb"></div>
                        <div class="">
                            {{item.title}}
                        </div>
                    </div>
                </div>
                <!--                <ul class="avg-3">-->
                <!--                    <li v-for="(item,index) in list" :key="index">-->
                <!--                        <div class="box">-->
                <!--                            <div class="thumb"><img :src="item.thumb"></div>-->
                <!--                            <div class="title">-->
                <!--                                {{item.title}}-->
                <!--                            </div>-->
                <!--                        </div>-->
                <!--                    </li>-->
                <!--                </ul>-->
            </div>
        </div>

        <div class="top-rated-content container-fluid d-flex flex-column">
            <div class="list-title">{{$t('partnerRestaurants')}}</div>
            <div class="partners-restaurant-container d-flex flex-row justify-content-around flex-wrap">
                <div class="partner-restaurant-content-list d-flex justify-content-center align-items-center shadow p-1 mb-5 bg-white rounded" v-for="(item,index) in list2" :key="index">
                    <div class="">
                        <div class=""><img :src="item.img"></div>
                        <!--                        <div class="">-->
                        <!--                            {{item.title}}-->
                        <!--                        </div>-->
                    </div>
                </div>
            </div>
        </div>

        <!--        <div class="shops list">-->
        <!--            <div class="list-title">OUR PARTNER RESTAURANTS</div>-->
        <!--            <div class="list-content">-->
        <!--                <ul class="avg-4">-->
        <!--                    <li v-for="(item,index) in list2" :key="index">-->
        <!--                        <div class="box">-->
        <!--                            <div class="img"><img :src="item.img"></div>-->
        <!--                            <div class="title">-->
        <!--                                {{item.title}}-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                    </li>-->
        <!--                </ul>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="footer d-flex flex-column justify-content-center align-items-center">
            <span> &copy;Copyright NullTech 2019</span>
        </div>
    </div>
</template>

<script>
import $ from '../tool.js'

export default {
    name: 'Main',
    data() {
        return {
            search: '',
            list: [],
            list2: []
        }
    },
    methods: {
        toIndex() {
            location.replace('/')
        },
        async loadData() {
            let res = await $.post('Main', 'foodList')
            let res2 = await $.post('Main', 'shopList')
            if (res.status == 1) {
                this.list = res.data
                this.list2 = res2.data
            }
        },
        setLocale(locale){
            localStorage.setItem('LANG',locale)
            this.$root.$i18n.locale = locale
        }
    },
    mounted() {
        this.loadData();
    }
}
</script>

<style scoped>
.head {
    padding: 0.4rem 0.5rem;
}

.head .logo {
    color: #409eff;
    font-size: 0.38rem;
    font-weight: bold;
    cursor: pointer;
}

.head .logo .icon-letter-q {
    font-size: 0.9rem;

}

.logo {
    padding-left: 2.5rem;
}

.sign-in {
    text-align: left;
    font-size: 0.32rem;
}

.table {
    margin-bottom: auto;
}

.banner {
    text-align: center;
    margin: 0 auto;
    background-image: url("../assets/banner.jpeg");
    background-blend-mode: lighten;
    background-size: 100%;
    height: 8rem;
}

.banner .banner-title {
    font-size: 0.5rem;
}

.banner .banner-search-box {
    width: 9rem;
}

.banner-search-box {
    margin-right: 0.5rem;
}

.banner-align {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
    height: 100%;
}

.title-align {
    display: flex;
    margin-bottom: 0.3rem;
}

.search-align {
    display: flex;
    flex-direction: row;
}

.search-btn {
    background: #0093fc;
    border: unset !important;
    border-radius: unset !important;
    color: white;
}

.search-btn:hover {
    background: #409eff;
    color: white;
}

/*.list {*/
/*    padding: 0.7rem 0;*/
/*}*/

/*.list .list-title {*/

/*    !*padding: 0.5rem 0;*!*/
/*}*/
.container-fluid {
    width: 90%;
    max-height: 13rem;
}

.top-rated-content {
    max-height: 17rem;
    padding-bottom: 1rem;
}

.list-title {
    font-size: 0.47rem;
    padding: 0.7rem 0;
}

.top-rated-container {
    /*padding: 0.5rem;*/
}

.top-rated-content-list {
    width: 8rem !important;
    height: 8rem !important;
    margin: 0 0.5rem;
}

img {
    max-height: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
}

.partners-restaurant-container {

}

.partner-restaurant-content-list {
    width: 4rem !important;
    height: 4rem !important;
    margin: 0 0.5rem;
    border-radius: 50%;
    overflow: hidden;

}

.footer {
    background-color: #f7fbfd;
    width: 100%;
    padding: 40px 150px;
    box-sizing: border-box;
}

/*.list .list-content .img {*/
/*    text-align: center;*/
/*}*/

/*.list .list-content .img img {*/
/*    width: 3rem;*/
/*    height: 3rem;*/
/*    object-fit: cover;*/
/*    margin: 0 auto;*/
/*}*/

/*.list .list-content .thumb {*/
/*    text-align: center;*/
/*}*/

/*.list .list-content .thumb img {*/
/*    width: 5rem;*/
/*    height: 3rem;*/
/*    object-fit: cover;*/
/*    margin: 0 auto;*/
/*}*/

/*.list .list-content .title {*/
/*    text-align: center;*/
/*    font-size: 0.25rem;*/
/*    line-height: 0.4rem;*/
/*    padding: 0.1rem 0;*/
/*}*/

/*.list .list-content .box {*/
/*    padding-bottom: 0.5rem;*/
/*}*/
</style>
