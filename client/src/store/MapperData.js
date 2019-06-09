import * as d3 from "d3";
var cnull = 0;
const mapperdata = {
  analyzedata(datamap, mapperdatas) {
    var mapperkeys = mapperdatas.keys();
    var fieldnames = [];
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
          if (cnull >= 2) {
            all(data, fieldnames);
            cnull = 0;
          }
          break;
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
  console.log(result);
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
  return map;
}

export default mapperdata;
