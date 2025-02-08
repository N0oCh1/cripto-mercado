import { FC, ReactNode, useRef, useState } from "react"
interface CardSelectedProps{
    price: String
    children?: ReactNode
    ClassName? : string
}
type stateType = {
    price: string
    quantity: string
}[]

const CardSelected: FC<CardSelectedProps> =({children, price, ClassName})=>{
    const inputRef = useRef<HTMLInputElement|null>(null)
    const [myValue, setMyValue] = useState<string>("0")
    const [CantidadComprado, setCantidadComprado] = useState<stateType>([])
    const handleClick = () => {
        if(inputRef.current?.value !== undefined){
            setCantidadComprado([...CantidadComprado, {
                price: (Number(price) * Number(inputRef.current.value)).toString(),
                quantity: inputRef.current.value
            }])
        }
    }
    
    return(
        <div className={`${ClassName}`}>
            {children}
            <input type="number" className="text-black px-3 py-1" ref={inputRef}/>
            <button onClick={()=>handleClick()} className="border-2 border-white py-1 px-6">Comprar</button>
            <p>
                Diferencia
            </p>
            {CantidadComprado && (
            <div className="flex flex-row gap-6 justify-center flex-wrap w-3/4 items-center">
                {CantidadComprado.map((d, index)=>{
                    return(
                        <div key= {index} className="flex flex-col gap-2 border-2 border-white p-6 relative">
                            <button className="right-1 top-1 w-max absolute" onClick={()=>setCantidadComprado(e=>e.filter(item=>item.price!==d.price))}>X</button>
                            <div className="border-2 border-white">
                                <p>Cantidad</p>
                                <p>{d.quantity}</p>
                            </div>
                            <div className="border-2 border-white">
                                <p>Precio de compra</p>
                                <p>{d.price}</p>
                            </div>
                            <div className="border-2 border-white">
                                <p>Precio del Activo</p>
                                <p>{(Number(d.quantity) * Number(price))}</p>
                            </div>
                            <div className="border-2 border-white">
                                <p>Ganancias</p>
                                <p>{Number(d.price) - Number(d.quantity) * Number(price)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>)
            }
        </div>
    )
}
export default CardSelected