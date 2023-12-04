import { headers } from 'next/headers'



const acceptSecret = "meiskena999gambling";

export const acceptHeader = () => {
    return new Promise<void>((resolve,reject) => {
        const acceptRequestHeader = headers().get("Accept-Request")
        if(acceptRequestHeader  === acceptSecret){
            resolve()
        }else{
            reject()
        }
     
      
    })
}