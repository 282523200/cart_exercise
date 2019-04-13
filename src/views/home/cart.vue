<template>
  <!-- title -->
  <div>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">名字</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">图片</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">价格</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">数量</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">合计</div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">删除</div>
      </el-col>
    </el-row>

    <!-- 购物车 -->
    <template v-if="boolean">
      <el-row v-for="(item,i) in this.$store.state.cartlist">
        <el-col :span="2">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            33
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>22
          </el-checkbox-group>
        </el-col>
        <el-col :span="4">{{item.name}}</el-col>
        <el-col :span="4">
          <img :src="item.img" alt style="width:50px;heigh:50px;">
        </el-col>
        <el-col :span="4">${{item.price.number}}.00</el-col>
        <el-col :span="4">
          <el-button size="mini" @click="minus">-</el-button>
          <el-input-number
            style="width:100px;"
            :controls="false"
            size="mini"
            :value="item.count"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number>
          <el-button size="mini" @click="add">+</el-button>
        </el-col>
        <el-col :span="4">${{item.price.number*item.count}}.00</el-col>
        <el-col :span="2">
          <el-button type="danger">删除</el-button>
        </el-col>
      </el-row>
    </template>

    <template v-else>
      <div>bb</div>
    </template>

    <!-- 总价 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">总价:111</div>
      </el-col>
    </el-row>
  </div>
</template>
    

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<script>
var _ = require("lodash");
export default {
  data() {
    return {
      boolean: true,
      checkedCities: 1,
      cities: 1,
      num7: 2
    };
  },
  computed: {
    getshopList() {
      return this.$store.getters.getshopList;
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    add() {
      console.log("add");
      
    },
    minus() {
      console.log("minus");
      
    }
  },
  mounted() {
    this.$store.dispatch("updatacartlist", this.$store.getters.getshopList);
    console.log(this.$store.state.cartlist);
  }
};
</script>