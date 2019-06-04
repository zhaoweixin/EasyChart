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
        <el-input v-model="value.title" size="mini" v-if="value.hasOwnProperty('title')"></el-input>
        <div>
        <el-input class="colorInput" v-model="value.backgroundColor" size="mini" v-if="k==='backgroundColor'"></el-input>
        <el-color-picker v-model="value.backgroundColor" size="mini" v-if="k==='backgroundColor'"></el-color-picker>
        </div>
        <div>
        <el-input class="colorInput" v-model="value.fontColor" size="mini" v-if="k==='fontColor'"></el-input>
        <el-color-picker v-model="value.fontColor" size="mini" v-if="k==='fontColor'"></el-color-picker>
        </div>
        <div v-for="(v, i, index) in val"
          :key="index">
          <el-input class="colorInput" v-model="val[i]" size="mini" v-if="value.hasOwnProperty('color')"></el-input>
          <el-color-picker v-model="val[i]" size="mini" v-if="value.hasOwnProperty('color')"></el-color-picker>
        </div>
      </div>
      <div v-if="key =='data' && value.length !== 0">
      <v-table
        is-horizontal-resize
        column-width-drag
        :table-data="value"
        :columns="columns"
        :cell-edit-done="cellEditDone"
        
        style="width:100%"
        >
      </v-table>
      </div>
    </el-collapse-item>
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
          title: '',
        },
        style:{
          color:[]
        },
        data:[]
      },

      activeNames: ["metaConfig", "style", "data"],//折叠面板

      columns:[
        {field: 'name', title:'name', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'value', title: 'value', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true}
      ]

    };
  },


  computed: {
    ...mapGetters({'storeBaseData': 'getPropsData'}),
    // ...mapGetters({'storeBaseData': 'getBarData'}),
    // ...mapGetters({'storeBaseData':'getBarData'}),

  },
  watch: {
    configData:{
      handler(newVal){
          this.$store.commit("commitPropsData",newVal)
      },
      deep:true
    },
    storeBaseData:{
      handler(newVal){
        console.log("base"+newVal)
        this.configData=newVal
      },
      deep:true
    },
    // storeBarData:{
    //   handler(newVal){
    //
    //     console.log("bar"+newVal)
    //     this.configData=newVal
    //   },
    //   deep:true
    // }

  },
  methods: {
    // commitChange: function() {
    //   console.log("提交数据");
    //   // this.$store.commit("reChartData", { id: this.id, dataset: this.chart });
    //   // console.log(this.$store.state.chartComponentArray[0].dataset);
    //   // this.$store.commit("commitChange", "bubble");
    //   console.log(this.configData);
    // },
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
.colorInput {
  width: 110px;
  float: left;
}
</style>
