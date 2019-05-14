<template>
<div class="line">
    <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
    <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
    <div class="main"></div>
</div>

</template>

<script>
import {mapState,mapAction} from vuex

export default {
    data() {
    return {
        dashboard: this.$store.chartCategory //获取Chart数组
    }
    },
    computed: {
        ...mapState([
            'chartCategory'
        ]),
        chartCategory () {
            return store.state.lineChart;
        },
        ...mapAction({

        })
    },
    methods: {
        _init() {
            this.legendArr = this.myChart.getOption().series
            this.legendArr.forEach((data) => {
            data.selected = true;
            })
            this.$root.charts.push(this.myChart)
            window.addEventListener('resize', function() {
            this.myChart.resize()
            }.bind(this))
        },
        getData(data) {

        },
        getstate(){

        }
    },
    components: {
    },
    mounted() {

    }
}

</script>
    
