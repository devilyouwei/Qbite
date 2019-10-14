<template class="h-100">
    <div class="main">
        <div class="head">
            <div class="i-table">
                <div class="i-cell logo"><i class="iconfont icon-letter-q"></i>uick Bite</div>
                <div class="i-cell">
                    <a href="#" @click="setLocale('en')"><flag iso="us"></flag></a>
                    <a href="#" @click="setLocale('zh')"><flag iso="cn"></flag></a>
                </div>
                <div class="i-cell sign-in"><router-link to="/login">{{$t('signIn')}}</router-link></div>
            </div>
        </div>
        <div class="banner">
            <div class="content">
                <h1>McDonald's® (Croydon Park)</h1>
                <p>$ • American • Burger • Fast Food</p>
                <p>184-188 Georges River Road, CROYDON PARK, NSW 2133</p>
            </div>
        </div>
        <div class="container">
            <div class="menu">
                <ul>
                    <li><a href="#popular">Most Popular</a></li>
                    <li><a href="#beverages">Beverages</a></li>
                    <li><a href="#lunch">Lunch</a></li>
                    <li><a href="#dinner">Dinner</a></li>
                </ul>
            </div>
            <div class="content">
                <h1>Most Popular</h1>
                <div class="container">
                    <div class="card-columns">
                        <div class="card mb-3" style="max-width: 540px;">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="../assets/home-banner.jpg" class="card-img">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h4 class="card-title">Quarter Pounder</h4>
                                        <h4 class="card-text ml-auto">4112 kJ</h4>
                                        <div class="addItem">
                                            <div class="qty mt-5">
                                                <span class="minus bg-dark">-</span>
                                                <input type="number" class="count" name="qty" value="1">
                                                <span class="plus bg-dark">+</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <div class="footer d-flex flex-column justify-content-center align-items-center">
            <span> &copy;Copyright NullTech 2019</span>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    $(document).ready(function(){
        $('.count').prop('disabled', true);
        $(document).on('click','.plus',function(){
            $('.count').val(parseInt($('.count').val()) + 1 );
        });
        $(document).on('click','.minus',function(){
            $('.count').val(parseInt($('.count').val()) - 1 );
            if ($('.count').val() == 0) {
                $('.count').val(1);
            }
        });
    });
    export default {
        name: 'Home',
        
    }
</script>

<style>
.banner {
    height: 7rem;
    background-image: url("../assets/home-banner.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #464646;
    display: flex;
    align-items: center; 
}
.banner .content{
    padding: 0.5rem;
    background-color: white;
    margin: 0.5rem 0;
    width: 60%;
}
.banner .content h1{
    font-size: 0.6rem;
}
.banner .content p{
    font-size: 0.3rem;
    margin-bottom: 5px;
}
/********** MENU ***********/
.menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.menu li {
    float: left;
}

.menu li a {
    font-size: 0.3rem;
    display: block;
    color: rgb(82, 82, 82);
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

.menu li a:hover {
    color: rgb(0, 0, 0);
}
/*****************Container*************/
    .container .content h1{
        font-size: 0.5rem;
    }
/*****************Cards*************/
.card .card-body .card-title{
     font-size: 0.3rem;
 }
.card .card-body .card-text{
    font-size: 0.2rem;
}
/*****************Counter*************/
.qty .count {
    color: #000;
    display: inline-block;
    vertical-align: top;
    font-size: 25px;
    font-weight: 700;
    line-height: 30px;
    padding: 0 2px
;min-width: 35px;
    text-align: center;
}
.qty .plus {
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    color: white;
    width: 30px;
    height: 30px;
    font: 30px/1 Arial,sans-serif;
    text-align: center;
    border-radius: 50%;
}
.qty .minus {
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    color: white;
    width: 30px;
    height: 30px;
    font: 30px/1 Arial,sans-serif;
    text-align: center;
    border-radius: 50%;
    background-clip: padding-box;
}
div {
    text-align: center;
}
.minus:hover{
    background-color: #717fe0 !important;
}
.plus:hover{
    background-color: #717fe0 !important;
}
/*Prevent text selection*/
span{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
input{
    border: 0;
    width: 2%;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input:disabled{
    background-color:white;
}

</style>
