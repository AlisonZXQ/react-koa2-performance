import React, { useEffect, useState } from 'react';
import { Select, Input, Row, Tabs, message } from 'antd';
import { getHttpResponseData } from '@services/http_test';
import ReactJson from 'react-json-view'
import { methodType, contentType } from './components/Config';

const Option = Select.Option;
const { Search, TextArea } = Input;
const { TabPane } = Tabs;

function HttpTest() {
  const [result, setResult] = useState({});
  const [url, setUrl] = useState('http://kk-dev.hz.netease.com/rest/product/version/kanban/list?versionid=162');
  const [method, setMethod] = useState(1);
  const [contentT, setContentType] = useState(1);
  const [headers, setHeaders] = useState(`Content-Type: application/json
  Cookie: pmou=zhangxueqing01; pmot=ed0bbdc5cc834eccacbf445f925e06bc; epauth=MjoxNjAwMzI4MDk4NDk0OmM0YjFlMmM1YThiYjQwOGZjMjUyYmE2MTc1YTUwM2Q0; _ga=GA1.2.1861299045.1597817224; _gid=GA1.2.828084886.1597817224; hrs_online_op_session_id_1.0=6483CA9B342EF20EFB1E6242DCC6F7E371163D8B1257A90636EA8963CE23E232F68B36A920F9254260B420ABD8C98FFDBC3DA2592AB1AF6CC91774181F7EE510BA05FE5FD0F1B40DDEBA17DA202BC37B763FCB7B9BAE42FD5D810B7F99B8F212551A35F51AE19B54204947774941D84B04D19395ACFB5EA410060F56FFE511DC3CC340985EB68853059AC6BFD077524593EA1D7DD5270D0543CCCAC164B474B9AD8F0184B5EC955E712C76CE67D16DEC; JSESSIONID=34F9643F59EADE67F0DED26EB7CB8B0B
  currentPid: -1
  Host: kk-dev.hz.netease.com
  pmot: ed0bbdc5cc834eccacbf445f925e06bc
  pmou: zhangxueqing01`);
  const [body, setBody] = useState('');

  useEffect(() => {
  }, []);

  const getParams = () => {
    let params = {}

    if (body) {
      let split = body.split('\n')
      split.forEach(item => {
        let split1 = item.split('=')
        if (split1[0].trim()) {
          params[split1[0].trim()] = split1[1].trim()
        }
      })
    }
    return params;
  }

  const getHeaders = () => {
    let headerParams = {}

    if (headers) {
      let split = headers.split('\n')
      split.forEach(item => {
        let split1 = item.split(':')
        if (split1[0].trim()) {
          headerParams[split1[0].trim()] = split1[1].trim()
        }
      })
    }

    return headerParams;
  }

  const getHttpResponseDataFun = (url) => {
    const params = {
      url,
      method: methodType[method],
      params: getParams(),
      headers: {
        ...getHeaders(),
        "Content-Type": contentType[contentT],
      }
    }

    getHttpResponseData(params).then(res => {
      if (res.code !== 200) return message.error(res.msg);
      setResult(res.result || {})
    }).catch(err => {
      return message.error(err || err.message);
    })
  }

  const callback = () => {
  }

  console.log('result', result)

  return (<>
    <Select
      style={{ width: '300px' }}
      defaultValue={1}
      onChange={() => setMethod(value)}
    >
      {Object.keys(methodType).map(it =>
        <Option key={Number(it)} value={Number(it)}>
          {methodType[Number(it)]}
        </Option>)}
    </Select>
    <Search
      placeholder="输入搜索"
      enterButton="发送请求"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      style={{ width: '600px' }}
      onSearch={value => getHttpResponseDataFun(value)}
    />

    <Row className="u-mgt10 u-mgb10">
      <span className="f-fwb u-mgr10">Request</span>
      <Select
        style={{ width: '300px' }}
        defaultValue={1}
        onChange={(value) => setContentType(value)}
      >
        {Object.keys(contentType).map(it =>
          <Option key={Number(it)} value={Number(it)}>
            {contentType[Number(it)]}
          </Option>)}
      </Select>
    </Row>

    <Tabs onChange={callback} type="card">
      <TabPane tab="Header" key="1">
        <TextArea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          rows={6}
        />
      </TabPane>

      <TabPane tab="Body" key="2">
        <TextArea
          onChange={(e) => setBody(e.target.value)}
          rows={6}
        />
      </TabPane>
    </Tabs>

    <Row className="u-mgt20 u-mgb10">
      <span className="f-fwb u-mgr10">Response</span>
      <span>HTTP响应耗时： {result.duration / 1000}s</span>
    </Row>

    <Tabs onChange={callback} type="card">
      <TabPane tab="Header" key="1">
        <div>
          <ReactJson src={result.header} />
        </div>
      </TabPane>

      <TabPane tab="Body" key="2">
        <div>
          <ReactJson src={result.data} />
        </div>
      </TabPane>
    </Tabs>

  </>)
}

export default HttpTest;
