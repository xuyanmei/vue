<template>
  <div class="page">
    <div class="cube-wrap">
      <div class="cube">
        <!--下面图片 -->
        <div class="out_bottom">
          <img src="http://img.blog.csdn.net/20170716094504432" class="pic" />
        </div>
      </div>
    </div>
  <div
    v-for="(item, i) in list"
    :key="i">
    {{ item }}
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3]
    }
  },
};
</script>

<style scoped>
/*最外层容器样式*/
.cube-wrap {
  width: 200px;
  height: 200px;
  margin: 200px;
  position: relative;
  background: pink;
}

/*包裹所有容器样式*/
.cube {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(-80deg);
  animation: rotate linear 20s infinite;
}
@keyframes rotate {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
/*定义所有图片样式*/
.pic {
  width: 200px;
  height: 200px;
}
.cube div {
  position: absolute;
  opacity: 0.8;
  width: 200px;
  height: 200px;
}
.cube .out_bottom {
  transform: rotateX(-90deg) translateZ(100px);
}
</style>