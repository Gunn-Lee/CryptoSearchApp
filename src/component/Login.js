import {Link} from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
//import axios from '../api/axios';

const Login = () => {
    const { userID, setUserID, userPWD, setUserPWD, navigate, usersList, setIsLogin, setLoginUser, handleLogin } = useContext(DataContext);

    return (
        <div className='Login'>
            <form className="LoginForm" onSubmit={(e) => e.preventDefault()}>
                <h2> Sign In</h2>
                <section className='loginbox'>
                    <label id="login_id">ID: </label>
                    <input 
                        id="login_id"
                        type="text"
                        placeholder="ID"
                        required
                        autoFocus
                        value={userID}
                        onChange={(e) => {setUserID(e.target.value)}}
                    />
                </section>
                <section className='loginbox'>
                    <label id="login_pwd">PWD: </label>
                    <input 
                        id="login_pwd"
                        type="password"
                        placeholder="Password"
                        required
                        value={userPWD}
                        onChange={(e) => {setUserPWD(e.target.value)}}
                    />
                </section>
                <section className='LoginButtons'>
                    <button onClick={handleLogin}>Sign In</button>
                    <p className='LogintoRegister'>
                        <span>You don't have account yet?</span>
                        <br />
                        <span><Link to ="/register">Register</Link></span>
                        <br />
                        <span className="backhome"><Link to ="/">Back to Home</Link></span>
                    </p>
                </section>
            </form>
        </div>
    );
 }

 export default Login;