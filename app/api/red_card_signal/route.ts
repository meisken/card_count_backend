
import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs';
import path from 'path';
import { initializeJson } from '@/server_function/initializeJson';



export async function POST(request: NextRequest){

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
        await initializeJson()
        
        return NextResponse.json({ status: 200 })
    }catch(err){
        console.log(err)
        return NextResponse.json({ isUpdated:false, status: 404, errorMessage: err })
    }
 


}