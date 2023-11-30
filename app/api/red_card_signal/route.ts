
import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs';


type CARD_COUNT_JSON = {

    playedCard: number;
    multiplication: number;
}


let RED = 0;
let timer: NodeJS.Timeout;
export async function POST(request: NextRequest){
    const jsonFilePath = process.cwd() + "/cardCountData.json"

    try{
  
        // RED++;

        // clearTimeout(timer)

        // timer = setTimeout(async () => {
        //     console.log(RED);
        //     try{
        //         await fs.writeFile(jsonFilePath, JSON.stringify({"playedCard":0,"multiplication":0}))
        //         const rawData = await fs.readFile(jsonFilePath, 'utf8')
        //         const parsedData = JSON.parse(rawData) as CARD_COUNT_JSON
        //         parsedData.multiplication === 0 && parsedData.playedCard === 0
        //     }catch(err){
        //         console.log(err)
        //     }
        //     RED = 0
           
        // }, 3000 )
        await fs.writeFile(jsonFilePath, JSON.stringify({"playedCard":0,"multiplication":0}))
        
        return NextResponse.json({ status: 200 })
    }catch(err){
        console.log(err)
        return NextResponse.json({ isUpdated:false, status: 404, errorMessage: err })
    }
 


}