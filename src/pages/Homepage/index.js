import React, {Component} from 'react';
import AppStatistics from "../../components/AppStatistics";

// import {Row, Col} from 'antd';
// import Charts from '../../components/charts';

class Homepage extends Component {
    render() {
        return (
            <div>
                <AppStatistics/>
            </div>


            // <Row>
            //     <Col>
            //         <Charts/>
            //     </Col>
            //     <Col>
            //         <Charts/>
            //     </Col>
            // </Row>
        );
    }
}

export default Homepage