import {action, configure, observable, runInAction} from "mobx";
import io from "socket.io-client";
import axios from 'axios';
import {API_BASE} from '../constants';


configure({
    enforceActions: "observed"
});

class SocketStore {
    @observable socket = io.connect(`${API_BASE}/test`);
    @observable data = null;


    @action
    async connect() {
        await this.get_data()
        this.socket.on('data', data => {
            this.get_data()
            // runInAction(() => {
            //     this.data = this.data.concat(...data)
            //     console.log(this.data)
            // });
        });

    }

    @action
    async get_data() {
        const {data} = await axios.get(`${API_BASE}/stat`)
        console.log(data)
        runInAction(() => {
            this.data = data.cars
        })


    }

    @action
    async route(key, history) {
        await localStorage.setItem('key', key)
        if (key === '1') {
            history.push('/')

        } else {
            history.push('/' + key)
        }

        runInAction(() => {
        })


    }


}

export default new SocketStore();