import Header from './Header';
import Nav from './Nav';
import Trending from './Trending';
import FavList from './FavList';
import Mover from './Mover';
import List from './List';
import { useContext } from 'react';
import DataContext from '../context/DataContext';


const Home  = () => {
    const {isMover, isLogin, isLoading} = useContext(DataContext);
    return (
        <main className="Home">
            <Header />
            <Nav />
            {!isLoading &&
                <>
                        {isMover ? (
                            <Mover />
                        ):(
                            <Trending />
                        )}                 
                    {isLogin && <FavList />}
                </>
            }
            <List />
        </main>
    );

}

export default Home;