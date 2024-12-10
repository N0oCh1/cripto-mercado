import { ButtonHTMLAttributes, FC } from "react";
import { z } from "zod";


interface props extends ButtonHTMLAttributes<HTMLButtonElement>{
    symbol?: string
    price?: string
}

const CardCrip: FC<props> = ({symbol, price, ...props}) => {
    return(
        <button className="flex flex-col bg-black text-white p-3 rounded-xl" {...props}>
            <p>
                {symbol}
            </p>
            <p>
                {price}
            </p>
        </button>
    )
}
export default CardCrip;