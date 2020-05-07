import React, {Component} from 'react';
import {Spin} from 'antd';

import Plot from 'react-plotly.js';
import {inject, observer} from "mobx-react";

@inject('SocketStore')
@observer
class Charts extends Component {


    render() {
        const {SocketStore, title, type, hole, option, amount, car} = this.props
        const {x, y} = SocketStore.options[option](amount, car)

        return (
            SocketStore.data === null ?
                <Spin/> :
                <Plot
                    data={[
                        {
                            x, y,
                            values: x,
                            labels: y,
                            hole,
                            type,
                            width: 0.7,
                            mode: 'lines+markers',
                            textposition: 'top center',
                            marker: {
                                color: 'rgb(158,202,225)',
                                colors: y,
                                opacity: 0.6,
                                line: {
                                    color: 'rgb(8,48,107)',
                                    width: 1.5
                                }
                            },

                        },
                    ]}
                    layout={{
                        // width: 650, height: 500,
                        title,
                        xaxis: {
                            autotick: true,
                            tickwidth: 1,
                            dtick: 1,
                        },
                        yaxis: {
                            autotick: false,
                            tickwidth: 1,
                            dtick: 1,
                            zeroline: false,
                        },
                        bargap: 0.10,

                        annotations: [{
                            font: {
                                size: 15
                            },
                            showarrow: false,
                            text: type === 'pie' ? new Date().toLocaleDateString() : '',
                            x: 0.5,
                            y: 0.5
                        }]
                    }}
                    config={{
                        displayModeBar: false,
                        // responsive: true,
                    }}

                />

        );
    }
}

export default Charts