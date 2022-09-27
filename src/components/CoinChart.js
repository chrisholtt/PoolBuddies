import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const CoinChart = ({chartData, tokenFrom}) => {

    
    const options = {
        title: {
            text: 'Stock Value over Time',
            style: {
                color: '#345267'
            }
            },
        chart: {
            spacing: [20, 50, 30, 50],
        },
        scrollbar: {
            enabled: false
        },
        navigator: {
            enabled: false
        },
        legend: {
            enabled: true,
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'middle',
            padding: 40
        },
        // plotOptions: undefined,
        series: [
        {
            data: chartData,
            name: `${tokenFrom.symbol}`,

        }
        ]
    };
  return (
    <div className='coin-chart'>
    {tokenFrom ?
        <HighchartsReact
            highcharts={Highcharts} 
            constructorType={'stockChart'}
            options={options}
            /> 
        : <div>"Null" </div>}
        </div>
  )
}

export default CoinChart;