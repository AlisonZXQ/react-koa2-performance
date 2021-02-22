import React, { useContext } from 'react';
import Logout from '../../user/logout';
import { Context } from '@src/context';
import { getCookie } from '@utils/helper';
import { withRouter } from 'react-router-dom'

function HeaderRight(props) {
  const { state, dispatch } = useContext(Context);
  const userInfo = state.userInfo || {};

  return ([<span className="f-csp u-mgr20">{getCookie().userName}</span>,
  <span className="f-csp u-mgr20" onClick={() => props.history.push('/application')}>我的应用</span>,
  <Logout />])
}

export default withRouter(HeaderRight);