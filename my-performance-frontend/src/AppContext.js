import React, { useReducer } from 'react';
import Layout from './layout';
import reducers from './reducers';
import { user } from './reducers/user';
import { Context } from './context';

function App() {
  const [state, dispatch] = useReducer(user, { userInfo: {} });

  return (
    <>
      <Context.Provider value={{ state, dispatch: dispatch }}>
        <Layout />
      </Context.Provider>
    </>);
}

export default App;