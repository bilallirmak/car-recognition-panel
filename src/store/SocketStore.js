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
    @observable x = null;
    @observable y = null;


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
        runInAction(() => {
            this.data = data.cars
        })
        // await this.dataEditing()
    }

    @action
    async dataEditing(option) {

        // this.options[option]()
        let x = []
        let y = []
        for (let i = 0; i < this.data[0].files.length; i++) {
            x.push(this.data[0].files[i]._id.make)
            y.push(this.data[0].files[i].total_car)
        }
        this.x_car_numbers = x
        this.y_car_numbers = y

    }

    options = {
        make_numbers: () => {

            let x = []
            let y = []
            for (let i = 0; i < this.data[0].files.length; i++) {
                x.push(this.data[0].files[i]._id.make)
                y.push(this.data[0].files[i].total_car)
            }
            // runInAction(() => {
            //     this.x = x
            //     this.y = y
            // })

            return {x, y}
        },
        model_numbers: () => {
            let x = []
            let y = []
            let flat_models = this.data[0].models.flat()
            let flat_models_set = new Set(flat_models)
            let flat_models_set_array = [...flat_models_set]
            for (let i = 0; i < flat_models_set_array.length; i++) {
                const filter_flat_models = flat_models.filter(item => item === flat_models_set_array[i])
                const make_obj = this.data[0].files.find(item => item.models.includes(flat_models_set_array[i]))
                console.log(make_obj, "make_obj")
                x.push(flat_models_set_array[i]+"("+make_obj._id.make+")")
                y.push(filter_flat_models.length)
            }
            // runInAction(() => {
            //     this.x = x
            //     this.y = y
            // })
            return {x, y}
        }

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