<template>
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal" 
    @select="handleSelect"
    background-color="rgb(60,60,60)"
    text-color="grey"
    active-text-color="#fff">
    <el-menu-item index="1">Process center</el-menu-item>
    <el-menu-item index="2">Data center</el-menu-item>
    <el-menu-item index="4" style="padding-left:83%">
        <img src="../../assets/biscuits.svg" style="width:35px" alt="" />
    </el-menu-item>
    
    
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
      }
    }
}
</script>
<style>

</style>