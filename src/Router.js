import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import history from "./history";
import {Spin} from "antd";

import Homepage from './pages/Homepage';
import Makes from './pages/Makes';
import AppMenu from "./components/AppMenu";
import AppStatistics from './components/AppStatistics';

import {Col, Row} from "antd";


import {inject, observer} from "mobx-react";

@inject("SocketStore")
@observer
class AppRouter extends Component {

    async componentDidMount() {
        const {SocketStore} = this.props
        await SocketStore.connect()

    }

    render() {
        const {SocketStore} = this.props
        return (
            SocketStore.data !== null ?
                <Router history={history}>
                    <Row>
                        <Col span={5}>
                            <AppMenu/>
                        </Col>
                        <Col span={18} style={{marginTop: 50, border: '1px solid green'}}>
                            <AppStatistics/>
                            <Switch>
                                <Route path="/" exact render={() => (<Homepage/>)}/>
                                {/*<Route path="/:key" exact render={() => (<Makes/>)}/>*/}
                                <Route path="/:key" exact component={Makes}/>
                            </Switch>
                        </Col>
                    </Row>
                </Router> :
                <div style={{
                    height: '100vh',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center',
                    border: '1px solid red'
                }}>
                    <Spin size={'large'}/>
                </div>
        );
    }
}

export default AppRouter