import { FC, ReactNode, useRef, useState } from "react"
interface CardSelectedProps{
    price?: String
    children?: ReactNode
    ClassName? : string
}
const CardSelected: FC<CardSelectedProps> =({children, price, ClassName})=>{
    const inputRef = useRef<HTMLInputElement|null>(null)
    const [myValue, setMyValue] = useState<string>("0")
    const [CantidadComprado, setCantidadComprado] = useState<Number>()
    const handleClick = () => {
        setMyValue(inputRef.current!.value)
    }
    
    return(
        <div className={` ${ClassName}`}>
            {children}
            <input type="number" className="text-black px-3 py-1" ref={inputRef}/>
            <button onClick={()=>handleClick()}>Comprar</button>
            <p>
                Diferencia<br/>{}
            </p>
        </div>
    )
}
export default CardSelected