<template>
  <div class="page">
    <head-container></head-container>
    <side @countAmount="countAmount"></side>
    <search :showAmount="true" :amount="amount"></search>
    <section class="q-pb-xl">
      <div class="relative-position">
        <nav-container active></nav-container>
        <div class="banner-main row justify-end">
          <img src="@/assets/home/header.jpg" alt />
        </div>
      </div>
      <div class="find-great row justify-center items-center">
        <div class="find-l"></div>
        <span>发现·好货</span>
        <div class="find-r"></div>
      </div>
      <div class="update column justify-center items-center">
        <div class="main-content row justify-between items-center q-mb-md">
          <div class="row justify-between items-center">
            <div class="sunshine-bg row items-center justify-center">
              <img src="@/assets/home/sunshine.png" alt />
            </div>
            <span class="f19 big-title c6">今日上新</span>
            <span class="small-title">早八点更新</span>
          </div>
          <div class="renew row justify-between items-center bcr f16 cf q-pa-xs">
            <span class="q-mr-xs">换一批</span>
            <i class="material-icons f18">autorenew</i>
          </div>
        </div>
        <ul class="row justify-between wrap q-pa-none main-width li-parent">
          <li v-for="(item,index) in renewList" :key="index" class="shadow-1">
            <item :item="item"></item>
          </li>
        </ul>
      </div>
      <div class="pick column justify-center items-center">
        <div class="main-content column">
          <div class="row items-center">
            <div class="done-bg row items-center justify-center">
              <i class="material-icons q-mx-sm f28 cf">done</i>
            </div>
            <span class="f19 big-title c6">神马值得买</span>
            <span class="small-title">帮你挑选全球好货</span>
          </div>
          <div class="row items-center q-pl-lg q-mt-lg">
            <div>
              <img src="@/assets/home/ico-title-1.png" alt />
            </div>
            <div class="f19 big-title c6">全球好货</div>
          </div>
        </div>
        <ul class="row justify-between q-pa-none bcf main-width li-parent">
          <li>
            <img src="@/assets/home/011.jpg" alt />
          </li>
          <li>
            <img src="@/assets/home/012.jpg" alt />
          </li>
          <li>
            <img src="@/assets/home/013.jpg" alt />
          </li>
          <li>
            <img src="@/assets/home/014.jpg" alt />
          </li>
          <li>
            <img src="@/assets/home/015.jpg" alt />
          </li>
        </ul>
      </div>
      <div class="favorite column justify-center items-center">
        <div class="main-content row items-center q-pl-lg q-mt-lg">
          <img src="@/assets/home/ico-title-1.png" alt />
          <div class="f19 big-title c6">大家都说好</div>
        </div>
        <div class="type-list row f16 c7 f18 q-mt-lg q-mb-sm main-width">
          <div
            class="row justify-center items-center bcf q-mr-sm q-py-xs q-px-md"
            :class="{'cf':type.id===selectTypeId,'bcr':type.id===selectTypeId}"
            v-for="type in typeList"
            :key="type.id"
            @click="selectTypeId=type.id"
          >{{type.name}}</div>
        </div>
        <ul
          class="row justify-between bcf items-center q-pa-none q-ma-none wrap main-width item-three li-parent"
        >
          <li v-for="(item,index) in favoriteList" :key="index" class="column">
            <item :item="item" :comment="true">
            </item>
          </li>
        </ul>
      </div>
      <div class="buy column justify-center items-center">
        <div class="main-content row items-center q-pl-lg q-mt-lg">
          <img src="@/assets/home/ico-title-1.png" alt />
          <div class="f19 big-title c6">买了又买</div>
        </div>
        <div class="buy-content bcf row justify-between main-width">
          <div
            class="left column items-center"
            v-for="(position,index) in positionList"
            :key="index"
          >
            <div class="top-title row justify-center cred items-center f16">{{position.typeName}}</div>
            <div
              class="self-start"
              v-for="(item,index) in position.list"
              :key="item.id"
              @mouseenter="changePositionEnter(position.typeIndex,item.id)"
              @mouseleave="changePositionLeave(position.typeIndex)"
            >
              <div class="row self-start">
                <div class="f18 cf bcr position" :class="{'u-top-bg':index+1>3}">TOP{{index+1}}</div>
                <div
                  class="row items-center"
                  v-show="!isFirst(position.typeIndex,index) && !isShowPositionInfor(position.typeIndex,item.id)"
                >
                  <img class="show" src="@/assets/home/14581982567130.jpg" />
                  <span>{{item.describe.substring(0,18)}}...</span>
                </div>
              </div>
              <div
                class="row justify-between"
                v-show="isFirst(position.typeIndex,index)  || isShowPositionInfor(position.typeIndex,item.id)"
              >
                <div>
                  <img class="pic" src="@/assets/home/14581982567130.jpg" alt />
                </div>
                <div class="column buy-info-r justify-start">
                  <span>{{item.describe}}</span>
                  <div class="q-px-sm self-start">
                    <span class="cred text-bold f12">￥</span>
                    <span class="cred text-bold f24">{{item.price}}</span>
                    <span class="c7 f15 text-bold q-ml-sm old-price">￥{{item.oldPrice}}</span>
                  </div>
                  <div class="column self-start q-mt-md">
                    <span class="f14 c7 self-start">共{{item.buyCount}}人购买</span>
                    <span class="f14 c7 self-start">回头率{{item.backBuy}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column justify-center items-center">
        <div class="main-content row items-center q-pl-lg q-mt-lg q-mb-md">
          <img src="@/assets/home/ico-title-1.png" alt />
          <div class="f19 big-title c6">新品黑马</div>
        </div>
        <ul
          class="row justify-between bcf items-center q-pa-none q-ma-none wrap main-width item-three li-parent"
        >
          <li v-for="(item,index) in favoriteList" :key="index" class="column">
            <item :item="item" :comment="true">
            </item>
          </li>
        </ul>
      </div>
    </section>
    <foo></foo>
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
      amount:0,
      // 每日更新
      renewList: [
        {
          id: 0,
          name: "熟制干栗子仁",
          describe: "熟制干栗子仁",
          price: "45.00",
          oldPrice: 85,
          discount: "7折",
          collected: 88
        },
        {
          id: 1,
          name: "熟制干栗子仁",
          describe: "熟制干栗子仁",
          price: 45,
          oldPrice: 85,
          discount: "7折/满减",

          collected: 88
        },
        {
          id: 2,
          name: "熟制干栗子仁",
          describe: "熟制干栗子仁",
          price: 45,
          oldPrice: 85,
          discount: "7折",

          collected: 88
        },
        {
          id: 3,
          name: "熟制干栗子仁",
          describe: "熟制干栗子仁",
          price: 45,
          oldPrice: 85,
          discount: "7折",

          collected: 88
        },
        {
          id: 4,
          name: "熟制干栗子仁",
          describe: "熟制干栗子仁",
          price: 45,
          oldPrice: 85,
          discount: "7折",

          collected: 88
        }
      ],
      // 大家都说好
      typeList: [
        { id: 1, name: "极致美护" },
        { id: 2, name: "全球零食" },
        { id: 3, name: "创意生活" },
        { id: 4, name: "时尚配饰" },
        { id: 5, name: "尖货女装" },
        { id: 6, name: "3c家电" }
      ],
      favoriteList: [
        {
          id: 0,
          name: "熟制干栗子仁",
          describe: "熟制干栗子仁",
          price: "45.00",
          oldPrice: 85,
          discount: "7折",
          collected: 88
        },
        {
          id: 1,
          name: "熟制干栗子仁",
          describe: "熟制干栗子仁",
          price: 45,
          oldPrice: 85,
          discount: "7折/满减",

          collected: 88
        },
        {
          id: 2,
          name: "熟制干栗子仁",
          describe: "熟制干栗子仁",
          price: 45,
          oldPrice: 85,
          discount: "7折",

          collected: 88
        },
        {
          id: 3,
          name: "熟制干栗子仁",
          describe: "熟制干栗子仁",
          price: 45,
          oldPrice: 85,
          discount: "7折",

          collected: 88
        }
      ],
      // 大家都说好选择类别
      selectTypeId: 1,
      //排行榜
      positionShow: { left: 0, center: 0, right: 0 },
      positionList: [
        {
          typeId: 1,
          typeName: "极致美护",
          list: [
            {
              id: 1,
              describe: "[黑头全部去光光] DMC 欣兰冻膜面膜(225g)",
              price: 121,
              oldPrice: 131,
              buyCount: 1234,
              backBuy: "2%"
            },
            {
              id: 2,
              describe: "[黑头全部去光光] DMC 欣兰冻膜面膜(225g)",
              price: 121,
              oldPrice: 131,
              buyCount: 1234,
              backBuy: "2%"
            }
          ]
        },
        {
          typeId: 2,
          typeName: "全球零食",
          list: [
            {
              id: 1,
              describe: "[黑头全部去光光] DMC 欣兰冻膜面膜(225g)",
              price: 121,
              oldPrice: 131,
              buyCount: 1234,
              backBuy: "2%"
            },
            {
              id: 2,
              describe: "[黑头全部去光光] DMC 欣兰冻膜面膜(225g)",
              price: 121,
              oldPrice: 131,
              buyCount: 1234,
              backBuy: "2%"
            },
            {
              id: 3,
              describe: "[黑头全部去光光] DMC 欣兰冻膜面膜(225g)",
              price: 121,
              oldPrice: 131,
              buyCount: 1234,
              backBuy: "2%"
            },
            {
              id: 4,
              describe: "[黑头全部去光光] DMC 欣兰冻膜面膜(225g)",
              price: 121,
              oldPrice: 131,
              buyCount: 1234,
              backBuy: "2%"
            },
            {
              id: 5,
              describe: "[黑头全部去光光] DMC 欣兰冻膜面膜(225g)",
              price: 121,
              oldPrice: 131,
              buyCount: 1234,
              backBuy: "2%"
            }
          ]
        },
        {
          typeId: 3,
          typeName: "创意生活",
          list: [
            {
              id: 1,
              describe: "[黑头全部去光光] DMC 欣兰冻膜面膜(225g)",
              price: 121,
              oldPrice: 131,
              buyCount: 1234,
              backBuy: "2%"
            },
            {
              id: 2,
              describe: "[黑头全部去光光] DMC 欣兰冻膜面膜(225g)",
              price: 121,
              oldPrice: 131,
              buyCount: 1234,
              backBuy: "2%"
            }
          ]
        }
      ]
    };
  },
  methods: {
    search(e) {},
    countAmount(e){
      this.amount= e
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
    },
    getPositionList() {
      this.positionList.map((item, index) => {
        return (item.typeIndex = index);
      });
    },
    changePositionEnter(index, id) {
      index === 0
        ? (this.positionShow.left = id)
        : index === 1
        ? (this.positionShow.center = id)
        : (this.positionShow.right = id);
    },
    changePositionLeave(index) {
      index === 0
        ? (this.positionShow.left = 0)
        : index === 1
        ? (this.positionShow.center = 0)
        : (this.positionShow.right = 0);
    },
    isShowPositionInfor(typeIndex, id) {
      let tag;
      if (typeIndex === 0) {
        tag = this.positionShow.left === id;
      } else if (typeIndex === 1) {
        tag = this.positionShow.center === id;
      } else {
        tag = this.positionShow.right === id;
      }
      return tag;
    },
    isFirst(typeIndex, index) {
      if (index === 0) {
        let tag;
        if (typeIndex === 0) {
          tag = this.positionShow.left === 0;
        } else if (typeIndex === 1) {
          tag = this.positionShow.center === 0;
        } else {
          tag = this.positionShow.right === 0;
        }
        return tag;
      } else {
        return false;
      }
    }
  },
  created() {
    this.getPositionList();
  }
};
</script>

<style scoped>
.page {
  background: #f9f9f9;
}

/* banner */
.banner-main {
  height: 481px;
  background: #b5d2e0;
}
.banner-main img {
  margin-right: 47px;
}
/* 发现好货 */
.find-great {
  margin-top: 75px;
  font-size: 35px;
  font-weight: bold;
  color: #66667c;
}
.find-l,
.find-r {
  width: 134px;
  height: 1px;
  border-top: 1px solid #66667c;
}
.main-content {
  width: 86vw;
}
.main-width {
  width: 88vw;
}
.update ul::after,
.pick ul::after {
  content: "";
  width: 286px;
}
.sunshine-bg {
  background: #ffc000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.big-title {
  margin-left: 10px;
}
.small-title {
  margin-left: 30px;
}
.renew {
  height: 30px;
}
.old-price {
  text-decoration: line-through;
}
.done-bg {
  background: #815999;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.describe {
  text-align: left;
}
.pick ul {
  padding: 48px 40px;
  box-sizing: border-box;
  overflow: hidden;
}
.li-parent li{
  margin-bottom: 20px;
}
.li-parent li:hover {
  box-shadow: 0px 0px 10px 2px #e5e5e5;
}
.item-three {
  padding: 0px 60px;
}
.type-list div {
  border: 1px solid #e5e5e5;
  cursor: pointer;
}
.top-title {
  width: 338px;
  border-bottom: 1px solid #ccc;
  padding: 15px 0px;
}
.buy-content > div {
  width: 400px;
}
/* 排行榜 */
.position {
  width: 70px;
  height: 24px;
}
.pic {
  width: 160px;
  height: 160px;
}
.buy-info-r {
  width: 240px;
}
.buy-info-r > span {
  text-align: left;
}
.show {
  height: 50px;
  width: 50px;
}
.u-top-bg {
  background: #c6c6c6 !important;
}
</style>

