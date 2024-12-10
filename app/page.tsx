'use client'
import  ObtenerNombreCrip  from "@/scripts/GetData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function Home() {
  const [outset, setOutset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);

  const dataSchema = z.array(z.object({
    symbol: z.string(),
    price: z.string()
  }))
  type DataType = z.infer<typeof dataSchema>
  const [apiData, setApiData] = useState<DataType>()
  
  useEffect(()=>{
    async function fetch() {
      setApiData(await ObtenerNombreCrip())
    }
    fetch()
    const intervalID = setInterval(fetch, 5000)
    return () => clearInterval(intervalID)
  },[])

  return (
    <main className="flex justify-center p-20">
      <div className="bg-white rounded-xl p-10 text-black w-[50%] min-w-96 flex flex-row flex-wrap gap-5">
        {apiData && (apiData.slice(outset, limit).map((currency, index)=>{
          return(
            <div className="flex flex-col bg-black text-white p-3 rounded-xl" key={index}>
              <p>{currency.symbol}</p>
              <p>{currency.price}</p>
            </div>
          )
        }))}
      </div>
    </main>
  );
}
