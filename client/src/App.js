import React,{Fragment} from 'react';
import { BrowserRouter as Router ,Route , Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path="/" component={ Landing } />
                    <section className="container">
                        <Switch>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;