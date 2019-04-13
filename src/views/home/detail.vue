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
              <el-button type="text" class="button" @click="buy" :data-aa="value.id" ref="aa">购买</el-button>
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
        //console.log(that.$store.state.shopList);
      });
    },
    buy(event) {
      // 得到id值
      var p = event.target.parentNode.getAttribute("data-aa");
      if (localStorage.getItem("shopList")) {
        try {
          //1.把localstorage值给state
          this.$store
            .dispatch(
              "updatashopList",
              JSON.parse(localStorage.getItem("shopList"))
            )
            .then(() => {
              //2. 改state值
              var current = _.find(this.$store.state.shopList, function(o) {
                return o.id == p;
              });
              current.count += 1;
            })
            .then(() => {
              //3. 存state值
              localStorage.setItem(
                "shopList",
                JSON.stringify(this.$store.state.shopList)
              );
            })
            .then(() => {
              this.$router.push({ name: "cart", query: { id: p } });
            });
        } catch (e) {
          // 文件坏掉就删掉重新保存
          localStorage.removeItem("shopList");
          this.$store
            .dispatch("modifyshopList", p)
            .then(() => {
              localStorage.setItem(
                "shopList",
                JSON.stringify(this.$store.state.shopList)
              );
            })
            .then(() => {
              this.$router.push({ name: "cart", query: { id: p } });
            });
        }
      } else {
        // 新增
        this.$store
          .dispatch("modifyshopList", p)
          .then(() => {
            localStorage.setItem(
              "shopList",
              JSON.stringify(this.$store.state.shopList)
            );
          })
          .then(() => {
            this.$router.push({ name: "cart", query: { id: p } });
          });
      }
    }
  },

  mounted() {
    this.getList();
    this.getbannerlist();
  }
};
</script>

