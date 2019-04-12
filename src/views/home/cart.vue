<template>
  <div>
    <!--  数组为空显示
     <p v-show="!products.length"><i>Please add some products to cart.</i></p> 
    -->
    <!--  数组为空可以点击    
      <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    -->
    
    <!-- <el-table :data="tableData" style="width: 100%">
      
      <el-table-column type="selection" width="70"></el-table-column>

      <el-table-column prop="time" width="120"></el-table-column>

      <el-table-column prop="name" label="姓名" width="120"></el-table-column>

      <el-table-column label="数量">
        <el-input-number
          v-model="num1"
          @change.stop="handleChange"
          :min="1"
          :max="10"
          controls-position="right"
        ></el-input-number>
      </el-table-column>

      <el-table-column label="图片" width="120">
        <img :src="tableData[0].img" alt style="width:30px;height:30px;">
      </el-table-column>

      <el-table-column prop="price.number" label="单价" width="120"></el-table-column>
      <el-table-column prop="price.number" label="总价" width="120">{{tableData[0].price.number*num1}}</el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </el-table-column>
    </el-table> 
    -->
    <div>aaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaa</div>
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
      //shopList: [],
      num1: 1,
      totle: 0,
      tableData: []
    };
  },
  computed: {},
  methods: {
    /*  getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    }, */
    handleSelect() {},
    activeIndex2() {},
    select() {},
    handleChange(value) {
      this.totle = this.shopList.price.number * value;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted() {
    var that = this;

    this.axios({
      url: `http://localhost:3000/product`,
      method: "get"
    }).then(res => {
      //console.log(res.data);
      var sid = _.findIndex(res.data, function(o) {
        return o.id == that.$route.query.id;
      });
      that.tableData.push(res.data[sid]);

      console.log(that.tableData);
    });
  }
};
</script>