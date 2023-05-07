import { contextBridge, ipcRenderer } from 'electron'
import { INotification } from '../main/util'

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getFilesName: (dirPath:string) => ipcRenderer.invoke('dialog:getFilesName',dirPath),
  copyText: (text:string) => ipcRenderer.invoke('clipboard:copy',text),
  prompt:(msg:INotification) => ipcRenderer.invoke('Notification:prompt',msg)
})
