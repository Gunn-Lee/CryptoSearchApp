import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const API_USERS = "http://localhost:3500/users";
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [trending, setTrending] = useState([]);
    const [loginUser, setLoginUser] = useState({});
    const [userID, setUserID] = useState("");
    const [userPWD, setUserPWD] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [favList, setFavList] = useState([]);
    const [moverList, setMoverList] = useState([]);
    const [isMover, setIsMover] = useState(false);

    useEffect(() => {
        //Login!
        const fetchDb = async () => {
            try{
                const response = await fetch(API_USERS);
                if (!response.ok) throw Error('Did not receive USER data');
                const listUsers = await response.json();
                setUsersList(listUsers);
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchDb();
    },[])
  
    useEffect( () => {
      const fetchList = async () => {
        try {
          const responseItems  = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h');
          if (!responseItems.ok) throw Error('Did not receive List data');
          const listItems = await responseItems.json();
          setItems(listItems);
          var m = listItems.sort((a,b) => Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h));
          setMoverList(m.splice(0,10));
          const responseTrending  = await fetch('https://api.coingecko.com/api/v3/search/trending');
          if (!responseTrending.ok) throw Error('Did not receive Trending data');
          const listTrending = await responseTrending.json();
          setTrending(listTrending.coins);
        } catch (err) {
          if(err.response) {
          //if no 200 response
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.message);
          } else {
          //if 404 or no response
            console.log(`Error : ${err.message}`);
          }
        } finally {
          setIsLoading(false);
        }
      } 
      setTimeout(() => fetchList(), 1000);
    },[])
  
    useEffect(()=>{
      const filteredResults = items.filter((item) =>
        ((item.name).toLowerCase()).includes(search.toLowerCase())
        || ((item.symbol).toLowerCase()).includes(search.toLowerCase()));
      setSearchResult(filteredResults);
  
    },[items, search])
  
    useEffect( () => {
      let favArr = loginUser.fav;
      const listItems = [];
      
        setFavList(listItems);
      if(isLogin) {
        favArr.forEach((favItem) => {
          let temp = items.filter((item) => (favItem.toLowerCase() === item.symbol.toLowerCase()))
          listItems.push(temp[0]);
        });
        setFavList(listItems);
      }
    },[loginUser])

    const patchFav = async (newPatch) => {
      const id = loginUser.id;
      console.log(loginUser.fav);
      try{
        const response = await axios.put(`users/${id}`, newPatch);
      } catch (err) {
        if(err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.message);
          } else {
            console.log(`Error : ${err.message}`);
          }
      }
    }
  
    const AddFav = (symbol) => {
      const favArr = loginUser.fav;
      const sameArr = favArr.filter((item) => item === symbol);
      const newPatch = {...loginUser, fav: favArr};
  
      if(sameArr.length === 0) {
        favArr.push(symbol);
        setLoginUser({...loginUser, fav: favArr});
        patchFav(newPatch);
      } else {
        alert("Already in the list!");
      }
    }
  
    const DeleteFav = async (symbol) => {
      const favArr = loginUser.fav.filter((item) => item !== symbol);
      const newPatch = {...loginUser, fav: favArr};
      setLoginUser({...loginUser, fav: favArr});
      patchFav(newPatch);
    }

    const handleLogin = async (e) => {
        for(let i = 0; i < usersList.length; i++) {
            if(usersList[i].user === userID && usersList[i].pwd === userPWD) {
                let temp = {...usersList[i]};
                setLoginUser(temp);
                setIsLogin(true);
                alert(`${temp.user} Logged In!`)
                navigate('/');
            }
        }
        if(isLogin) {
            setUserID('');
            setUserPWD('');
        } else {
            alert('INVALID ID/ PassWord');
        }
    }

    

    return (
        <DataContext.Provider value ={{
            navigate, usersList, setUsersList, setIsLogin, setLoginUser, isLogin, loginUser, search, setSearch, favList, DeleteFav, AddFav, searchResult, isLoading,
            trending, setTrending, API_USERS, userID, userPWD, setUserID, setUserPWD, handleLogin, items, moverList, setMoverList, isMover, setIsMover
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;