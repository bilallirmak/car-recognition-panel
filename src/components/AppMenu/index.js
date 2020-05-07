import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Menu, Spin} from 'antd';
import {AppstoreOutlined} from '@ant-design/icons';

import {inject, observer} from "mobx-react";

const {SubMenu} = Menu;

@inject('SocketStore')
@observer
class Sider extends Component {
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub2'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    async componentDidMount() {
        const {SocketStore} = this.props
        await SocketStore.connect()

    }

    render() {
        const {SocketStore} = this.props
        return (
            SocketStore.data === null ? <Spin/> :
                <Menu
                    onClick={({key}) => {
                        SocketStore.route(key, this.props.history)
                    }}
                    defaultSelectedKeys={localStorage.hasOwnProperty('key') ? [localStorage.getItem('key')] : ['1']}
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{width: 256, margin: 50}}
                >
                    <Menu.Item key="1">
                        Genel
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<AppstoreOutlined/>} title="Markalar">
                        {
                            SocketStore.data[0].files.map((item, key) => {
                                return <Menu.Item key={item._id.make}>
                                    {item._id.make}
                                </Menu.Item>
                            })
                        }
                    </SubMenu>

                </Menu>
        );
    }
}

export default withRouter(Sider)