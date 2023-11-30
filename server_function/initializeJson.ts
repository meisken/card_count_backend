
import { promises as fs } from 'fs';
import { jsonFilePath } from './jsonPath';

export const initializeJson = () => {
    return fs.writeFile(jsonFilePath, JSON.stringify({"playedCard":0,"multiplication":0}))
}