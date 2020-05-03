import React from 'react';
import AppRouter from './Router';

//mobx store
import store from './store';
import {Provider} from 'mobx-react';

// const {Content} = Layout;

function App() {
    return (
        <Provider {...store}>
            <AppRouter/>
        </Provider>

    );
}

export default App;
