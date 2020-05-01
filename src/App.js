import React from 'react';
// import Charts from './components/charts';
import Sider from './components/AppMenu';

//mobx store
import store from './store';
import {Provider} from 'mobx-react';

function App() {
    return (
        <Provider {...store}>
            <div className="App">
                <Sider/>
            </div>
        </Provider>

    );
}

export default App;
