<template>
  <el-collapse  v-model="activeNames">
    <el-collapse-item
      v-for="(value, key) in baseData"
      :key="key"
      :title="key"
      :name="key">
      <div
        v-for="(val, k) in value"
        :key="k">
        <span v-if="key =='metaConfig'" >{{k}}</span>
        <el-input v-model="value.title" size="mini" v-if="value.hasOwnProperty('title')"></el-input>
        <div>
          <span v-if="key =='style'" >{{k}}</span>
          <div>
            <el-input class="colorInput" v-model="value.backgroundColor" size="mini" v-if="k==='backgroundColor'"></el-input>
            <el-color-picker v-model="value.backgroundColor" size="mini" v-if="k==='backgroundColor'"></el-color-picker>
            <el-input class="colorInput" v-model="value.fontColor" size="mini" v-if="k==='fontColor'"></el-input>
            <el-color-picker v-model="value.fontColor" size="mini" v-if="k==='fontColor'"></el-color-picker>
          </div>
        </div>
        <div v-for="(v, i, index) in val"
          :key="index">
          <el-input class="colorInput" v-model="val[i]" size="mini" v-if="value.hasOwnProperty('color')"></el-input>
          <el-color-picker v-model="val[i]" size="mini" v-if="value.hasOwnProperty('color')"></el-color-picker>
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
        <button v-on:click="sendIsActive">{{value}}</button>
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
        data:[]
      },

      activeNames: ["metaConfig", "style", "data", "button"],//折叠面板

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
        console.log("base"+newVal)
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
      this.$store.commit("commitIsActive", true);
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
