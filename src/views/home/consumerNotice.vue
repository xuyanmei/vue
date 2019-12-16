<template>
  <div class="page">
    <head-container></head-container>
    <search :showAmount="true" :amount="amount"></search>
    <section>
      <div class="relative-position">
        <nav-container></nav-container>
      </div>
      <article>
        <p>尊敬的客户：</p>
        <br />
        <p>您好!</p>
        <br />
        <p>
          在您选购境外商品前，麻烦您仔细阅读此文，同意本文所告知内容后再进行下单购买:
          <br />1.您在本（公司）网站上购买的境外商品为产地直销商品，仅限个人自用不得进行再销售，商品本身可能无中文标签，您可以查看网站的翻译或者在线联系我们的客服。
          <br />2.您购买的境外商品适用的品质、健康、标识等项目使用标准符合原产国使用标准，但是可能与我国标准有所不同，所以在使用过程中由此可能产生的危害或损失以及其他风险，将由您个人承担。
          <br />3.您在本（公司）网站上购买保税区发货的境外商品时，自动视为由达令极速免税店代您向海关进行申报和代缴税款。
          <br />4.遇到问题吗？
          <!-- <a
            target="_blank"
            href="http://wpa.qq.com/msgrd?v=3&uin=1393926219&site=qq&menu=yes"
          >在线客服
          </a>-->
          <a href="tencent://message/?uin=3165178525&Site=qq&Menu=yes">在线客服</a>
        </p>
      </article>
    </section>
    <foo></foo>
  </div>
</template>

<script>
import foo from "@/components/foot";
import headContainer from "@/components/header";
import navContainer from "@/components/nav";
import search from "@/components/search";
export default {
  components: { headContainer, navContainer, search, foo },
  data() {
    return {
      amount: 0
    };
  }
};
</script>

<style scoped>
article {
  width: 70vw;
  display: table;
  margin: 0 auto;
  text-align: left;
  margin-top: 100px;
  margin-bottom: 100px;
}
p {
  margin: 0;
}
article p:nth-of-type(2) {
  text-indent: 2em;
}
</style>