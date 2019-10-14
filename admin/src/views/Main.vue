<template class="d-flex flex-column h-100">
    <div class="main d-flex flex-column h-100">
        <header class="head container-fluid">
            <!-- Image and text -->
            <nav class="navbar navbar-light ">
                <a class="navbar-brand" href="#">
                    <div class="logo pl-1" @click="toIndex"><i class="iconfont icon-letter-q"></i><b>uick Bite</b></div>
                </a>
                <form class="form-inline">
                    <b-dropdown size="sm" id="lang-dropdown" text="EN" class="">
                        <b-dropdown-item-button class="">
                            <a href="#" @click="setLocale('en')">
                                <flag iso="us"></flag>
                            </a>
                            <span class="lang-text">EN</span>
                        </b-dropdown-item-button>
                        <b-dropdown-item-button>
                            <a href="#" @click="setLocale('zh')">
                                <flag iso="cn">CN</flag>
                            </a>
                            <span class="lang-text">CN</span>
                        </b-dropdown-item-button>
                    </b-dropdown>

                    <button class="btn mr-1" type="button">
                        <router-link to="/login">{{$t('signIn')}}</router-link>
                    </button>

                </form>
            </nav>
            <div class="d-flex flex-column justify-content-center align-items-center pt-3">
                <div class="d-flex flex-column align-items-center">
                    <span class="banner-title"><b>{{$t('bannerTitle')}}</b></span>
                </div>
                <div class="d-flex flex-row mx-auto pt-1">
                    <div class="d-flex flex-row search-bar">
                        <el-input v-model="search" :placeholder="$t('bannerSearchBox')"></el-input>
                    </div>
                    <div class="search-btn-div">
                        <el-button class="search-btn">{{$t('bannerSearchButton')}}</el-button>
                    </div>
                </div>
            </div>
        </header>
        <section class="d-flex popular-food flex-column mt-1">
            <!-- Top Rated Food-->
            <div class="d-flex flex-column pl-2">
                <span class="top-rated-food">{{$t('topRatedFood')}}</span>
            </div>
            <div class="d-flex flex-column justify-content-center my-auto">
                <div class="row d-flex py-auto">
                    <div class="col-sm food-item d-flex flex-column py-auto" v-for="(item,index) in list" :key="index"
                         v-if=" index <3">
                        <div class="food-img"><img :src="item.thumb"></div>
                        <div class="food-title d-flex flex-column pt-1">
                            <span class="food-text"><b>Joe's Bagel & Grill - West Long Branch</b></span>
                            <div class="food-short-description d-flex flex-row">
                                <span class="food-price">$ &nbsp</span>
                                <span>Breakfast and Brunch, Sandwiches, American</span>
                            </div>
                            <div class="food-location">
                                <span>205 Nj-36, West Long Branch, Nj 07764, Usa </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row d-flex my-auto">
                    <div class="col-sm food-item d-flex flex-column py-auto" v-for="(item,index) in list" :key="index"
                         v-if=" index >=3 && index <6">
                        <div class="food-img"><img :src="item.thumb"></div>
                        <div class="food-title d-flex flex-column pt-1">
                            <span class="food-text"><b>Nick's Pizza and Grill Restaurant</b></span>
                            <div class="food-short-description d-flex flex-row">
                                <span class="food-price">$$ &nbsp</span>
                                <span>Pizza</span>
                            </div>
                            <div class="food-location">
                                <span>589 Cedar Ave, West Long Branch, NJ 07764 </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--            Partner Restaurant -->
            <div class="d-flex flex-column partner-restaurant">
                <div class="d-flex flex-column pl-2">
                    <span class="top-rated-food"> {{$t('partnerRestaurants')}}</span>
                </div>
                <div class="d-flex flex-row flex-wrap pt-2">
                    <div class="restaurant-brand-container" v-for="(item,index) in list2" :key="index" v-if="index <7">
                        <div class="restaurant-brand"><img :src="item.img"></div>
                    </div>
                </div>
            </div>
            <footer class="footer d-flex flex-column mt-auto py-3">
                <div class="container">
                    <div class="d-flex flex-column w-50">
                        <div class="row pt-1">
                            <div class="col-sm">
                                About Us
                            </div>
                            <div class="col-sm">
                                FAQ
                            </div>
                        </div>
                        <div class="row pt-1">
                            <div class="col-sm">
                                Privacy Policy
                            </div>
                            <div class="col-sm">
                                Help Center
                            </div>
                        </div>
                        <div class="row pt-1">
                            <div class="col-sm">
                                Terms Of Use
                            </div>
                            <div class="col-sm">
                                Become a Partner
                            </div>
                        </div>
                        <div class="row pt-1">
                            <div class="col-sm">
                                Contact Us
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column pt-2 justify-content-center align-items-center">
                        <span> © Copyright NullBugs 2019</span>
                    </div>
                </div>
            </footer>

        </section>


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
                list2: [],
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
            setLocale(locale) {
                this.$root.$i18n.locale = locale
            }
        },
        mounted() {
            this.loadData();
        },
    }
</script>


<style>
    header.head {
        height: 8rem;
        background-image: url("../assets/banner.jpg");
        background-size: cover;
        text-align: center;
        margin: 0 auto;
        background-blend-mode: lighten;

    }

    nav.navbar {
        padding: unset;
    }

    div.logo {
        color: #409eff;
        font-size: 0.5rem;
    }

    .icon-letter-q {
        font-size: 0.8rem;

    }

    button.btn {
        font-size: 0.4rem;
        padding: 0.3rem;

    }

    .btn:focus {
        box-shadow: unset;
        outline: 0;
    }

    #lang-dropdown > button {
        padding: 0.3rem;
        color: unset;
        background-color: transparent !important;
        border-color: unset;
        border: unset;
        font-size: 0.4rem;
    }

    .dropdown-menu {
        font-size: 0.4rem !important;
        min-width: unset !important;
        padding: 0.05rem 0.15rem !important;
    }

    .dropdown-item {
        padding-left: unset !important;
        padding-right: unset !important;
    }

    span.lang-text {
        padding-left: 0.15rem;
    }

    span.banner-title {
        font-size: .7rem;
    }

    .search-bar {
        width: 9.5rem;
        padding-right: .05rem;
    }

    .search-btn-div .search-btn {
        background: #409eff;
        color: black;

    }

    section.popular-food {
        height: 8rem;
    }

    span.top-rated-food {
        font-size: .5rem;
    }

    div.food-item-container {
        height: 100% !important;
    }

    div.food-item {
        height: 7rem;
        width: 7rem;
        margin: .3rem;
    }

    .food-img {
        height: 80%;
    }

    img {
        /* not scew */
        /*height: 100%;*/
        /*width: auto;*/
        height: 100%;
        width: 100%;
        object-fit: cover;
        margin: auto;
        display: flex;
    }

    span.food-text {
        font-size: medium;
    }

    div.food-short-description {
        font-size: small;
        padding-top: 0.12rem;
    }

    .food-location {
        padding-top: 0.05rem;
        font-size: small;
    }

    div.partner-restaurant {
        height: auto;
    }

    .restaurant-brand-container {
        height: 4.5rem;
        width: 4.5rem;
        margin: auto;
    }

    .restaurant-brand {
        height: 100%;
        width: 100%;
        object-fit: cover;
        padding: .3rem;
    }

    .footer {
        background-color: black;
        color: white;
        height: auto;
    }
</style>
