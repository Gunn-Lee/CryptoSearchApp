import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import CoinChart from './CoinChart';
import {Chart as ChartJS} from "chart.js/auto";
import Header from './Header';
import axios from '../api/axios';

const CoinInfo  = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState({});
    const [prices, setPrices] = useState([]);
    const [xChart, setXChart] = useState([]);
    const [yChart, setYchart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=> {
        const fetchCoinInfo = async () => {
            const API_coin = `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;
            const API_price = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`;
            
    
            try{
                const response = await axios.get(API_coin);
                const response2 = await axios.get(API_price);
                setCoin(response.data);
                setXChart(response2.data.prices.map((arr) => new Date(arr[0]).toLocaleTimeString()));
                setYchart(response2.data.prices.map((arr) => parseFloat(arr[1])));
            } catch(err) {
                if(err.response || err.response2) {
                  console.log(err.response.data || err.response2.data);
                  console.log(err.response.status || err.response2.status);
                  console.log(err.response.message || err.response2.message);
                } else {
                  console.log(`Error : ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchCoinInfo();

    },[]);
    

    return(
        <main className='CoinInfo'>
            <Header />
                <div className='CoinInfoContainer'>
                    {loading && 
                        <p className='loading'>Loading...</p>
                    }
                    {!loading && yChart.length !== 0 && (
                        <>
                            <h2>{coin.id.toUpperCase()} Information</h2>
                            <p>Code: {coin.symbol.toUpperCase()}</p>
                            <CoinChart 
                                prices={prices} 
                                xChart={xChart}
                                yChart={yChart}
                            />
                            <p>24H High : <span style={{color: "green"}}>${Math.max(...yChart).toFixed(3)}</span></p>
                            <p>24H Low : <span style={{color: "red"}}>${Math.min(...yChart).toFixed(3)}</span></p>
                        </>
                    )}
                    {!loading && yChart.length === 0 &&
                        <p>Unable to fatch API!</p>
                    }
                    <p> <Link to='/'>Back to home </Link></p>
                </div>

        </main>
    );
}

export default CoinInfo;