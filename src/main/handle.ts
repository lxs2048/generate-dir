import { ipcMain } from "electron"
import {
    handleFileOpen,
    handleGetFiles,
    copyText,
    prompt
} from "./util"
export const ListenerStart = ()=>{
    ipcMain.handle('dialog:openFile', handleFileOpen)
    ipcMain.handle('dialog:getFilesName', handleGetFiles)
    ipcMain.handle('clipboard:copy', copyText)
    ipcMain.handle('Notification:prompt', prompt)
}
