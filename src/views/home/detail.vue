<template>
  <div class="detail">
    <!-- 侧栏 -->
    <el-row>
      <el-col :span="4">
        <h5>默认颜色</h5>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <!-- 轮播图 -->
      <el-col :span="20">
        <div class="block">
          <span class="demonstration">面包屑</span>
          <el-carousel height="300px">
            <template v-if="this.$store.state.bannerlist.length>0">
              <el-carousel-item v-for="(item,i) in this.$store.state.bannerlist" :key="i">
                <img :src="item.img" alt>
              </el-carousel-item>
            </template>
          </el-carousel>
        </div>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <el-row>
      <el-col :span="4" v-for="(value,i) in this.$store.state.shopList" :key="i">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="value.img" class="image">
          <div style="padding: 14px;">
            <span>{{value.name}}</span>
            <div class="bottom clearfix">
              <span>{{ '¥' + value.price.number }}</span>
              <el-button type="text" class="button" @click="buy" :aa="value.id" ref="bb">购买</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
<script>
var _ = require("lodash");
export default {
  data() {
    return {
      page: 1
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    getbannerlist() {
      // 轮播图的请求
      var that = this;
      this.axios({
        url: `http://localhost:3000/bannerlist/`,
        method: "get"
      }).then(res => {
        that.$store.state.bannerlist = [...res.data];
      });
    },
    getList() {
      // 请求产品
      var that = this;
      this.axios({
        url: `http://localhost:3000/product/`,
        method: "get"
      }).then(res => {
        that.$store.state.shopList = [...res.data];
        console.log(that.$store.state.shopList);
      });
    },
    buy(event) {
      //1路由跳转
      //2带参数
      var p = event.target.parentNode.getAttribute("aa");
      //得到当前按钮的id值
      //去找到状态里的这个id,把count值+1
      //console.log(p);
      //console.log(this.$store.state.shopList);

      _.find(this.$store.state.shopList, function(o) {
        return o.id == p;
      }).count = 1;
      console.log(this.$store.state.shopList);

      this.$router.push({ name: "cart", params: { id: p } });

      //console.log(this.$router);
      //{ name: 'user', params: { userId: '123' }}
      //path: `/cart/${event.target.parentNode.getAttribute("aa")}`
    }
  },

  mounted() {
    this.getList();
    this.getbannerlist();
  }
};
</script>
