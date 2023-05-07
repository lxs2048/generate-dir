import { ElectronAPI } from '@electron-toolkit/preload'

interface ICustomApi {
  openFile:()=>Promise<string>
  getFilesName:(dirPath:string)=>Promise<any>
  copyText:(text:string)=>void
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: ICustomApi
  }
}
