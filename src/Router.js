import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import history from "./history";
import {Spin, Col, Row} from "antd";

import Homepage from './pages/Homepage';
import Makes from './pages/Makes';
import AppMenu from "./components/AppMenu";
import AppStatistics from './components/AppStatistics';
import AppHeader from './components/AppHeader';


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
                    <AppHeader/>
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
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: 'center',
                    border: '1px solid red'
                }}>
                    <h1 style={{position: 'absolute', top: 130, fontSize: 70, fontFamily: 'Arial'}}>
                        AKILLI VERİ TOPLAMA - PANEL
                    </h1>
                    <Spin size={'large'}/>
                </div>
        );
    }
}

export default AppRouter