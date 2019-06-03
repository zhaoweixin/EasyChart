<template>
  <el-collapse  v-model="activeNames">
    <el-collapse-item
      v-for="(value, key) in configData"
      :key="key"
      :title="key"
      :name="key">
      <div
        v-for="(val, k) in value"
        :key="k">
        <span v-if="key !='data'" >{{k}}</span>
        <el-input v-model="value.title" size="mini" v-if="value.hasOwnProperty('title')&&key!='data'"></el-input>
        <!--el-input v-model="value.color" size="mini" v-if="value.hasOwnProperty('color')&&key!='data'"></el-input-->
      </div>

      <v-table
        is-horizontal-resize
        column-width-drag
        :table-data="value"
        :columns="columns"
        :cell-edit-done="cellEditDone"
        v-if="key ==='data'"
        style="width:100%"
        >
      </v-table>
    </el-collapse-item>
    <button>确认</button>
  </el-collapse>
</template>

<script>
import {mapGetters } from "vuex";
export default {
  name: "settingside",
  data() {
    return {
      configData: {
        metaConfig: {
          title: '漏斗',
        },
        style:{
          color:['#0050B3', '#1890FF', '#40A9FF', '#69C0FF']
        },
        data:[
          {"name": "建档居民","value": "2235030"},
          {"name": "体检居民","value": "1167903"},
          {"name": "签约居民","value": "22103"},
          {"name": "个性化签约居民","value": "10638"},
        ]
      },

      activeNames: ["metaConfig", "style", "data"],//折叠面板

      columns:[
        {field: 'name', title:'name', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'value', title: 'value', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true}
      ]

    };
  },
  computed: {
    ...mapGetters(['dashboardId','rSideData'])
  },
  watch: {
    configData:{
      handler(newVal){
        console.log(newVal)
        this.$store.commit("commitPropsData",newVal)
      },
      deep:true
    }
  },
  methods: {
    commitChange: function() {
      console.log("提交数据");
      // this.$store.commit("reChartData", { id: this.id, dataset: this.chart });
      // console.log(this.$store.state.chartComponentArray[0].dataset);
      // this.$store.commit("commitChange", "bubble");
      console.log(this.configData);
    },
    cellEditDone(newValue,oldValue,rowIndex,rowData,field){
      this.configData.data[rowIndex][field] = newValue;
    }
}
};
</script>
<style>
.item {
  float: right;
}
.itemName {
  float: left;
}
.el-input {
  width: 100%;
}
</style>
