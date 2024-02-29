import { useState } from 'react'
import logo from './assets/klause-b-logo.png';
import resume from './assets/Resume.pdf';
import lowerIcon from './assets/lower-icon.png';
import HeaderBar from './navBar';
import './styles/App.less'
import './styles/common.css'

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const closeResume = async () => {
    const resumeWrap = document.getElementById('resumeWrapper');
    resumeWrap?.classList.add('closeWindowDown');
    await(setTimeout(() => {
      setResumeOpen(false);
      resumeWrap?.classList.remove('closeWindowDown');
    }, 500))
  }

  return (
    <>
      <HeaderBar/>
      <img src={logo} style={{ width: "22%", marginTop: '70px'}}/>
      <div className={'buttonRow col-6'}>
        <div className={'button resumebutton'} onClick={() => setResumeOpen(true)}>resume</div>
        <div className={'button art'}>Art</div>
        <div className={'button writing'}>Writing</div>
        <div className={'button research'}>research</div>
      </div>
      {resumeOpen &&
        <div id={'resumeWrapper'}>
          <div className={'closeResume'} onClick={closeResume}>
            <img src={lowerIcon}/>
          </div>
          <iframe className={'resume'} src = {resume} id="resume"></iframe>
        </div>
}
    </>
  )
}

export default App
