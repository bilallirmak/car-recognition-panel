import React, {Component} from 'react';

import Plot from 'react-plotly.js';
import {inject, observer} from "mobx-react";

@inject('SocketStore')
@observer
class Charts extends Component {


    render() {
        console.log(this.props.SocketStore.data)
        return (
            <div>
                <Plot
                    data={[
                        {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'bar',
                            mode: 'lines+markers',
                            textposition: 'top center',
                            marker: {color: 'blue'},
                        },
                    ]}
                    layout={{
                        title: 'PLOT',
                        xaxis: {
                            autotick: false,
                            tickwidth: 1,
                            dtick: 1,
                        },
                    }}
                />
            </div>
        );
    }
}
export default Charts