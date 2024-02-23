
import { NextRequest, NextResponse } from 'next/server'

import { readJson } from '@/server_function/readJson';
import { updateJsonData } from '@/server_function/updateJsonData';
import { checkJsonFileExist } from '@/server_function/checkJsonFileExist';
import { initializeJson } from '@/server_function/initializeJson';
import { /*unstable_noStore as noStore,*/ revalidatePath, revalidateTag, unstable_noStore } from 'next/cache';
import { acceptHeader } from '@/server_function/acceptHeader';
import { cookies } from "next/headers"

export const preferredRegion = 'hkg1'; 
export const dynamic = "force-dynamic";
export const fetchCache = 'force-no-store';
export const dynamicParams = true 
export const revalidate = 0

let card_count = {"playedCard":0,"multiplication":0};
const  serverVision = "8.3"

import { ObjectId } from "mongodb";
import CardCount  from '@/model/cardCount';
import mongoose from "mongoose"

const uri = "mongodb+srv://meiskena999:88QGkPSi6UhUsPbi@cardcount.dcqbfdn.mongodb.net/?retryWrites=true&w=majority";
const _id = new ObjectId("6579d36f3c64e26013823506");
mongoose.connect(uri,{
    dbName: "bj"
})

 
export async function GET(request: NextRequest){
   
    unstable_noStore()
    //const cardCountData = await import("@/public/cardCountData.json", {assert: {type: "json"}});
    try{
        await acceptHeader()
      
        revalidatePath("/api/card_count")
        revalidatePath(request.url)

        cookies()

        const result = await CardCount.findById(_id )

        const current = new Date();

        if( (current.getTime() - result.lastUpdate) > 1000*60*5){
            return NextResponse.json({ error: 'last update is over 5 minutes', playedCard: result.playedCard, multiplication: result.multiplication }, { status: 500 })
        }

        console.log("played card" ,result.playedCard)
        return NextResponse.json({  playedCard: result.playedCard, multiplication: result.multiplication, status: 200, revalidated: true, serverVision })
    }catch(err){
        console.log(err)
        return NextResponse.json({ status: 404, errorMessage: err, serverVision})
    }
}

export async function POST(request: NextRequest){
    unstable_noStore()
    try{


        await acceptHeader()

        const body = await request.json()
        const lastUpdate = (new Date()).getTime()
        const result = await CardCount.findOneAndUpdate({
            _id
        },{
            "playedCard": body.playedCard,
            "multiplication": body.multiplication,
            "lastUpdate": lastUpdate
        },{
            new: true
        })



        setTimeout(() => {
            revalidatePath("/api/card_count")
            revalidatePath(request.url)
        }, 250)


        cookies()

        console.log(result)
        //console.log("card count post")
        return NextResponse.json({ playedCard: result.playedCard, multiplication: result.multiplication, status: 200, revalidated: true, serverVision, lastUpdate })
    }catch(err){
        console.log(err)
        return NextResponse.json({ /*isUpdated:false,*/ status: 404, errorMessage: err, serverVision })
    }
 


}