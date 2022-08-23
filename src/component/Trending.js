import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';

const Trending = () => {
    const {trending} = useContext(DataContext);

    return(
        <div className='Trending'>
            <h2 className="Trending_title">Popular Today</h2>
            <div className="TrendingBar">
                {
                    trending.map((item) => (
                        <section className="TrendingBox" key={`trending${item.item.id}`}>
                            <Link style={{textDecoration: "none", color: "black"}}to={`/${item.item.id}`}>
                                <img src={item.item.small} />
                            </Link>
                            <p>{item.item.id.toUpperCase()}</p>
                            <p>({item.item.symbol.toUpperCase()})</p>
                            <p>Market Cap Rank: {item.item.market_cap_rank}</p>
                        </section>
                    ))
                }
            </div>
        </div>

    );
}

export default Trending;