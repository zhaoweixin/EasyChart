<template>
  <el-collapse  v-model="activeNames">
    <el-collapse-item
      v-for="(value, key) in baseData"
      :key="key"
      :title="key"
      :name="key">
      <div v-for="(val, k) in value" :key="k">
        <div v-if="key =='metaConfig'" >
          <span>{{k}}</span>
          <el-input v-model="value.title" size="mini" v-if="value.hasOwnProperty('title')"></el-input>
        </div>

        <div v-if="key =='style'" >
          <span >{{k}}</span>
          <div>
            <div v-if="k==='backgroundColor'">
              <el-input class="colorInput" v-model="value.backgroundColor" size="mini"></el-input>
              <el-color-picker v-model="value.backgroundColor" size="mini"></el-color-picker>
            </div>
            <div v-if="k==='fontColor'">
              <el-input class="colorInput" v-model="value.fontColor" size="mini" ></el-input>
              <el-color-picker v-model="value.fontColor" size="mini"></el-color-picker>
            </div>
          </div>
          <div v-for="(v, i, index) in val" :key="index">
            <el-input class="colorInput" v-model="val[i]" size="mini" v-if="value.hasOwnProperty('color')"></el-input>
            <el-color-picker v-model="val[i]" size="mini" v-if="value.hasOwnProperty('color')"></el-color-picker>
          </div>
        </div>

        <div v-if="key =='datamappers'" :id="getDatamappersId(k)">
          <div v-for="(v, i, index) in val" :key="index" >
            <span v-if="i=='dataname'||i=='datatype'">{{i}}:{{v}}</span>
            <div v-if="i=='mapfrom'">
              <span >{{i}}</span>
              <el-input v-model="val.mapfrom" size="mini" ></el-input>
            </div>
            <div v-if="i=='alias'">
              <span >{{i}}</span>
              <el-input v-model="val.alias" size="mini" ></el-input>
            </div>
          </div>
          <el-divider v-if="k==0"></el-divider>
        </div>

      </div>
      <div v-if="key =='data' && value.length !== 0">
      <v-table
        column-width-drag
        :table-data="value"
        :columns="columns"
        :cell-edit-done="cellEditDone"
        style="width:100%"
        >
      </v-table>
      </div>
      <div v-if="key == 'button'">
        <el-button v-on:click="sendIsActive">{{value}}</el-button>
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
      baseData: {
        metaConfig: {
          title: '',
        },
        style:{
          color:[]
        },
        data:[],
        datamappers:[{
          dataname: "value",
          datatype: "num",
          mapfrom: null,
          alias: null
        },
        {
          dataname: "name",
          datatype: "string",
          mapfrom: null,
          alias: null
        }]
      },

      activeNames: ["metaConfig", "style", "data", "button", "datamappers"],//折叠面板

      columns:[
        {field: 'name', title:'name', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'value', title: 'value', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true}
      ]

    };
  },


  computed: {
    ...mapGetters({'storeBaseData': 'getPropsData'}),
    ...mapGetters({'isClick': 'getIsActive'}),
    // ...mapGetters({'storeBaseData': 'getBarData'}),
    // ...mapGetters({'storeBaseData':'getBarData'}),

  },
  watch: {
    baseData:{
      handler(newVal){
          this.$store.commit("commitPropsData",newVal)
      },
      deep:true
    },
    storeBaseData:{
      handler(newVal){
        this.baseData=newVal
      },
      deep:true
    },
    // storeBarData:{
    //   handler(newVal){
    //
    //     console.log("bar"+newVal)
    //     this.baseData=newVal
    //   },
    //   deep:true
    // }

  },
  methods: {
    cellEditDone(newValue,oldValue,rowIndex,rowData,field){
      this.baseData.data[rowIndex][field] = newValue;
    },
    sendIsActive(){
      this.$store.commit("commitIsActive", !this.isClick);
    },
    getDatamappersId(a){
      if(a%2)  return "y";
      else return "x";
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
  /* float: right; */
}
.colorInput {
  width: 110px;
  float: left;
}
</style>
