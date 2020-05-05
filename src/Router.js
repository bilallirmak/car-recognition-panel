import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import history from "./history";

import Homepage from './pages/Homepage';
import Makes from './pages/Makes';
import AppMenu from "./components/AppMenu";
import AppStatistics from './components/AppStatistics';

import {Col, Row} from "antd";


// import {inject, observer} from "mobx-react";

// @inject("AuthStore")
// @observer
class AppRouter extends Component {
    render() {
        return (
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
            </Router>
        );
    }
}

export default AppRouter