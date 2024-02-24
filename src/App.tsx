import { useState } from 'react'
import logo from './assets/klause-b-logo.png';
import resume from './assets/Resume.pdf';
import lowerIcon from './assets/lower-icon.png';
import './styles/App.less'
import './styles/common.css'

function App() {
  const [resumeOpen, setResumeOpen] = useState(false)

  const handleResumeClose = () => {
    
  }
  return (
    <>
      <img src={logo} style={{ width: "22%"}}/>
      <div className={'buttonRow col-6'}>
        <div className={'button resume'} onClick={() => setResumeOpen(!resumeOpen)}>resume</div>
        <div className={'button art'}>Art</div>
        <div className={'button writing'}>Writing</div>
        <div className={'button research'}>research</div>
      </div>
      {resumeOpen && 
      <>
        <iframe className={'resume'} src = {resume} id="resume"></iframe>
        <div className={'closeResume'}>
          <img src={lowerIcon}/>
        </div>
      </>
      }
    </>
  )
}

export default App
