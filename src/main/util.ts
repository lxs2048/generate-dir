import { IpcMainInvokeEvent, dialog,clipboard } from 'electron'
import { access, constants, readdir } from 'node:fs/promises';
import { mainWindowId, BrowserWindowsMap } from './index'
import path from 'node:path';
const EXCLUDE_fILES = ['node_modules','.git']
// 获取文件夹
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
// 解析获取文件夹下的所有文件
export const handleGetFiles = async (_:IpcMainInvokeEvent,dirPath:string)=>{
  // 判断路径
  try {
    await access(dirPath, constants.F_OK);
  } catch (err) {
    return ''
  }
  // 获取文件
  return getFilesRecursive(dirPath)
}
async function getFilesRecursive(dirPath, prefix = '') {
  const files = await readdir(dirPath, { withFileTypes: true });
  let result = '';
  for (const file of files) {
    let tag = false
    EXCLUDE_fILES.forEach(key=>{
      if(file.name == key){
        tag = true
        return
      }
    })
    if(tag){
      continue
    }
    const filePath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      result += `${prefix}└─ ${file.name}/\n`;
      result += await getFilesRecursive(filePath, `${prefix}  `);
    } else {
      result += `${prefix}└─ ${file.name}\n`;
    }
  }

  return result;
}
// 复制
export const copyText = async (_:IpcMainInvokeEvent,str:string)=> {
  clipboard.writeText(str, 'selection')
}