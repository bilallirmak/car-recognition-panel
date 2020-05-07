import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import Chart from '../../components/charts';
import {Spin, Tabs} from "antd";
import StatCard from './StatCard';

const {TabPane} = Tabs;

const Makes = inject("SocketStore")(observer(({SocketStore, match}) => {

    let car = null
    if (SocketStore.data !== null) {
        car = SocketStore.data[0].files.find(item => item._id.make === match.params.key)
        console.log(car)

    }
    console.log(match.params.key)
    return (
        SocketStore.data !== null && car !== null ?

            <div>
                <div style={{
                    textAlign: 'center'
                }}
                >
                    <h2>{match.params.key}</h2>
                </div>


                <div
                >
                    <StatCard
                        car={car}
                    />
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: 'center',
                    margin: 20,
                    flexDirection: "row"
                }}>

                    <Tabs
                        defaultActiveKey="1" animated={false}
                        tabBarStyle={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
                        <TabPane tab="Model Sayıları" key="1">
                            <Chart
                                type='bar'
                                option='model_numbers'
                                title="Model sayıları"
                                amount={match.params.key}
                                car={car}
                            />
                        </TabPane>
                        <TabPane tab="Renk Dağılımı" key="2">
                            <Chart
                                type='pie'
                                option='color_numbers'
                                title="Renk Dağılımı"
                                amount={match.params.key}
                                hole={.4}
                                car={car}
                            />
                        </TabPane>
                        <TabPane tab="Şehir Dağılımı" key="3">
                            <Chart
                                type='pie'
                                option='license_plate_numbers'
                                title="Şehir Dağılımı"
                                amount={match.params.key}
                                hole={.4}
                                car={car}
                            />
                        </TabPane>
                    </Tabs>
                </div>


            </div> :
            <div>
                <Spin/>
            </div>
    )
}))


export default Makes