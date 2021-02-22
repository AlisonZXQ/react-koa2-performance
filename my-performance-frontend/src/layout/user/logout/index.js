import React, { Component } from 'react';
import { loginOut } from '@services/user';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';

function logout(props) {

  const handleLogout = () => {
    loginOut().then(res => {
      if (res.code !== 200) return message.error(res.message);
      message.success('退出成功！');
      props.history.push('/login');
    }).catch(err => {
      return message.error(err || err.message);
    })
  }

  return (<span className="u-mgl15 f-csp" onClick={() => handleLogout()}>
    退出登陆
  </span>)
}

export default withRouter(logout);
