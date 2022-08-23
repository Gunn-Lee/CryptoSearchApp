import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';

const FavList  = () => {

    const {DeleteFav, favList} = useContext(DataContext);
    
    return(
        <div className="FavList">
            <h2>Favorites</h2>
            {favList.length !== 0 ? (
                <>
                    <table>
                        <tbody>
                            {favList.map( (item) => (
                                <tr key={item.id+100000}>
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
                                            <span className={item.price_change_24h >= 0? "Price_Plus" : "Price_Minus"}>{item.price_change_percentage_24h.toFixed(2)}</span>
                                            %)
                                        </span>
                                    </td>
                                    <td>
                                        <p onClick={() => DeleteFav(item.symbol)}>-</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>Empty</p>
            )}
        </div>
    );
}

export default FavList;