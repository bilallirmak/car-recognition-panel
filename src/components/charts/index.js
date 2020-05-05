import React, {Component} from 'react';
import {Spin} from 'antd';

import Plot from 'react-plotly.js';
import {inject, observer} from "mobx-react";

@inject('SocketStore')
@observer
class Charts extends Component {
    state = {
        x: null,
        y: null
    }

    async componentDidMount() {
        const {SocketStore} = this.props
        console.log(this.props.type)
        // await SocketStore.dataEditing(this.props.type)
        const data_obj = SocketStore.options[this.props.option]()
        this.setState({
            x: data_obj.x,
            y: data_obj.y
        })
    }


    render() {
        const {SocketStore, title} = this.props
        const {x, y} = this.state
        return (
            SocketStore.data === null ?
                <Spin/> :
                <div>
                    <Plot
                        data={[
                            {
                                x,
                                y,
                                type: 'bar',
                                width: 0.7,
                                mode: 'lines+markers',
                                textposition: 'top center',
                                marker: {
                                    color: 'rgb(158,202,225)',
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
                            base: 0,
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
                            bargap: 0.10
                        }}
                        config={{
                            displayModeBar: false,
                            responsive: true
                        }}

                    />
                </div>
        );
    }
}

export default Charts