import * as d3 from "d3";
import store from "./store.js";
import Dataconfig from "./dataconfig.js";
import $ from "jquery";
var cnull = 0;
const mapperdata = {
  analyzedata(datamap, mapperdatas) {
    var mapperkeys = mapperdatas.keys();
    var fieldnames = [];
    var ctable = false;
    for (var i = 0; i < mapperkeys.length - 1; i++) {
      //判断数据是否来自于同一张表
      var f = mapperdatas.get(mapperkeys[i]).tablename;
      var s = mapperdatas.get(mapperkeys[i + 1]).tablename;
      if (f != s) {
        ctable = true;
        break;
      }
    }
    if (ctable) return;
    if (store.state.propsData.datamappers.length > 1) {
      for (var i = 0; i < mapperkeys.length; i++) {
        var pre = mapperdatas.get(mapperkeys[i]).pre;
        var data = datamap.get(mapperdatas.get(mapperkeys[i]).tablename).data;
        var fieldname = mapperdatas.get(mapperkeys[i]).fieldname;
        var group = mapperdatas.get(mapperkeys[i]).groub;
        switch (pre) {
          case "count":
            count(data, fieldname, group);
            break;
          case "avg":
            avg(data, fieldname, group);
            break;
          case "sum":
            sum(data, fieldname, group);
            break;
          default:
            cnull++;
            fieldnames.push(fieldname);
            if (
              cnull == 1 &&
              $("#x").is(":visible") &&
              !$("#y").is(":visible")
            ) {
              piedata(data, fieldname);
            }
            if (cnull >= 2) {
              all(data, fieldnames);
              cnull = 0;
            }
            break;
        }
      }
    }
  }
};
function count(data, countfield, group) {
  var map = publicopre(data, group);
  var result = [];
  var keys = map.keys();
  for (var i = 0; i < keys.length; i++) {
    var count = 0;
    var field = map.get(keys[i]);
    for (var j = 0; j < field.length; j++) {
      if (field[j][countfield] != null) count++;
    }
    if (!result[i]) result[i] = {};
    result[i]["count(" + countfield + ")"] = count;
    result[i][group] = keys[i];
  }
  Dataconfig.barxname = group;
  Dataconfig.baryname = "count(" + countfield + ")";
  Dataconfig.dataname = "count(" + countfield + ")";
  store.state.propsData.data = result;
  console.log(result);
}
function sum(data, sumfield, group) {
  var map = publicopre(data, group);
  var result = [];
  var keys = map.keys();
  for (var i = 0; i < keys.length; i++) {
    var sum = 0;
    var field = map.get(keys[i]);
    for (var j = 0; j < field.length; j++) {
      if (field[j][sumfield] != null) {
        sum += Number(field[j][sumfield]);
      }
    }
    if (!result[i]) result[i] = {};
    result[i]["sum(" + sumfield + ")"] = sum;
    result[i][group] = keys[i];
  }
  Dataconfig.barxname = group;
  Dataconfig.baryname = "sum(" + sumfield + ")";
  Dataconfig.dataname = "sum(" + sumfield + ")";
  store.state.propsData.data = result;
  console.log(result);
}
function avg(data, avgfield, group) {
  var map = publicopre(data, group);
  var result = [];
  var keys = map.keys();
  for (var i = 0; i < keys.length; i++) {
    var avg = 0;
    var field = map.get(keys[i]);
    for (var j = 0; j < field.length; j++) {
      if (field[j][avgfield] != null) {
        avg += Number(field[j][avgfield]);
      }
    }
    if (!result[i]) result[i] = {};
    result[i]["avg(" + avgfield + ")"] = avg / field.length;
    result[i][group] = keys[i];
  }
  Dataconfig.barxname = group;
  Dataconfig.baryname = "avg(" + avgfield + ")";
  Dataconfig.dataname = "avg(" + avgfield + ")";
  store.state.propsData.data = result;
  console.log(result);
}
function all(data, fieldnames) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < fieldnames.length; j++) {
      if (!result[i]) result[i] = {};
      result[i][fieldnames[j]] = data[i][fieldnames[j]];
    }
  }
  Dataconfig.barxname = fieldnames[0];
  Dataconfig.baryname = fieldnames[1];
  Dataconfig.dataname = fieldnames[1];
  store.state.propsData.data = result;
  console.log(result);
}
function piedata(data, fieldname) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    result[i][fieldname] = data[i][fieldname];
  }
  store.state.propsData.data = result;
}
function publicopre(data, group) {
  var map = d3.map(
    d3
      .nest()
      .key(function(d) {
        return d[group];
      })
      .map(data, d3.map)
  );

  console.log(map);
  return map;
}

export default mapperdata;
