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
            borderRadius: 40,
            backgroundColor: '#FAF3DD',
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
        {
            data: chartData,
            name: `${tokenFrom} ($)`,

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
    box-shadow: 0 0 16px grey;
    background-color: #f5f0da;
    right: 38%;
    top: 22%;
    border-radius: 4rem;
`

export default CoinChart;