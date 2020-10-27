import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import {Provider,connect} from 'react-redux'
import {createStore} from 'redux'
import {combinedReducers} from './store/reducer'
import {setUser} from './store/actioncreator'

import Register from './components/Register';
import Login from './components/Login';
import firebase from './base/firebase'

const store=createStore(combinedReducers)

const Index = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          props.history.push("/")
      } else {
        props.history.push("/login")

      }
    })
  }, []);

  return (
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/" component={App}></Route>
    </Switch>
  )
}

const IndexWithRouter = withRouter(connect()(Index))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
    <Router>
      <IndexWithRouter />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
