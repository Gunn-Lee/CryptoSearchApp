import { useState, useContext } from 'react';
import DataContext from '../context/DataContext';

const Nav = () => {

    const {isMover, setIsMover, search, setSearch} = useContext(DataContext);


    return(
        <nav className="Nav">
            <form className="Search">
                <input 
                    type="text"
                    placeholder="Search Crypto"
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <form className='Nav_ClickBox'>
                <button 
                    className={isMover? 'Nav_button' : 'Nav_button_dark'}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsMover(false)
                    }}
                >
                        Trending
                </button>
                <button 
                    className={isMover? 'Nav_button_dark' : 'Nav_button'}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsMover(true)
                    }}
                >
                    Daily Mover
                </button>
            </form>
        </nav>

    );
}

export default Nav;