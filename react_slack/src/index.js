import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { combinedReducers } from './store/reducer'
import { setUser } from './store/actioncreator'

import Register from './components/Register';
import ForgotPassword from './components/Forgot_Paaword';
import Login from './components/Login';
import firebase from './base/firebase'
import AppLoader from './components/Loader'

const store = createStore(combinedReducers)

const Index = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user)
        props.history.push("/")
      } 
      else if(props.location.pathname==="/forgotpassword"){
        props.setUser(null)
        props.history.push("/forgotpassword")
      }
      else {
        props.setUser(null)
        props.history.push("/login")
      }
    })
  },[]);


  return (
    <>
    <AppLoader loading={props.loading && props.location.pathname==="/"} />
     <Switch>
      <Route path="/forgotpassword" component={ForgotPassword}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/" component={App}></Route>
    </Switch>
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    loading: state.channel.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => { dispatch(setUser(user)) }
  }
}


const IndexWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))

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
