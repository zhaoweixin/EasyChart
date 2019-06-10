<template>
  <div id="app">
    <el-container>
      <el-header height="30">
        <NavMenu></NavMenu>
      </el-header>
      <el-container>
          <el-aside width="200px">
            <el-divider><i class="el-icon-upload"></i></el-divider>
            <div>
              <Upload></Upload>
            </div>
            <el-divider><i class="el-icon-toilet-paper"></i></el-divider>
              <div>drag chart store</div>
              <chartStore></chartStore>
          </el-aside>
          <el-main>
            <dashboard>
                          <dragResize/>
            </dashboard>
            <blueEditor></blueEditor>
          </el-main>
          <el-aside width="200px">
            <SettingSide></SettingSide>
          </el-aside>

      </el-container>
    </el-container>
  </div>
</template>

<script>

  import DataProxy from  './carDataHelper'
import NavMenu from "./components/NavMenu/NavMenu"
import Upload from "./components/ChartSide/upload"
import chartStore from "./components/ChartSide/chartStore"
import SettingSide from "./components/SettingSide/SettingSide"
import dashboard from "./components/dashboard/dashboard.vue"
import dragResize from "./components/dragResize/dragResize"
import blueEditor from "./components/blueEditor/blueEditor"
export default {
  name: 'App',
  components: {
    NavMenu,
    Upload,
    chartStore,
    SettingSide,
    dashboard,
    dragResize,
    blueEditor
  },
  mounted:async function(){
    await DataProxy.initChartsData()
  }
}
</script>

<style>

.el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }

  .el-aside {
    color: #333;
    text-align: center;
    height: 1020px;
  }

  .el-main {
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

body{
  margin: 0px
}
</style>
