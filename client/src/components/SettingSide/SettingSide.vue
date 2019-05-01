<template>
    <div>
    <el-divider><i class="el-icon-toilet-paper"></i>Part 1</el-divider>
        <el-radio-group v-model="radio1">
            <el-radio-button label="option1"></el-radio-button>
            <el-radio-button label="option2"></el-radio-button>
            <el-radio-button label="option3"></el-radio-button>
            <el-radio-button label="option4"></el-radio-button>
        </el-radio-group>
    <el-divider><i class="el-icon-toilet-paper"></i>Part 2</el-divider>
        <div class="demo-input-suffix">
            Attributino
            <el-input
                placeholder="date"
                suffix-icon="el-icon-date"
                v-model="input1">
            </el-input>
            <el-input
                placeholder="content"
                prefix-icon="el-icon-search"
                v-model="input2">
            </el-input>
        </div>
    <el-divider><i class="el-icon-toilet-paper"></i>Part 3</el-divider>
        <el-select v-model="value" placeholder="select">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    <el-divider><i class="el-icon-toilet-paper"></i>Part 4</el-divider>
    </div>
</template>
<script>
export default{
    name: "settingside",
    data () {
      return {
        radio1: 'option2',
        input1:"",
        input2:"",
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      };
    }
}
</script>
<style>
</style>