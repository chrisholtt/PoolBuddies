import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import styled from 'styled-components'

const CoinChart = ({chartData, tokenFrom}) => {

    const options = {
        title: {
            text: 'Coin Value over Time',
            style: {
                color: '#345267'
            }
            },
        chart: {
            spacing: [20, 50, 30, 50],
            height: 500,
            width: 800,
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
            padding: 10
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
    <Wrapper>
        <HighchartsReact
            highcharts={Highcharts} 
            constructorType={'stockChart'}
            options={options}
            /> 
    </Wrapper>
  )
}

const Wrapper = styled.div`
    position: absolute;
    border: grey 1px solid;
    box-shadow: 0 0 16px grey;
    background-color: #f5f0da;
    right: 38%;
    top: 16.3%;
    border-radius: 2rem;
`

export default CoinChart;