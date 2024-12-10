'use client'
import CardCrip from "@/components/CardCrip";
import CardSelected from "@/components/CardSelected";
import  ObtenerNombreCrip  from "@/scripts/GetData";
import { useEffect, useState } from "react";
import { symbol, z } from "zod";

export default function Home() {
  const [outset, setOutset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);
  

  const dataSchema = z.array(z.object({
    symbol: z.string(),
    price: z.string()
  }))
  type DataType = z.infer<typeof dataSchema>
  const [apiData, setApiData] = useState<DataType>()

  // Variable para capturar la moneda seleccionada
  const [cardSelected, setCardSelected] = useState<DataType>([])
  useEffect(()=>{
    async function fetch() {
      setApiData(await ObtenerNombreCrip())
    }
    fetch()
    const intervalID = setInterval(fetch, 5000)
    return () => clearInterval(intervalID)
  },[])
  return (
    <main className="flex justify-center p-20 flex-col items-center ">
      <div className="bg-white rounded-xl p-10 text-black w-[70vw] min-w-96 flex flex-row flex-wrap gap-5 h-[50vh] overflow-y-scroll">
        {apiData && (apiData.slice(outset, limit).map((currency, index)=>{
          return(
            <CardCrip key={index} symbol={currency.symbol} price={currency.price}
            onClick={()=>{
              setCardSelected([...cardSelected, {symbol: currency.symbol, price:currency.price}])
            }}
            />
          )
        }))}
      </div>
      <div className="flex flex-row justify-center gap-6">
          <button className="px-5 bg-white text-black" onClick={()=>{
            if(outset !== 0){
              setOutset(outset-50);
              setLimit(limit-50)
            }
          }}>-50</button>
          <button className="px-5 bg-white text-black" onClick={()=>{
            if(apiData!.slice(outset, limit).length === 50){
              setOutset(outset+50);
              setLimit(limit+50)
            }
            }}>+50</button>
        </div>
        <div className="flex flex-col justify-center gap-4">
            {cardSelected && (cardSelected.map((d, index)=> {
              const dataSelected = apiData?.find(v=>v.symbol === d.symbol)
              return(
                <CardSelected key={index}>
                  <p>{dataSelected?.symbol}</p>
                  <p>{dataSelected?.price}</p>
                </CardSelected>
              )
            }
            ))}
        </div>
    </main>
  );
}
