import fs from "fs"
import { jsonFilePath } from "./jsonPath"






export const checkJsonFileExist = () => {
    
    return fs.existsSync(jsonFilePath)
}