import mapperdata from "./MapperData.js";
var mapperdatas = null;
var datamap = null;
const mapperdatamanage = {
  setdatamap(data) {
    datamap = data;
  },
  setmapperdata(data) {
    mapperdatas = data;
  },
  getmapperdata() {
    return mapperdatas != null ? mapperdata : null;
  },
  getdatamap() {
    return datamap != null ? datamap : null;
  },
  startanalyzedata() {
    if (mapperdata != null && datamap != null) {
      mapperdata.analyzedata(datamap, mapperdatas);
    }
  }
};
export default mapperdatamanage;
