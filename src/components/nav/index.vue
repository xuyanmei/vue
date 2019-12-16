<template>
  <div>
    <nav class="f16 cf row items-center">
      <div class="all-type bc row items-center justify-center cf text-bold f16">
        全部分类
        <span v-show="!active">
          <i class="material-icons f24 pointer" v-if="!up" @click="up=true">keyboard_arrow_up</i>
          <i class="material-icons f24 pointer" v-if="up" @click="up=false">keyboard_arrow_down</i>
        </span>
      </div>
      <div v-for="type in typeList" :key="type.id" class="title-width type-title text-bold q-mr-sm" @click="$router.push({path:`/${type.link}`})">
        <span>{{type.name}}</span>
      </div>
    </nav>
    <aside class="absolute row" @mouseleave="leaveBanner" v-show="up || active">
      <!-- 左边侧边栏 -->
      <div class="aside-left column" v-show="active || up">
        <div
          class="q-px-sm q-pb-sm side-left-content column"
          :class="{'content-r-border':contentIndex!==-1 && contentIndex!==index,'contentBorder':contentIndex===index}"
          @mouseenter="selectType(index,content.id)"
          v-for="(content,index) in allTypes"
          :key="index"
        >
          <p class="q-pa-none q-ma-none q-mt-md c6 f16">{{content.name}}</p>
          <div class="side-left-item row justify-between wrap c7 f14 q-py-sm">
            <div class="left-item" v-for="item in content.list" :key="item.id">{{item.name}}</div>
          </div>
        </div>
      </div>
      <!-- 右边侧边栏 -->
      <div
        class="aside-right asright-Border bcf c7"
        :class="{'asright-Border':contentIndex>=0}"
        v-show="up===true"
      >
        <div class="column">
          <!-- 品牌 -->
          <div class="brand-name f15">{{rightContent.name}}</div>
          <div class="row justify-beween wrap">
            <img
              v-for="brand in rightContent.brandList"
              :key="brand.brandId"
              class="brand-img"
              :src="getCoverImage(brand.imgName)"
              alt
            />
          </div>
          <!-- 分类及详情 -->
          <div class="row">
            <div class="column">
              <div v-for="(type,index) in rightContent.list" :key="index" class="row type-info">
                <div class="type-name f15">{{type.name}}</div>
                <div class="product-list f13 row justify-beween wrap">
                  <span
                    class="item-name"
                    v-for="item in type.detailList"
                    :key="item.detailId"
                  >{{item.name}}</span>
                </div>
              </div>
            </div>
            <div class="detail-img">
              <img src="@/assets/home/14660612076920.jpg" alt />
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, default: false }
  },
  data() {
    return {
      typeList: [
        { id: 1, name: "极致美护",link:"detail" },
        { id: 2, name: "全球零食" ,link:"detail" },
        { id: 3, name: "创意生活" ,link:"detail" },
        { id: 4, name: "时尚配饰" ,link:"detail" },
        { id: 5, name: "尖货女装" ,link:"detail" },
        { id: 6, name: "3c家电" ,link:"detail" }
      ],
      up: false,
      // 左侧边栏选中索引
      contentIndex: -1,

      // 全部分类
      allTypes: [
        {
          id: 1,
          name: "极致美护",
          mainImg: "",
          brandList: [
            { brandId: 0, imgName: "其他证件.jpg" },
            { brandId: 1, imgName: "其他证件.jpg" },
            { brandId: 2, imgName: "其他证件.jpg" },
            { brandId: 3, imgName: "其他证件.jpg" }
          ],
          list: [
            {
              id: 0,
              name: "饼干"
            },
            {
              id: 1,
              name: "威化"
            },
            {
              id: 2,
              name: "蜂蜜"
            },
            {
              id: 3,
              name: "麦片"
            }
          ]
        },
        {
          id: 2,
          name: "全球零食",
          list: [
            { id: 0, name: "奶制品" },
            { id: 1, name: "碳酸饮料" },
            { id: 2, name: "功能性饮料" }
          ]
        },
        {
          id: 3,
          name: "创意生活",
          list: [
            { id: 0, name: "奶制品" },
            { id: 1, name: "碳酸饮料" },
            { id: 2, name: "功能性饮料" }
          ]
        },
        {
          id: 4,
          name: "时尚配饰",
          list: [
            { id: 0, name: "奶制品" },
            { id: 1, name: "碳酸饮料" },
            { id: 2, name: "功能性饮料" }
          ]
        }
      ],
      // 右侧边栏数据
      rightContent: {
        id: 1,
        name: "极致美护",
        brandList: [
          { brandId: 0, imgName: "其他证件.jpg" },
          { brandId: 1, imgName: "其他证件.jpg" },
          { brandId: 2, imgName: "其他证件.jpg" },
          { brandId: 3, imgName: "其他证件.jpg" }
        ],
        list: [
          {
            id: 0,
            name: "饼干",
            detailList: [
              { detailId: 0, name: "曲奇" },
              { detailId: 1, name: "曲奇" },
              { detailId: 2, name: "曲奇" },
              { detailId: 3, name: "曲奇" }
            ]
          },
          {
            id: 1,
            name: "威化",
            detailList: [
              { detailId: 0, name: "曲奇" },
              { detailId: 1, name: "曲奇" },
              { detailId: 2, name: "曲奇" },
              { detailId: 3, name: "曲奇" }
            ]
          },
          {
            id: 2,
            name: "蜂蜜",
            detailList: [
              { detailId: 0, name: "曲奇" },
              { detailId: 1, name: "曲奇" },
              { detailId: 2, name: "曲奇" },
              { detailId: 3, name: "曲奇" }
            ]
          },
          {
            id: 3,
            name: "麦片",
            detailList: [
              { detailId: 0, name: "曲奇" },
              { detailId: 1, name: "曲奇" },
              { detailId: 2, name: "曲奇" },
              { detailId: 3, name: "曲奇" }
            ]
          }
        ]
      }
    };
  },
  methods: {
    leaveBanner() {
      if (this.active) {
        this.up = false;
        this.contentIndex = -1;
      }
    },
    selectType(index, id) {
      this.up = true;
      this.contentIndex = index;
    },
    getCoverImage(name) {
      if (name === "" || !name) {
        return;
      } else {
        return "http://wx.bzztc.gdbnet.cn/bzt-server/" + "file/" + name;
      }
    }
  }
};
</script>

<style  scoped>
nav {
  background: #333333;
  height: 30px;
}
.all-type {
  width: 222px;
  height: 100%;
  margin-left: 80px;
}
.type-title:hover {
  color: #999;
}
.title-width {
  width: 90px;
  cursor: pointer;
  margin-left: 50px;
}
nav > div:nth-of-type(2) {
  margin-left: 50px;
}
/* asinde */
aside {
  left: 80px;
  top: 30px;
  z-index: 13000;
  height: 481px;
}
.aside-left {
  width: 222px;
  background: #e8e3eb;
}

.content-r-border {
  border-right: 1px solid #815999;
}
.contentBorder {
  border-left: 1px solid #815999;
  border-bottom: 1px solid #815999;
  border-top: 1px solid #815999;
  background: #fff;
  border-right: none;
}
.aside-right {
  width: 677px;
  padding: 0px 35px;
}
.asright-Border {
  border-right: 1px solid #815999;
  border-bottom: 1px solid #815999;
}
.brand-img {
  width: 60px;
}
.type-info {
  margin-bottom: 25px;
  margin-top: 20px;
}
.brand-name {
  margin: 20px 0px;
}
.type-name,
.brand-name {
  width: 75px;
  margin-right: 20px;
  text-align: left;
}
.item-name {
  margin-right: 20px;
}
.product-list {
  width: 190px;
}
.detail-img {
  width: 256px;
  height: 256px;
  margin-right: 35px;
}
</style>