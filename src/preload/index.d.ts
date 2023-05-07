import { ElectronAPI } from '@electron-toolkit/preload'

interface ICustomApi {
  openFile:()=>Promise<string>
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: ICustomApi
  }
}
