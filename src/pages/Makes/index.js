import React from 'react';
import {inject, observer} from 'mobx-react';


const Makes = inject("SocketStore")(observer(({SocketStore, match}) =>{
    return(
        <div>
            {match.params.key}
        </div>
    )
}))


export default Makes