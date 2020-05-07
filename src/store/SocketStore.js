import {action, configure, observable, runInAction, computed} from "mobx";
import io from "socket.io-client";
import axios from 'axios';
import {API_BASE} from '../constants';
import provinces from '../provinces';


configure({
    enforceActions: "observed"
});

class SocketStore {
    @observable socket = io.connect(`${API_BASE}/test`);
    @observable data = null;
    @observable x = null;
    @observable y = null;
    @observable car = null;


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


    @action
    async route(key, history) {
        await localStorage.setItem('key', key)
        if (key === '1') {
            history.push('/')

        } else {
            history.push('/' + key)

        }

    }

    options = {
        make_numbers: () => {
            let x = []
            let y = []
            for (let i = 0; i < this.data[0].files.length; i++) {
                x.push(this.data[0].files[i]._id.make)
                y.push(this.data[0].files[i].total_car)
            }

            return {x, y}
        },
        model_numbers: (amount, car) => {
            let x = []
            let y = []
            if (amount === 'all') {
                let flat_models = this.data[0].models.flat()
                let flat_models_set = new Set(flat_models)
                let flat_models_set_array = [...flat_models_set]
                for (let i = 0; i < flat_models_set_array.length; i++) {
                    const filter_flat_models = flat_models.filter(item => item === flat_models_set_array[i])
                    const make_obj = this.data[0].files.find(item => item.models.includes(flat_models_set_array[i]))
                    x.push(flat_models_set_array[i] + "(" + make_obj._id.make + ")")
                    y.push(filter_flat_models.length)
                }

            } else {
                // const car = this.data[0].files.find(item => item._id.make === amount)
                let models_set = new Set(car.models)
                let models_set_array = [...models_set]
                console.log(models_set_array, "sta")
                for (let i = 0; i < models_set_array.length; i++) {
                    const filter_models = car.models.filter(item => item === models_set_array[i])
                    x.push(models_set_array[i])
                    y.push(filter_models.length)


                }
            }

            return {x, y}
        },

        color_numbers: (amount, car) => {
            let x = []
            let y = []
            if (amount === 'all') {
                let flat_colors = this.data[0].colors.flat()
                let flat_colors_set = new Set(flat_colors)
                let flat_colors_set_array = [...flat_colors_set]
                for (let i = 0; i < flat_colors_set_array.length; i++) {
                    const filter_flat_colors = flat_colors.filter(item => item === flat_colors_set_array[i])
                    // const make_obj = this.data[0].files.find(item => item.models.includes(flat_colors_set_array[i]))
                    y.push(flat_colors_set_array[i])
                    x.push(filter_flat_colors.length)
                }
            } else {
                let colors_set = new Set(car.colors)
                let colors_set_array = [...colors_set]

                for (let i = 0; i < colors_set_array.length; i++) {
                    const filter_models = car.colors.filter(item => item === colors_set_array[i])
                    y.push(colors_set_array[i])
                    x.push(filter_models.length)
                }
            }


            return {x, y}
        },
        license_plate_numbers: (amount, car) => {
            let x = []
            let y = []
            if (amount === 'all') {
                let flat_license_plates = this.data[0].license_plates.flat()
                let flat_license_plates_set = new Set(flat_license_plates)
                let flat_license_plates_set_array = [...flat_license_plates_set]
                for (let i = 0; i < flat_license_plates_set_array.length; i++) {
                    const filter_flat_license_plates = flat_license_plates.filter(item => item === flat_license_plates_set_array[i])
                    y.push(provinces[flat_license_plates_set_array[i]])
                    x.push(filter_flat_license_plates.length)
                }
            } else {
                let license_plates_set = new Set(car.license_plates)
                let license_plates_set_array = [...license_plates_set]

                for (let i = 0; i < license_plates_set_array.length; i++) {
                    const filter_license_plates = car.license_plates.filter(item => item === license_plates_set_array[i])
                    y.push(provinces[license_plates_set_array[i]])
                    x.push(filter_license_plates.length)
                }
            }

            return {x, y}
        },


    }


}

export default new SocketStore();