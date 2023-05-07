import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getFilesName: (dirPath:string) => ipcRenderer.invoke('dialog:getFilesName',dirPath),
  copyText: (text:string) => ipcRenderer.invoke('clipboard:copy',text)
})
