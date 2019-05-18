<template>
<div class="line">
    <button id="btn"  @click="function1"></button>
    <bubble ref="bubblechart" @click="click"></bubble>
</div>

</template>

<script>
//import {mapState,mapAction} from vuex
import bubble from "../categoriesCharts/bubblechart.vue"

export default {
    data() {
    return {
        //dashboard: this.$store.chartCategory //获取Chart数组
    }
    },
    computed: {
        // ...mapState([
        //     'chartCategory'
        // ]),
        // ...mapAction({
        //     addChart: 'createAction'
        // }),

    },
    methods: {

        function1(){
            //this.$refs.bub.initChart();
            console.log('hello');
            this.$refs.bubblechart.initTest();
        },
        click() {
            //this.$refs.bub.initChart();
            //this.$refs.bubblechart.initTest();
        }
    },
    components: {
        bubble,
    },
    mounted() {
        
    }
}

</script>
    
