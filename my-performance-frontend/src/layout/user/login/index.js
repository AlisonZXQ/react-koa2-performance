import React, { useState, useContext } from 'react';
import { Input, Button, Form, message } from 'antd';
import { getFormLayout } from '@utils/helper';
import { login, userRegister } from '@services/user';
import { Context } from '@src/context';
import { setCookie } from '@utils/helper';

const FromItem = Form.Item;
const fromLayout = getFormLayout(6, 18);

function index(props) {
  const { state, dispatch } = useContext(Context);
  const { form: { getFieldDecorator, getFieldsValue } } = props;
  const [loginFlag, setState] = useState(true); // true登陆 false注册

  const userLogin = () => {
    const params = {
      userName: getFieldsValue().userName,
      passWord: getFieldsValue().passWord,
    }
    login(params).then(res => {
      if (res.code !== 200) return message.error(res.message);
      setCookie({ userId: res.result.id, userName: res.result.userName });
      props.history.push(`/application`)
      dispatch({ type: 'user/saveUserInfo', payload: { ...res.result }})
    }).catch(err => {
      return message.error(err || err.message);
    })
  }

  const handleRegister = () => {
    const { userName, passWord, rePassWord } = getFieldsValue();
    const params = {
      userName,
      passWord,
      rePassWord,
    }
    if (passWord !== rePassWord) {
      return message.error('两个密码输入不一致！');
    }
    
    userRegister(params).then(res => {
      if (res.code !== 200) return message.error(res.message);
      message.success('注册成功！');
      setState(true);
    }).catch(err => {
      return message.error( err || err.message);
    })
  }

  return (<span>
    <FromItem label="账号" {...fromLayout}>
      {getFieldDecorator('userName', {

      })(
        <Input />
      )}
    </FromItem>

    <FromItem label="密码" {...fromLayout}>
      {getFieldDecorator('passWord', {

      })(
        <Input />
      )}
    </FromItem>

    {
      !loginFlag &&
      <FromItem label="确定密码" {...fromLayout}>
        {getFieldDecorator('rePassWord', {

        })(
          <Input />
        )}
      </FromItem>
    }

    <div className="f-tac">
      {
        loginFlag && [
          <Button type='primary' className="u-mgr10" onClick={() => userLogin()}>登陆</Button>,
          <Button onClick={() => setState(false)}>注册</Button>]
      }

      {
        !loginFlag &&
        <Button onClick={() => handleRegister()}>注册</Button>
      }

    </div>
  </span >)
}

export default Form.create()(index);
