import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Header = () => {
    const {setLoginUser, setIsLogin, isLogin, loginUser} = useContext(DataContext);

    const handleClick = (e) => {
        e.preventDefault();
        setLoginUser({});
        setIsLogin(false);
        alert("Logged out!");
    }
    return(
        <header className="Header">
            <h1>Crypto Search App</h1>
            {isLogin? (
                <div className='HeaderLoginBox'>
                    <span>welcome, {loginUser.user.toUpperCase()}</span>
                    <button onClick={handleClick}>Sign out</button>
                </div>
            ) : (
                <Link 
                    style={{textDecoration: 'none'}} 
                    to = "/login"
                >
                    <button className='HeaderLoginButton'>
                    Login
                    </button>
                </Link>
            )}
        </header>

    );
}

export default Header;