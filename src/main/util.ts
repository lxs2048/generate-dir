import { dialog } from 'electron'
import { mainWindowId, BrowserWindowsMap } from './index'
export const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(BrowserWindowsMap[mainWindowId], {
    properties: ['openDirectory']
  })
  if (canceled) {
    return ''
  } else {
    return filePaths[0] || ''
  }
}
