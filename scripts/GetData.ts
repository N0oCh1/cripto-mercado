import { z } from "zod"

async function ObtenerNombreCrip() {
    const urlAPI = "https://data-api.binance.vision/api/v3/ticker/price"
    return await fetch(urlAPI).then(res=>res.json()).then(data=>{
        if(Number(data.price) === 0.0){
            return
        }
        return data
    })
}
export default ObtenerNombreCrip