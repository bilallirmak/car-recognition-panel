import React, {Component} from 'react';
// import AppStatistics from "../../components/AppStatistics";

import {Row, Col, Spin, Tabs} from 'antd';
import Chart from '../../components/charts';
import {inject, observer} from "mobx-react";

const {TabPane} = Tabs;

@inject('SocketStore')
@observer
class Homepage extends Component {
    render() {
        const {SocketStore} = this.props
        return (
            SocketStore.data !== null ?
                <div style={{flex: 1, display: "flex", justifyContent: "center", flexDirection: "row"}}>
                    <Tabs defaultActiveKey="1" animated={false}
                          tabBarStyle={{display: "flex", justifyContent: "center", flexDirection: "row"}}
                        // style={{flex: 1, display: "flex", justifyContent: "center", flexDirection: "row"}}
                    >
                        <TabPane tab="Araba Sayıları" key="1">
                            <Chart
                                option='make_numbers'
                                title="Araba Sayıları"
                            />
                        </TabPane>
                        <TabPane tab="Model Sayıları" key="2">
                            <Chart
                                option='model_numbers'
                                title="Model Sayıları"
                            />
                        </TabPane>
                    </Tabs>
                </div>


                :
                <div>
                    <Spin/>
                </div>

            // // <Row>
            // {/*<Col span={12}>*/}
            // {/*    <Chart*/}
            // {/*        option='make_numbers'*/}
            // {/*        title="Araba Sayıları"*/}
            // {/*    />*/}
            // {/*</Col>*/}
            // {/*<Col span={12}>*/}
            // {/*    <Chart*/}
            // {/*        option='model_numbers'*/}
            // {/*        title="Model Sayıları"*/}
            // {/*    />*/}
            // {/*</Col>*/}
            // // </Row>


        );
    }
}

export default Homepage