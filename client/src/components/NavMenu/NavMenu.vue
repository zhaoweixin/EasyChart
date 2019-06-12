<template>
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal" 
    @select="handleSelect"
    background-color="rgb(60,60,60)"
    text-color="grey"
    active-text-color="#fff">
    <el-menu-item >Process center</el-menu-item>
    <el-menu-item >Data center</el-menu-item>
    
    <div calss="left-button" style="width:300px;position: absolute;top:14%;left:11%">
      <el-tooltip effect="dark" content="undo" placement="bottom">
        <el-button type="info" icon="el-icon-d-arrow-left" size="small"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="redo" placement="bottom">
        <el-button type="info" icon="el-icon-d-arrow-right" size="small"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="delete" placement="bottom">
        <el-button type="info" icon="el-icon-delete" size="small"></el-button>
      </el-tooltip>
      
    </div>
    <div  calss="right-button"  style="width:600px;position: absolute;top:14%;right:0%">
      <el-tooltip effect="dark" content="edit data mapper" placement="bottom">
      <el-button type="info" size="small" icon="el-icon-edit"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="edit interaction" placement="bottom">
      <el-button type="info" size="small" icon="el-icon-pie-chart"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Save As Template" placement="bottom">
        <el-button type="info" @click="open" icon="el-icon-folder-checked" size="small"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="preview" placement="bottom">
        <el-button type="info" icon="el-icon-view" size="small"></el-button>
      </el-tooltip>
    </div>
    <!-- <el-menu-item index="4" style="padding-left:83%">
        <img src="../../assets/biscuits.svg" style="width:35px" alt="" />
    </el-menu-item> -->
    
    
    </el-menu>
</template>
<script>
export default {
    name: "navmenue",
    data() {
      return {
        activeIndex2: '1'
      };
    },
    watch:{

    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      open() {
      // console.log("hhhahahahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        this.$prompt('请输入模板名称','Save' ,{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '模板名称不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '模板名是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
    }
}
</script>
<style>

.left-button {
  margin: 1%;
  opacity: 0.7;
  position: absolute;
  /* left:25%; */
  float: left;
  width: 300px;
}
.right-button {
  float:right;
}
</style>