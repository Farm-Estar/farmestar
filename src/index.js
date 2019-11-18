import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logout } from './actions/authActions'
import { Provider } from 'react-redux'
import store from './config/store'
// import * as serviceWorker from './serviceWorker';

//Components
import App from './components/app/App';
import login from './components/login/login';
import register from './components/register/register';
import dashboard from './components/dashboard/dashboard'
import NotFound from './components/notfound/notfound';
import PrivateRoute from './components/private-route/private-route'

//Check to keep user logged in
if (localStorage.jwtToken) {
    //Set Auth Header
    const token = localStorage.jwtToken
    setAuthToken(token)
    //Decode token
    const decoded = jwt_decode(token)
    //Set User && isAuthenticated
    store.dispatch(setCurrentUser(decoded))

    //Check for expired token
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
        //logout user
        store.dispatch(logout())
        //redirect
        window.location.href = "./login"
    }
}


const routing = (
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={login} />
                    <Route exact path="/register" component={register} />
                    <Route exact path="/dashboard" component={dashboard} />
                    <PrivateRoute exact path="/dashboard" component={dashboard} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

//Needed for Hot Module Replacment
if (typeof (module.hot) !== 'undefined') {
    module.hot.accept() // eslint-disable-line no-undef
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
