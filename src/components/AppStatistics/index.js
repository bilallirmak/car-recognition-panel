import React, {Component} from 'react';
import {Statistic, Card, Spin } from 'antd';
import {inject, observer} from "mobx-react";

@inject('SocketStore')
@observer
class AppStatistics extends Component {
    render() {
        const {SocketStore} = this.props
        const statDiv = {
            paddingLeft: 20, paddingRight: 20
        };

        return (
            SocketStore.data === null ? <Spin/>:
                <div style={{
                display: "flex",
                justifyContent: 'center',
                margin: 20,
            }}>
                <Card>
                    <div style={statDiv}>
                        <Statistic
                            style={{
                                textAlign: "center",
                            }}
                            title="Toplam araba sayısı" value={SocketStore.data[0].total_car_number}

                        />
                    </div>
                </Card>
                <Card>


                    <div style={statDiv}>
                        <Statistic
                            style={{
                                textAlign: "center",

                            }}
                            title="Farklı marka sayısı" value={SocketStore.data[0].files.length}

                        />
                    </div>
                </Card>
                <Card>

                    <div style={statDiv}>
                        <Statistic
                            style={{
                                textAlign: "center",

                            }}
                            title="Farklı model sayısı" value={SocketStore.data[0].models.length}

                        />
                    </div>
                </Card>
                <Card>


                <div style={statDiv}>
                    <Statistic
                        style={{
                            textAlign: "center",

                        }}
                        title="Farklı renk sayısı" value={SocketStore.data[0].colors.length}

                    />
                </div>
                </Card>
            </div>

        );
    }

}

export default AppStatistics