import React, { Component, useContext, useEffect, useState, useCallback, useReducer } from 'react';
import { Table, message } from 'antd';
import { AppContext } from '@src/context';
import { getPagesData } from '@services/pages';

function index(props) {
  const [data, setData] = useState([]);
  const columns = [{
    title: 'URL',
    dataIndex: 'url',
    width: 200,
  }, {
    title: '调用次数',
    dataIndex: 'count',
  }, {
    title: '页面加载时间',
    dataIndex: 'loadTime',
    render: (text) => {
      return text ? `${(text / 1000).toFixed(3)}s` : '-';
    }
  }, {
    title: '白屏时间',
    dataIndex: 'whiteTime',
    render: (text) => {
      return text ? `${(text / 1000).toFixed(3)}s` : '-';
    }
  }, {
    title: '资源加载耗时',
    dataIndex: 'resourceTime',
    render: (text) => {
      return text ? `${(text / 1000).toFixed(3)}s` : '-';
    }
  }, {
    title: 'DOM构建时间',
    dataIndex: 'domTime',
    render: (text) => {
      return text ? `${(text / 1000).toFixed(3)}s` : '-';
    }
  }, {
    title: '解析dom耗时',
    dataIndex: 'analysisDomTime',
    render: (text) => {
      return text ? `${(text / 1000).toFixed(3)}s` : '-';
    }
  }, {
    title: 'DNS解析时间',
    dataIndex: 'dnsTime',
    render: (text) => {
      return text ? `${Number(text).toFixed(3)}ms` : '-';
    }
  }, {
    title: 'TCP连接时间',
    dataIndex: 'tcpTime',
    render: (text) => {
      return text ? `${Number(text).toFixed(3)}ms` : '-';
    }
  }, {
    title: '页面重定向时间',
    dataIndex: 'redirectTime',
    render: (text) => {
      return text ? `${Number(text).toFixed(3)}ms` : '-';
    }
  }, {
    title: 'unload时间',
    dataIndex: 'unloadTime',
    render: (text) => {
      return text ? `${Number(text).toFixed(3)}ms` : '-';
    }
  }, {
    title: 'request请求耗时',
    dataIndex: 'requestTime',
    render: (text) => {
      return text ? `${Number(text).toFixed(3)}ms` : '-';
    }
  }, {
    title: '页面准备时间',
    dataIndex: 'readyTime',
    render: (text) => {
      return text ? `${Number(text).toFixed(3)}ms` : '-';
    }
  }]

  useEffect(() => {
    getPagesDataFun();
  }, [])

  const getPagesDataFun = () => {
    const params = {
      pageNo: 1,
      pageSize: 50,
    };
    getPagesData(params).then(res => {
      if (res.code !== 200) return message.error(res.msg);
      setData(res.result.datalist || []);
    }).catch(err => {
      return message.error(err || err.message);
    })
  }

  return (<span>
    <Table
      dataSource={data}
      columns={columns}
    />
  </span>)
}

export default index;
