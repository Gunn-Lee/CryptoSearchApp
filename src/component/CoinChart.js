import {useState} from 'react';
import {Line} from 'react-chartjs-2';


const CoinChart = ({xChart, yChart}) => {


  const [chartData, setChartData] = useState({
    labels: xChart,
    datasets: [
      {
        label: 'Price for last 24 hours (USD)',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: yChart
      }
    ]
  });

  return (
    <Line data={chartData} />
  );

}



export default CoinChart;