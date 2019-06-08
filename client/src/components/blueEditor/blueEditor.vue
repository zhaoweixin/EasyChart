<template>
    <div id="blueEditor">
        <vs-popup fullscreen title="Preview" :active.sync="popupActivo4">
            <div>
                <p>This is popup</p>
                <el-button size="small" type="primary" @click="test">Finish</el-button>
            </div>
        </vs-popup>
    </div>
</template>
<script>
export default {
    name:'blueEditor',
    data(){
        return{
        }
    },
    computed:{
        popupActivo4 () {
            return this.$store.state.popUp
        }
    },
    watch:{
        popupActivo4: {
            handler(val, oldVal){
                console.log(val, oldVal)
            }
        }
    },
    methods:{
        func: function(){
            //if(this.popupActivo4 == true){
                //this.$store.commit("editInteraction")
            //}
        },
        test: function(){
            this.$store.commit("editInteraction")
        }
    }
}
</script>
<style>

</style>
