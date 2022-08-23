import { useContext } from 'react';
import DataContext from '../context/DataContext';
import {Link} from 'react-router-dom';


const Mover = () => {
    const {moverList} = useContext(DataContext);

    
    return(
        <div className='Mover'>
            <h2 className="Mover_title">Daily Movers</h2>
            <div className="MoverBar">
                {
                    moverList.map((item) => (
                        <section className="MoverBox" key={`mover${item.id}`}>
                            <Link style={{textDecoration: "none", color: "black"}}to={`/${item.id}`}>
                                <img src={item.image} />
                                <p>{item.id.toUpperCase()}</p>
                            </Link>
                            <p>({item.symbol.toUpperCase()})</p>
                            <p className={item.price_change_percentage_24h >= 0? "Price_Plus" : "Price_Minus"}>
                                {item.price_change_percentage_24h}% {item.price_change_percentage_24h >= 0? "Up" : "Down"}
                                </p>
                        </section>
                    ))
                }
            </div>
        </div>

    );
}

export default Mover;