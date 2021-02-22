import React, { Component, useEffect, useState } from 'react';
import { Table, message, Layout, Button, Form, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { getSystemList, addSystem } from '@services/app_list';
import { setCookie, getCookie } from '@utils/helper';
import HeaderRight from '../../layout/pages/components/HeaderRight';
import AppForm from './components/AppForm';

const { Header } = Layout;

const hasDanwei = (text) => {
  return text ? `${text}s` : '-';
}

const isFlag = (text) => {
  return text ? `否` : '是';
}

function AppList(props) {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  const columns = [{
    title: '应用名称',
    dataIndex: 'systemName',
    render: (text, record) => {
      return <a onClick={() => handleJump(record.id)}>{text}</a>
    }
  }, {
    title: '应用链接',
    dataIndex: 'systemDomain',
  }, {
    title: 'appId',
    dataIndex: 'appId',
    width: 200,
  }, {
    title: '页面加载阀值',
    dataIndex: 'slowPageTime',
    render: (text) => {
      return hasDanwei(text);
    }
  }, {
    title: 'JS资源阀值',
    dataIndex: 'slowJsTime',
    render: (text) => {
      return hasDanwei(text);
    }
  }, {
    title: 'CSS资源阀值',
    dataIndex: 'slowCssTime',
    render: (text) => {
      return hasDanwei(text);
    }
  }, {
    title: 'IMG资源阀值',
    dataIndex: 'slowImgTime',
    render: (text) => {
      return hasDanwei(text);
    }
  }, {
    title: 'AJAX加载阀值',
    dataIndex: 'slowAajxTime',
    render: (text) => {
      return hasDanwei(text);
    }
  }, {
    title: '是否统计项目',
    dataIndex: 'isUse',
    render: (text) => {
      return isFlag(text);
    }
  }, {
    title: '是否统计页面',
    dataIndex: 'isStatisiPages',
    render: (text) => {
      return isFlag(text);
    }
  }, {
    title: '是否统计AJAX',
    dataIndex: 'isStatisiAjax',
    render: (text) => {
      return isFlag(text);
    }
  }, {
    title: '是否统计页面资源',
    dataIndex: 'isStatisiResource',
    render: (text) => {
      return isFlag(text);
    }
  }, {
    title: '是否统计用户系统信息',
    dataIndex: 'isStatisiSystem',
    render: (text) => {
      return isFlag(text);
    }
  }, {
    title: '是否统计错误信息',
    dataIndex: 'isStatisiError',
    render: (text) => {
      return isFlag(text);
    }
  }, {
    title: '操作',
    dataIndex: 'caozuo',
    render: () => {
      return <a>设置</a>
    }
  }]

  useEffect(() => {
    getSystemListFun();
  }, [])

  const getSystemListFun = () => {
    getSystemList({ userId: getCookie().userId }).then(res => {
      if (res.code !== 200) return message.error(res.message);
      setData(res.result);
    }).catch(err => {
      return message.error(err || err.message);
    })
  }

  const handleJump = (id) => {
    setCookie({ systemId: id });
    props.history.push('/home/default')
  }

  const handleOk = () => {
    props.form.validateFields((err, values) => {
      if (err) return ;
      const params = {
        ...values,
        userId: getCookie().userId,
      }
      console.log('params', params)
      addSystem(params).then(res => {
        if (res.code !== 200) return message.error(res.msg);
        message.success('添加应用成功！');
        setVisible(false);
        getSystemListFun();
      }).catch(err => {
        return message.error(err || err.message);
      })
    })
  }

  return (<>
    <Header style={{ backgroundColor: '#ccc' }}>
      性能监控系统
        <span className="f-fr">
        <HeaderRight />
      </span>
    </Header>
    <div className="f-tar u-mgt10 u-mgb10"><Button onClick={() => setVisible(true)} type="primary">添加应用</Button></div>
    <Table
      columns={columns}
      dataSource={data}
    />

    <Modal
      title="添加应用"
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={() => handleOk()}
      width={600}
    >
      <AppForm {...props} />
    </Modal>
  </>)
}

export default withRouter(Form.create()(AppList));
