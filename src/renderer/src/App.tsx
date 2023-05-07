import { useState } from 'react'
const default_tree = '# 请选择并生成项目目录'
function App(): JSX.Element {
  const [dir,setDir] = useState('')
  const [dirTree,setDirTree] = useState(default_tree)
  const openFile = async ()=>{
    const filePath = await window.electronAPI.openFile()
    setDir(filePath)
  }
  const generateDir = async ()=>{
    if(!dir) return
    const DirTree = await window.electronAPI.getFilesName(dir)
    setDirTree(DirTree)
  }
  const reset = ()=>{
    setDir('')
    setDirTree(default_tree)
  }
  const copyText = ()=>{
    window.electronAPI.copyText(dirTree)
  }
  return (
    <div className="container">
      <p className="hero-tagline">目标目录：<code>{dir || '-'}</code></p>
      <div className='features'>
        <div className="btn btn-primary" onClick={openFile}>选择文件夹</div>
        <div className='btn btn-default' onClick={generateDir}>生成工程目录</div>
        <div className='btn btn-success btn-sm' onClick={copyText}>复制</div>
        <div className='btn btn-warning btn-sm' onClick={reset}>重置</div>
      </div>
      <div style={{margin:"14px 0px"}}>
        <p className="hero-tagline">生成工程目录步骤如下：</p>
        <ul>
          <li><code>① 选择文件夹选定目标目录</code></li>
          <li><code>② 手动生成工程目录</code></li>
          <li><code>③ 复制生成的目录</code></li>
        </ul>
        <p>❗️ 可以使用重置按钮清空选择目录和生成的目录树，目前自动排除<code>node_modules</code>，<code>.git</code>目录</p>
      </div>
      <div className="features">
        <div className="feature-item">
          <article>
            <pre>
              {dirTree}
            </pre>
          </article>
        </div>
      </div>
      <br />
      <p className="hero-tagline center">
        📮 <span>doit2048@163.com</span>
      </p>
    </div>
  )
}

export default App
