import {action, configure, observable, runInAction} from "mobx";
import io from "socket.io-client";
import axios from 'axios';


configure({
    enforceActions: "observed"
});

class SocketStore {
    @observable socket = io.connect('http://192.168.1.102:5555/test');
    @observable data = [];


    @action
    async connect() {
        await this.get_data()
        this.socket.on('data', data => {
            runInAction(() => {
                this.data = this.data.concat(...data)
                console.log(this.data)
            });
        });

    }

    @action
    async get_data() {
        const {data} = await axios.get('http://192.168.1.102:5555/get-data')
        console.log(data)
        runInAction(() => {
            this.data = data.cars
        })


    }


}

export default new SocketStore();