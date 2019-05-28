<template>
  <el-collapse v-model="activeNames">

    <el-collapse-item
      title="container"
      name="container"
      v-if="id!=='null'"
    >

      <div class="item">
        <span class="itemName">height: </span>
        <el-input
          v-model="chart.container.height"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">width: </span>
        <el-input
          v-model="chart.container.width"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">paddingTop: </span>
        <el-input
          v-model="chart.container.padding[0]"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">paddingRight: </span>
        <el-input
          v-model="chart.container.padding[1]"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">paddingBottom: </span>
        <el-input
          v-model="chart.container.padding[2]"
          size="mini"
          style="width: 80px"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">paddingLeft: </span>
        <el-input
          v-model="chart.container.padding[3]"
          size="mini"
        >
        </el-input>
      </div>

    </el-collapse-item>
    <el-collapse-item
      title="backgroud"
      name="background"
      v-if="id!=='null'"
    >
      <div class="item">
        <span class="itemName">fill: </span>
        <el-input
          v-model="chart.container.background.fill"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">fillOpacity: </span>
        <el-input
          v-model="chart.container.background.fillOpacity"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">stroke: </span>
        <el-input
          v-model="chart.container.background.stroke"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">strokeOpacity: </span>
        <el-input
          v-model="chart.container.background.strokeOpacity"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">opacity: </span>
        <el-input
          v-model="chart.container.background.opacity"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">lineWidth: </span>
        <el-input
          v-model="chart.container.background.lineWidth"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">radius: </span>
        <el-input
          v-model="chart.container.background.radius"
          size="mini"
        >
        </el-input>
      </div>
    </el-collapse-item>
    <el-collapse-item
      title="meta"
      name="meta"
      v-if="id!=='null'"
    >
      <div class="item">
        <span class="itemName">title: </span>
        <el-input
          v-model="chart.meta.title"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">legend: </span>
        <el-select
          v-model="chart.meta.legend"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in optionsTF"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-collapse-item>
    <el-collapse-item
      title="tooltip"
      name="tooltip"
      v-if="id!=='null'"
    >
      <div class="item">
        <span class="itemName">triggerOn: </span>
        <el-input
          v-model="chart.meta.tooltip.triggerOn"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">title: </span>
        <el-input
          v-model="chart.meta.tooltip.title"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">offset: </span>
        <el-input
          v-model="chart.meta.tooltip.offset"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">inPlot: </span>
        <el-select
          v-model="chart.meta.tooltip.inPlot"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in optionsTF"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="itemName">follow: </span>
        <el-select
          v-model="chart.meta.tooltip.follow"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in optionsTF"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="itemName">shared: </span>
        <el-select
          v-model="chart.meta.tooltip.shared"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in optionsTF"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="itemName">enterable: </span>
        <el-select
          v-model="chart.meta.tooltip.enterable"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in   optionsTF"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="itemName">position: </span>
        <el-select
          v-model="chart.meta.tooltip.position"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in optionsPos"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="itemName">hideMarkers: </span>
        <el-select
          v-model="chart.meta.tooltip.hideMarkers"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in   optionsTF"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-collapse-item>
    <el-collapse-item
      title="xAxis"
      name="xAxis"
      v-if="id!=='null'"
    >
      <div class="item">
        <span class="itemName">name: </span>
        <el-input
          v-model="chart.meta.X_axis.name"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">position: </span>
        <el-select
          v-model="chart.meta.X_axis.position"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in optionsPos"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="itemName">stroke: </span>
        <el-input
          v-model="chart.meta.X_axis.line.stroke"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">strokeOpacity: </span>
        <el-input
          v-model="chart.meta.X_axis.line.strokeOpacity"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">lineWidth: </span>
        <el-input
          v-model="chart.meta.X_axis.line.lineWidth"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">text: </span>
        <el-input
          v-model="chart.meta.X_axis.label.text"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">textAlign: </span>
        <el-select
          v-model="chart.meta.X_axis.label.textStyle.textAlign"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in optionsAlign"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="itemName">fill: </span>
        <el-input
          v-model="chart.meta.X_axis.label.textStyle.fill"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">fontSize: </span>
        <el-input
          v-model="chart.meta.X_axis.label.textStyle.fontSize"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">fontWeight: </span>
        <el-input
          v-model="chart.meta.X_axis.label.textStyle.fontWeight"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">textBaseline: </span>
        <el-select
          v-model="chart.meta.X_axis.label.textStyle.textBaseline"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in optionsBase"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-collapse-item>
    <el-collapse-item
      title="yAaxis"
      name="yAaxis"
      v-if="id!=='null'"
    >
      <div class="item">
        <span class="itemName">name: </span>
        <el-input
          v-model="chart.meta.Y_axis.name"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">text: </span>
        <el-input
          v-model="chart.meta.Y_axis.label.text"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">fontSize: </span>
        <el-input
          v-model="chart.meta.Y_axis.label.textFontSize"
          size="mini"
        >
        </el-input>
      </div>
      <div class="item">
        <span class="itemName">fill: </span>
        <el-input
          v-model="chart.meta.Y_axis.label.fill"
          size="mini"
        >
        </el-input>
      </div>
    </el-collapse-item>
    <el-collapse-item
      title="bubblechart"
      name="bubblechart"
      v-if="id === '001'"
    >

    </el-collapse-item>
    <el-collapse-item
      title="bubbleFrequencyChart"
      name="bubbleFrequencyChart"
      v-if="id === '002'"
    >
    </el-collapse-item>
    <el-collapse-item
      title="gaugechart"
      name="gaugechart"
      v-if="id === '003'"
    >
    </el-collapse-item>
    <el-collapse-item
      title="groupBarChart"
      name="groupBarChart"
      v-if="id === '004'"
    >
    </el-collapse-item>
    <el-collapse-item
      title="groupPieChart"
      name="groupPieChart"
      v-if="id === '005'"
    >
    </el-collapse-item>
    <el-collapse-item
      title="lineChart"
      name="lineChart"
      v-if="id === '006'"
    >
    </el-collapse-item>
    <el-collapse-item
      title="mapBoxView"
      name="mapBoxView"
      v-if="id === '007'"
    >
    </el-collapse-item>
    <el-collapse-item
      title="pieChart"
      name="pieChart"
      v-if="id === '008'"
    >
    </el-collapse-item>
    <el-collapse-item
      title="radarChart"
      name="radarChart"
      v-if="id === '009'"
    >
    </el-collapse-item>
    <el-collapse-item
      title="ratiochart"
      name="ratiochart"
      v-if="id === '010'"
    >
    </el-collapse-item>
    <el-collapse-item
      title="data"
      name="data"
    >
      <div>
        <button @click="foo">id=001</button>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  name: "settingside",
  data() {
    return {
      chart: {},//图表数据

      activeNames: ["container", "meta", "tooltip", "xAxis", "yAxis", "data"],//折叠面板
      id: "null",//图表id，根据id找到state里的图表数据

      //这些是一些选项的配置
      optionsTF: [
        { value: "ture", label: "ture" },
        { value: "false", label: "false" }
      ],
      optionsPos: [
        { value: "left", label: "left" },
        { value: "right", label: "right" },
        { value: "top", label: "top" },
        { value: "bottom", label: "bottom" }
      ],
      optionsBase: [
        { value: "top", label: "top" },
        { value: "middle", label: "middle" },
        { value: "bottom", label: "bottom" }
      ],
      optionsAlign: [
        { value: "start", label: "start" },
        { value: "center", label: "center" },
        { value: "end", label: "end" }
      ]
    };
  },
  computer: {},
  watch: {
    //id变化时从state读取chart数据
    id: function() {
      this.chart = this.$store.state.chartComponentArray[0].dataset;
    },
    //chart变化时修改state
    chart: function(val) {
      this.$store.commit("reChartData", { id: this.id, dataset: val });
    }
  },
  methods: {
    //临时修改id的方法
    foo: function() {
      this.id = "001";
      // console.log(this.id)
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
  width: 90px;
}
</style>