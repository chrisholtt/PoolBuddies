import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import styled from 'styled-components'

const CoinChart = ({chartData, tokenFrom}) => {

    const options = {
        rangeSelector:{
            enabled:false
        },
        title: {
            text: `${tokenFrom} Value last 24HRs`,
            style: {
                color: '#345267',
                fontFamily: 'Roboto Mono'
            }
            },
        chart: {
            spacing: [20, 50, 30, 50],
            height: 500,
            width: 800,
            borderRadius: 25,
            backgroundColor: '#c5a7ec',
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
            padding: 0
        },
        // plotOptions: undefined,
        series: [
        {   color: '#f8f599',
            data: chartData,
            name: `${tokenFrom} ($)`

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
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    right: 38%;
    top: 22%;
    border-radius: 4rem;
`

export default CoinChart;