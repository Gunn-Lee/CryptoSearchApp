import {Link} from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import { faBorderNone } from '@fortawesome/free-solid-svg-icons';

const List = () => {
    const {isLogin, AddFav, searchResult, isLoading}  = useContext(DataContext);

    return(
        <main className="List">
            {!isLoading && searchResult.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Market Cap</th>
                            <th>Current Price</th>
                            <th>Price Change</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult.map( (item) => (                        
                                <tr key={item.id}>
                                    <td className="List_title">
                                        <Link style={{textDecoration: "none", color: "black"}}to={`/${item.id}`}>
                                            <img className="CoinLogo" src={item.image} />
                                            {item.name}
                                        </Link>
                                    </td>
                                    
                                    <td>{item.symbol.toUpperCase()}</td>
                                    <td>${item.market_cap.toLocaleString()}</td>
                                    <td>${item.current_price.toLocaleString()}</td>
                                    <td>
                                        <span> $
                                            <span className={item.price_change_24h >= 0? "Price_Plus" : "Price_Minus"}>{item.price_change_24h.toFixed(3)}</span> 
                                            / 
                                        </span>
                                        <span>(
                                            <span className={item.price_change_percentage_24h >= 0? "Price_Plus" : "Price_Minus"}>{item.price_change_percentage_24h.toFixed(2)}</span>
                                            %)
                                        </span>
                                    </td>
                                    {isLogin && 
                                        <td>
                                            <p onClick={() => AddFav(item.symbol)}>+</p>
                                        </td>
                                    }
                                </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!isLoading && searchResult.length === 0 &&
                <p>Data could not be loaded</p>
            }
            {isLoading && 
                <p className='loading'>Loading...</p>
            }
        </main>

    );
}

export default List;