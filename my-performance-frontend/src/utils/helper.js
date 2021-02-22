import moment from 'moment';
/**
* 获取cookie
* @param {String} str 
* @return {undefined/String/Number} 对应的cookie值
*/
function getCookie() {
  const cookieObject = {};
  const cookie = document.cookie;
  if (cookie === '') {
    return undefined;
  }
  const cookieArr = cookie.split('; ');
  for (let i = 0; i < cookieArr.length; i += 1) {
    const item = cookieArr[i];
    const index = item.indexOf('=');
    const name = item.substring(0, index);
    const value = item.substring(index + 1);
    cookieObject[name] = value;
  }
  return cookieObject;
}

/**
 * 设置cookie
 * @param {Object} obj 设置cookie的键值对
 */
function setCookie(obj) {
  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      document.cookie = `${key}=${obj[key]}`;
    }
  }
}

/**
 * 数组去重
 * @param {Array} arr 
 */
function arrDeduplication(arr) {
  return [...new Set(arr)];
}

/**
 * 判断当前平台是否是windows
 */
function isWindows() {
  return window.navigator.appVersion.toLowerCase().includes('windows');
}

/** 生成列标签和内容的layout函数 */
function getFormLayout(labelCol, wrapperCol) {
  return (
    {
      labelCol: {
        xs: { span: 24 },
        sm: { span: labelCol },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: wrapperCol },
      },
    }
  );
}

function obj2query(data) {
  let query = '';
  if (!data) return query;
  for (const i in data) {
    if (hasOwnProperty.call(data, i)) {
      query += `${i}=${encodeURIComponent(data[i])}&`;
    }
  }
  // remove last `&`
  return query.replace(/&$/, '');
}

// 日期不包含今天
function dateDiff(startDateString, endDateString) {

  const separator = "-"; //日期分隔符  
  const startDates = startDateString.split(separator);
  const endDates = endDateString.split(separator);
  const startDate = new Date(startDates[0], startDates[1] - 1, startDates[2]);
  const endDate = new Date(endDates[0], endDates[1] - 1, endDates[2]);

  return parseInt((endDate - startDate) / 1000 / 60 / 60 / 24);//把相差的毫秒数转换为天数   
}

/**
  * 判断此对象是否是Object类型
  * @param {Object} obj  
  */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 判断此类型是否是Array类型
 * @param {Array} arr 
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
  *  深度比较两个对象是否相同
  * @param {Object} oldData 
  * @param {Object} newData 
  */
function equalsObj(oldData, newData) {
  // 类型为基本类型时,如果相同,则返回true
  if (oldData === newData) return true;

  if (isObject(oldData) && isObject(newData) && oldData && newData && Object.keys(oldData).length === Object.keys(newData).length) {
    // 类型为对象并且元素个数相同

    // 遍历所有对象中所有属性,判断元素是否相同
    for (const key in oldData) {
      if (oldData.hasOwnProperty(key)) {
        if (!equalsObj(oldData[key], newData[key]))
          // 对象中具有不相同属性 返回false
          return false;
      }
    }
  } else if (isArray(oldData) && isArray(oldData) && oldData && newData && oldData.length === newData.length) {
    // 类型为数组并且数组长度相同
    for (let i = 0, length = oldData.length; i < length; i++) {
      if (!equalsObj(oldData[i], newData[i]))
        // 如果数组元素中具有不相同元素,返回false
        return false;
    }
  } else {
    // 其它类型,均返回false
    return false;
  }
  // 走到这里,说明数组或者对象中所有元素都相同,返回true
  return true;
}

const getContainer = () => document.getElementById('container');

function dateToTime(m) {
  return new Date(m).getTime();
}

function deepCopy(p, type) {
  // type可以是[]or{}
  let c = type || {};
  for (let i in p) {
    if (!p.hasOwnProperty(i)) {
      continue;
    }
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}

/**
 * 生成人类友好时间
 * @param  {Number} _time 毫秒级时间戳
 * @return {String} 人类友好的相对时间显示
 */
function getHumanTime(_time) {
  var _now = parseInt(+new Date() / 1000),
    _apart = _now - parseInt(_time / 1000);

  //年
  if (_apart >= 60 * 60 * 24 * 365) {
    return parseInt(_apart / (60 * 60 * 24 * 365)) + "年前";
  }
  //月
  else if (_apart >= 60 * 60 * 24 * 31) {
    return parseInt(_apart / (60 * 60 * 24 * 31)) + "月前";
  }
  //周
  else if (_apart >= 60 * 60 * 24 * 7) {
    return parseInt(_apart / (60 * 60 * 24 * 7)) + "周前";
  }
  //天
  else if (_apart >= 60 * 60 * 24) {
    return parseInt(_apart / (60 * 60 * 24)) + "天前";
  }
  //小时
  else if (_apart >= 60 * 60) {
    return parseInt(_apart / (60 * 60)) + "小时前";
  }
  //分钟
  else if (_apart >= 60) {
    return parseInt(_apart / 60) + "分钟前";
  }
  //秒
  else {
    return parseInt(_apart) + "秒前";
  }
}


/**
 * 将字节大小转换为人类可读的保留一位小数的大小表示
 * @param  {Number} _size 字节大小
 */
function getHumanSize(_size) {
  if (_size < 1024) {
    return _size + "B";
  } else if (_size >= 1024 && _size < 1024 * 1024) {
    return Number(_size / 1024).toFixed(1) + "KB";
  } else if (_size >= 1024 * 1024 && _size < 1024 * 1024 * 1024) {
    return Number(_size / (1024 * 1024)).toFixed(1) + "MB";
  } else {
    return Number(_size / (1024 * 1024 * 1024)).toFixed(1) + "GB";
  }
}

function isProduction() {
  const { hostname } = window.location;
  return !!hostname.includes('kk.hz.netease.com');
}

function isBusinessFun() {
  const { hostname } = window.location;
  return !!hostname.includes('njdiip');
}

function isZero(text) {
  return text ? text : 0;
}

function isEmpty(text) {
  return text ? text : '';
}

function getTextRelationId(valueList, customfieldid) {
  if (!valueList || !valueList.length) {
    return 0;
  } else {
    const obj = valueList.find(it => it.productCustomField && it.productCustomField.id === customfieldid) || {};
    const relationObj = obj.objectiveCustomFieldRelation || {};
    return isZero(relationObj.id);
  }
}

function estimateCost(estimate_cost) {
  return !/^([\d|\.]{1,}w)?([\d|\.]{1,}d)?([\d|\.]{1,}h)?([\d|\.]{1,}m)?$/.test(estimate_cost);
}

function getStartTime (date) {
  return date ? new Date(date).setHours(0, 0, 0, 0) : '';
}

function getEndTime (date) {
  return date ? new Date(date).setHours(23, 59, 59, 999) : '';
}

export {
  arrDeduplication,
  isWindows,
  getFormLayout,
  obj2query,
  getCookie,
  dateDiff,
  equalsObj,
  getContainer,
  dateToTime,
  deepCopy,
  getHumanTime,
  isProduction,
  isBusinessFun,
  getHumanSize,
  estimateCost,
  getStartTime,
  getEndTime,
  setCookie
};