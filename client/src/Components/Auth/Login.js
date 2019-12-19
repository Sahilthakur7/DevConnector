import React,{Fragment , useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
        }
    );

    const { email , password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        console.log("SUCCESS");
    }

    return(
        <Fragment>
            <h1 class="large text-primary">Sign In</h1>
            <p class="lead"><i class="fas fa-user"></i>Sign into your account</p>
            <form class="form"
                onSubmit = {e => onSubmit(e)}
            >
                <div class="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </form>
            <p class="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
}

export default Login;
