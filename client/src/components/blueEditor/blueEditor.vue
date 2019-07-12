<template>
    <div id="blueEditor">
        
        <vs-popup title="Editor" fullscreen :active.sync="popupActivo4" icon-close="close" style="">
            
            <div>
                <el-page-header @back="close" content="详情页面">
                </el-page-header>
                <el-container>
                    <el-aside style="text-align: center;  height: 950px; width:200px">
                        <el-divider content-position="center" style="font-size:16px; color:#333; font-weight:700">Tool Boxs</el-divider>
                        <div>
                            <el-collapse v-model="activeNames">
                                <el-collapse-item title="categories1" name="1">
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                </el-collapse-item>
                                <el-collapse-item title="categories2" name="2">
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                </el-collapse-item>
                                <el-collapse-item title="categories3" name="3">
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                </el-collapse-item>
                                <el-collapse-item title="categories4" name="4">
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                    <el-row>
                                        <vs-button type="line" style="width:150px">Primary</vs-button>
                                    </el-row>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-aside>
                    <el-container style="padding-left:2%">
                        <el-header style="height:50px">
                            <el-row >
                                <el-divider content-position="center" style="font-size:16px; color:#333; font-weight:700">Editor Panel</el-divider>
                            </el-row>
                        </el-header>
                        <el-main>
                            <div id='preview' style="background:rgba(0,0,0,0.05)"><svg id ='editorborad'></svg></div>
                        </el-main>
                    </el-container>
                </el-container>
            </div>
        </vs-popup>
        <!--
        <vs-popup title="Edit Interaction" fullscreen :active.sync="popupActivo4" :button-close-hidden="buttonclosehidden">

        </vs-popup>
        -->
    </div>
</template>
<script>
import * as d3 from 'd3'
import BlueprintLine from "./blueprintLine"
import BlueComponent from "./blueComponent"
import modelConfig from "../../assets/modelConfig2.json"
import blueComponentTypes from "../../assets/blueComponentTypes.json"
import dashboardVue from '../dashboard/dashboard.vue';
import axios from "axios";
export default {
    name:'blueEditor',
    data(){
        return{
            buttonclosehidden:true,
            activeNames: ['0']
        }
    },
    computed:{
        popupActivo4 :{
            get: function(){
                return this.$store.state.popUp
            },
            set: function(){
                this.$store.commit("editInteraction")
            }
        }
    },
    watch:{
        popupActivo4: {
            handler(val, oldVal){
                console.log(val, oldVal)
            }
        }
    },
    mounted() {},
    methods:{
        close: function(){
            let that = this
            //this.$store.commit("updateDataMapper", that.dataMapper)
            //console.log(controlledCom, this.blueComponentNameList, that.componentGraph)
            this.$store.commit("editInteraction")
        },
        calculator(option){
        }
    }
}
</script>
<style>
.el-header {
    text-align: center;
}
.buttonInner {
    display: inline-block;
}
.el-main{
    padding: 5px !important
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.el-button--text{
    color: grey !important
}
.el-divider__text{
    font-weight: 700;
    font-size: 16px;
}
</style>
