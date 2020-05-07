import React from "react";
// import {inject, observer} from "mobx-react";
import {Card, Statistic} from "antd";

const StatCard = ({value, title, car}) => {
    const statDiv = {
        paddingLeft: 20, paddingRight: 20
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: 'center',
                margin: 20,
                flexDirection: "row"
            }}
        >
            <Card>
                <div style={statDiv}>
                    <Statistic
                        style={{
                            textAlign: "center",
                        }}
                        title={"Toplam araba sayısı"}
                        value={car.total_car}
                    />
                </div>
            </Card>
            <Card>
                <div style={statDiv}>
                    <Statistic
                        style={{
                            textAlign: "center",
                        }}
                        title={"Farklı model sayısı"}
                        value={new Set(car.models).size}
                    />
                </div>
            </Card>
            <Card>
                <div style={statDiv}>
                    <Statistic
                        style={{
                            textAlign: "center",
                        }}
                        title={"Toplam renk sayısı"}
                        value={new Set(car.colors).size}
                    />
                </div>
            </Card>
            <Card>
                <div style={statDiv}>
                    <Statistic
                        style={{
                            textAlign: "center",
                        }}
                        title={"Toplam şehir sayısı"}
                        value={new Set(car.license_plates).size}
                    />
                </div>
            </Card>


        </div>
    )
}


export default StatCard