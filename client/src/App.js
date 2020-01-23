import React,{Fragment , useEffect } from 'react';
import { BrowserRouter as Router ,Route , Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './Components/Routing/PrivateRoute';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import Alert from './Components/Layout/Alert';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import CreateProfile from './Components/profile-forms/CreateProfile';
import Dashboard from './Components/Dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

 if(localStorage.token){
   setAuthToken(localStorage.token);
 };

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path="/" component={ Landing } />
                    <section className="container">
                        <Alert />
                        <Switch>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
