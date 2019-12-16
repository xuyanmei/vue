<template>
  <div class="page">
    <head-container></head-container>
    <search :showAmount="true" :amount="amount"></search>
    <div class="relative-position">
      <nav-container></nav-container>
    </div>
    <section class="q-pb-xl column items-center">
      <main>
        <header class="q-py-md column f12">
          <div class="row c6 items-center">
            <img class="top-pic" src="@/assets/detail/home.png" alt />
            <img class="top-pic" src="@/assets/right.png" alt />
            <span>搜索：{{keyword}}</span>
          </div>
          <div class="conditions column f12 c6 relative-position">
            <div class="row brand-attr av- no-wrap">
              <span class="text-bold title">品牌:</span>
              <div class="brand-value full-width column items-center">
                <div class="self-start brand-search" v-show="multiChoice || muchBrand">
                  <el-input
                    placeholder="搜索 品牌名称"
                    v-model="brandName"
                    prefix-icon="el-icon-search"
                    @input.native="searchBrand"
                  ></el-input>
                </div>
                <span class="self-start" v-if="brandList.length===0">抱歉，没有找到相关品牌</span>
                <ul
                  class="row wrap"
                  :class="{'av-expand':multiChoice || muchBrand,'av-collapse':!multiChoice &&!muchBrand}"
                  v-show="brandList.length!==0"
                >
                  <li
                    class="relative-position pointer"
                    :class="{'av-select':brand.selected}"
                    v-for="(brand,index) in brandList"
                    :key="index"
                    :title="brand.name"
                    @click="multiChoice && selectBrand(brand.id,index)"
                  >
                    <a>{{brand.name}}</a>
                    <div
                      class="absolute ui-btn-cancle"
                      v-show="brand.selected"
                      @click.stop="handleDelete(brand.id,index)"
                    >
                      <i class="material-icons cf">clear</i>
                    </div>
                  </li>
                </ul>
                <div class="av-btns row" v-show="multiChoice">
                  <div
                    class="pointer"
                    :class="{'ui-btn-disable':selectedBrand.length===0 || brandList.length===0,'ui-btn-primary':selectedBrand.length!==0 || brandList.length!==0}"
                    @click="multiChoice=false"
                  >确定</div>
                  <div class="pointer" @click="cancelSelect">取消</div>
                </div>
              </div>
              <div class="options absolute row">
                <span
                  class="row selects items-center justify-center q-mr-xs pointer"
                  @click="multiChoice=true;muchBrand=false"
                  v-show="!multiChoice"
                >
                  多选
                  <i class="material-icons">add</i>
                </span>
                <span
                  class="row selects items-center justify-center pointer"
                  v-show="!muchBrand&&!multiChoice"
                  @click="muchBrand=true;multiChoice=false"
                >
                  更多
                  <i class="material-icons">keyboard_arrow_down</i>
                </span>
                <span
                  class="row selects items-center justify-center pointer"
                  v-show="muchBrand &&!multiChoice"
                  @click="muchBrand=false"
                >
                  收起
                  <i class="material-icons">keyboard_arrow_up</i>
                </span>
              </div>
            </div>
          </div>
        </header>
        <div class="filter row items-center f12">
          <div class="f-sort">
            <span>
              综合
              <i class="material-icons">arrow_downward</i>
            </span>
            <span>
              人气
              <i class="material-icons">arrow_downward</i>
            </span>
            <span>
              新品
              <i class="material-icons">arrow_downward</i>
            </span>
            <span>
              销量
              <i class="material-icons">arrow_downward</i>
            </span>
            <span class="relative-position">
              <span class="q-mr-sm">价格</span>
              <i class="material-icons absolute f-price-up f20">arrow_drop_up</i>
              <i class="material-icons absolute f-price-down f20">arrow_drop_down</i>
            </span>
          </div>
          <div class="fp-box row f12">
            <input type="text" v-model="startPrice" class="fp-item" placeholder="￥请输入" />
            <span class="fp-split">-</span>
            <input type="text" v-model="endPrice" class="fp-item" placeholder="￥请输入" />
          </div>
          <div class="fmenu row relative-position items-center" :class="{'fmenu-expand':moreMenu}">
            <div class="fm-con absolute row">
              <span v-for="(menu,index) in menuList" :key="index" class="row no-wrap items-center">
                <input type="checkbox" />
                {{menu.title}}
              </span>
              <div class="row moreMenu absolute items-center justify-center pointer">
                <span v-show="!moreMenu" @click="moreMenu=true">
                  更多
                  <i class="material-icons">keyboard_arrow_down</i>
                </span>
                <span v-show="moreMenu" @click="moreMenu=false">
                  收起
                  <i class="material-icons">keyboard_arrow_up</i>
                </span>
              </div>
            </div>
          </div>
          <div class="pages row items-center">
            <span class="c9">{{current}}/{{total}}</span>
            <i
              class="material-icons page-left q-mx-xs f18"
              :class="{'page-limit':current===1,'page-active':current!==1}"
            >chevron_left</i>
            <i
              class="material-icons page-right f18"
              :class="{'page-limit':current===total,'page-active':current!==total}"
            >chevron_right</i>
          </div>
        </div>
      </main>
    </section>
    <side @countAmount="countAmount"></side>
  </div>
</template>

<script>
import foo from "@/components/foot";
import headContainer from "@/components/header";
import navContainer from "@/components/nav";
import side from "@/components/aside";
import search from "@/components/search";
import item from "@/components/item";
export default {
  components: { foo, headContainer, navContainer, side, search, item },
  data() {
    return {
      amount: 0,
      keyword: "贝德玛",
      brandList: [
        { id: 1, name: "哥弟" },
        { id: 2, name: "恒源祥" },
        { id: 3, name: "ONLY" },
        { id: 4, name: "PEACEBIRD/太平鸟" },
        { id: 5, name: "ZARA" },
        { id: 6, name: "UR" },
        { id: 7, name: "音儿" },
        { id: 8, name: "Vero Moda" },
        { id: 9, name: "Five Plus" },
        { id: 10, name: "H&M" },
        { id: 11, name: "PEACEBIRD/太平鸟" },
        { id: 12, name: "ZARA" },
        { id: 13, name: "UR" },
        { id: 14, name: "音儿" },
        { id: 15, name: "Vero Moda" },
        { id: 16, name: "Five Plus" },
        { id: 17, name: "H&M" },
        { id: 1, name: "哥弟" },
        { id: 2, name: "恒源祥" },
        { id: 3, name: "ONLY" },
        { id: 4, name: "PEACEBIRD/太平鸟" },
        { id: 5, name: "ZARA" },
        { id: 6, name: "UR" },
        { id: 7, name: "音儿" },
        { id: 8, name: "Vero Moda" },
        { id: 9, name: "Five Plus" },
        { id: 10, name: "H&M" },
        { id: 11, name: "PEACEBIRD/太平鸟" },
        { id: 12, name: "ZARA" },
        { id: 13, name: "UR13" },
        { id: 14, name: "音儿" },
        { id: 15, name: "Vero Moda" },
        { id: 16, name: "Five Plus" },
        { id: 17, name: "H&M" }
      ],
      muchBrand: false,
      multiChoice: false,
      selectedBrand: [],
      brandName: "",
      startPrice: "",
      endPrice: "",
      menuList: [
        { id: 1, title: "新到商品" },
        { id: 2, title: "包邮" },
        { id: 3, title: "折扣" },
        { id: 4, title: "搭配减价" },
        { id: 5, title: "满就减" },
        { id: 6, title: "货到付款" },
        { id: 7, title: "通用排序" }
      ],
      moreMenu: false,
      current: 1,
      total: 81
    };
  },
  methods: {
    search(e) {},
    countAmount(e) {
      this.amount = e;
    },
    selectBrand(id, index) {
      this.selectedBrand.push(id);
      this.brandList[index].selected = true;
      console.log(this.brandList[index])
    },
    handleDelete(id, index) {
      console.log(this.brandList[index].selected)
      this.brandList[index].selected = false;
      this.selectedBrand.splice(index, 1);
    },
    cancelSelect() {
      this.multiChoice = false;
      this.selectedBrand = [];
      this.brandList.map(i => {
        i.selected = false;
      });
    },
    searchBrand() {}
  }
};
</script>

<style scoped>
section {
  flex: auto;
  height: 100%;
}
main {
  width: 88vw;
  background: f2f2f2;
}
header .top-pic {
  height: 21px;
}
.conditions {
  background: #fff;
  margin: 20px auto;
  border: 1px solid #cdcdcd;
  overflow: hidden;
  width: 100%;
}
.options {
  top: 4px;
  right: 0px;
  width: 130px;
}
.selects.span {
  display: inline-block;
}
.selects {
  width: 62px;
  height: 26px;
  background: #f2f0ef;
}
.selects:hover {
  border: 1px solid #cdcdcd;
}
.brand-attr ul {
  margin-right: 130px;
  flex: auto;
  color: #806f66;
}
.av-collapse {
  max-height: 60px;
  overflow: hidden;
}
.brand-attr li a {
  padding: 1px 20px 1px 4px;
  line-height: 20px;
  height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0px 8px 8px 0px;
}
.brand-value ul li:hover {
  color: #ff0036 !important;
}
.brand-attr li {
  margin: 0px 8px 8px 0px;
}
.brand-attr .av-expand li {
  width: 150px;
  text-align: left;
}
.title {
  width: 98px;
  text-align: left;
  padding-left: 20px;
  flex: none;
}
.av-expand {
  height: 145px !important;
  margin-bottom: 5px;
  overflow-x: hidden;
  overflow-y: scroll !important;
  margin-right: 30px !important;
}
.av-btns {
  margin-bottom: 5px;
}
.av-btns div {
  margin: 1px 5px;
  padding: 0px 10px;
  border: 1px solid #ccc;
  height: 20px;
  text-align: center;
  line-height: 20px;
}
.av-btns div:first-child {
  margin: 0 5px;
}
.ui-btn-disable {
  border: 1px solid #ccc;
  background: #f2f2f2;
  color: #c5c5c5;
  cursor: default;
}
.ui-btn-primary {
  background-color: #ff0036;
  border-color: #ff0036 !important;
  color: white;
}
.ui-btn-cancle {
  right: 3px;
  top: 4px;
  width: 13px;
  height: 13px;
  background: #806f66;
  text-align: center;
  line-height: 13px;
}
.av-select {
  border: 1px solid #b0a59f;
}
.av-select:hover,
.av-select a:hover {
  border-color: #ff0036;
  color: #ff0036 !important;
}
.av-select:hover .ui-btn-cancle {
  background-color: #ff0036;
}

.brand-search {
  width: 131px;
  height: 20px;
  margin-bottom: 20px;
  margin-top: 5px;
}
.filter {
  height: 40px;
  background: #faf9f9;
  color: #806f66;
  padding: 5px;
}
.f-sort > span {
  color: #806f66;
  border: 1px solid #ccc;
  background-color: #fff;
  border-right: 0;
  width: 46px;
  padding: 0px 2px;
  height: 24px;
  display: inline-block;
  line-height: 24px;
  cursor: pointer;
}
.f-sort > span i {
  font-weight: bold;
}
.f-sort > span:last-of-type {
  border-right: 1px solid #ccc;
}
.f-sort > span:hover {
  color: #ff0036;
}
.f-price-up {
  top: -1px;
  right: -4px;
}
.f-price-down {
  top: 5px;
  right: -4px;
}
.fp-box {
  margin-left: 10px;
  height: 24px;
}
.fp-box input {
  outline: none;
}
.fp-item {
  width: 50px;
}
.fp-split {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  width: 8px;
}
.fmenu {
  width: 255px;
  margin-left: 10px;
  height: 24px;
}
.fm-con {
  width: 100%;
  height: 24px;
  overflow: hidden;
  border: 1px solid #ccc;
  text-indent: 5px;
  top: 0px;
  padding-right: 50px;
  padding-left: 5px;
}
.fm-con > span {
  margin-right: 2px;
  cursor: default;
  line-height: 22px;
}
.fmenu-expand .fm-con {
  height: auto;
}
.moreMenu:hover {
  color: #ff0036;
}
.moreMenu {
  top: 0px;
  right: 0px;
}
.moreMenu i {
  margin-left: -5px;
  margin-top: -2px;
}
.fm-con > span:first-of-type {
  font-weight: bold;
}
.pages {
  margin-left: auto;
}
.page-left,
.page-right {
  color: #806f66;
  display: inline-block;
  width: 20px;
  height: 21px;
  border: 1px solid #ccc;
}
.page-limit {
  background: #efefef;
}
.page-active.page-left:hover,
.page-active.page-right:hover {
  color: #ff0036 !important;
}
</style>
<style>
.brand-search .el-input__inner {
  width: 100%;
  height: 20px;
  border-radius: 0%;
  font-size: 12px;
  border-color: #ccc;
}
.brand-search .el-input__icon {
  line-height: 20px;
}
</style>
