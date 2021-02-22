import React from 'react';
import { Form, Input } from 'antd';
import { getFormLayout } from '@utils/helper';

const formLayout = getFormLayout(6, 14);
const FormItem = Form.Item;

function AppForm(props) {
  const { form: { getFieldDecorator } } = props;

  return (<>
    <FormItem label="应用名称" {...formLayout}>
      {getFieldDecorator('systemName', {
        rules: [{ required: true, message: '此项必填！' }]
      })(
        <Input placeholder="请输入应用名称" />
      )}
    </FormItem>
    <FormItem label="应用域名" {...formLayout}>
      {getFieldDecorator('systemDomain', {
        rules: [{ required: true, message: '此项必填！' }]
      })(
        <Input placeholder="http://kk-dev.netease.com" />
      )}
    </FormItem>
    <FormItem label="页面慢加载阀值" {...formLayout}>
      {getFieldDecorator('slowPageTime', {
      })(
        <Input placeholder="默认8s" />
      )}
    </FormItem>
    <FormItem label="JS慢加载阀值" {...formLayout}>
      {getFieldDecorator('slowJsTime', {

      })(
        <Input placeholder="默认2s" />
      )}
    </FormItem>
    <FormItem label="CSS慢加载阀值" {...formLayout}>
      {getFieldDecorator('slowCssTime', {

      })(
        <Input placeholder="默认1s" />
      )}
    </FormItem>
    <FormItem label="IMG慢加载阀值" {...formLayout}>
      {getFieldDecorator('slowImgTime', {

      })(
        <Input placeholder="默认2s" />
      )}
    </FormItem>
  </>)

}

export default AppForm;