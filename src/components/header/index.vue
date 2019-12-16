<template>
  <div>
    <header class="row justify-between items-center c6 q-pa-sm shadow-1">
      <span class="q-ml-lg pointer" @click="$router.push('/consumerNotice')">消费者告知书</span>
      <div class="row items-center relative-position right">
        <div class="absolute relative-position q-px-sm tip row items-center bc cf f12" v-show="visible">注册即得新人优惠券<p class="q-ma-none q-ml-xs pointer" @click="visible=false">X</p></div>
        <div class="absolute tragle" v-show="visible"></div>
        <span class="pointer">登录</span>
        <div class="line q-mx-sm"></div>
        <span class="pointer">注册</span>
        <div class="line q-mx-sm"></div>
        <i class="material-icons q-mr-sm f18 c6">phone</i>
        <span>400-080-1888</span>
        <div class="line q-mx-sm"></div>
        <span class="pointer">退出</span>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: true
      }
    },
  }
</script>

<style scoped>
header{
  background: #f2f2f2;
}
.right{
  margin-right: 112px;
}
.right span:hover{
  color:red; 
}
.line {
  height: 14px;
  width: 1px;
  background: #666666;
}
span.phone {
  width: 13px;
  height: 16px;
  background: url("../.././assets/home/ico1.png") no-repeat -26px -150px;
  margin-right: 4px;
}
.tip {
  top: 28px;
  left:-8px;
  border-radius: 3px;
  height: 30px;
}
.tragle {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 12px solid #815999;
  top:20px;
  left: 54px;
}
</style>