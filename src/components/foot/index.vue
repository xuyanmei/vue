<template>
  <div>
    <footer class="column bcf justify-center items-center">
      <div class="inner-top row items-center justify-center">
        <ul class="q-ma-none c6 row justify-between items-center">
          <li class="row justify-center items-center">
            <span>为什么选择一购</span>
            <img src="@/assets/right.png" alt class="arrow-right" />
          </li>
          <li class="two row justify-center items-center">
            <span></span>
            <span>100多个品牌授权</span>
          </li>
          <li class="three row justify-center items-center">
            <span></span>
            <span>24小时内发货</span>
          </li>
          <li class="four row justify-center items-center">
            <span></span>
            <span>保税区正品</span>
          </li>
        </ul>
      </div>
      <div class="inner-center row items-center c6">
        <div class="col-6 row justify-center investor">
          <div class="column f14">
            <span class="f18">投资人说达令</span>“hi，达令，我是鹿晗，达令投资人，投资比影响力更重要的是责任。”
          </div>
        </div>
        <div class="col-6 investor honor row justify-center">
          <div class="column f14">
            <span class="f18">投资人说达令</span> “达令™一手全球好货--带您购全球,教您神马值得买连续两年荣获Appstore编辑推荐最佳购物类应用！”
          </div>
        </div>
      </div>
      <div class="column justify-center q-pt-md">
        <div class="row f14 justify-center c6 items-center navigator">
          <span>首页</span><div class="line"></div>
          <span>网站地图</span><div class="line"></div>
          <span>消费者告知书</span><div class="line"></div>
          <span>优惠券使用规则</span><div class="line"></div>
          <span>退换货使用说明</span><div class="line"></div>
          <span>关于我们</span><div class="line"></div>
          <span>联系我们</span>
        </div>
        <div class="row items-center justify-center q-mt-md q-mb-lg">
          北京123有限公司<img class="q-ml-sm" src="@/assets/cert.png" alt=""><img src="@/assets/cnnic.png" alt=""><img src="@/assets/ico_zfb.jpg" alt="">
        </div>
        <div class="row items-center justify-center">
          <p>Copyright © 2016达令  All Rights Reserved │ 京ICP备14009583号-1 │ 京公网安备11010502027399 || 食品流通许可证编号  SP1101051510323113</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.inner-top {
  border-top: solid 1px #d8d8d8;
  border-bottom: solid 1px #e0e0e0;
  box-shadow: 0 2px 2px #e0e0e0;
  width: 100%;
  height: 79px;
}
.inner-top ul {
  width: 86vw;
}
.inner-center {
  border-bottom: solid 1px #e0e0e0;
  height: 142px;
  width: 100%;
}
.investor div {
  text-align: left;
}
.arrow-right {
  margin-left: 60px;
  width: 25px;
  height: 44px;
}
.navigator span{
  padding:0px 5px;
}
.line{
  width: 1px;
  height: 14px;
  background: #666;
}
.honor{
  padding-right: 190px;
  padding-left:100px
}
</style>