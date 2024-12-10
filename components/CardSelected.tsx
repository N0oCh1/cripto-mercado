import { FC, ReactNode } from "react"


interface CardSelectedProps{
    children?: ReactNode
}
const CardSelected: FC<CardSelectedProps> =({children})=>{
    return(
        <div className="flex flex-col px-4 border-white border-2 rounded-xl">
            {children}
        </div>
    )
}
export default CardSelected