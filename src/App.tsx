import { useState } from 'react'
import logo from './assets/klause-b-logo.png';
import resume from './assets/Resume.pdf';
import lowerIcon from './assets/lower-icon.png';
import HeaderBar from './navBar';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './styles/App.less'
import './styles/common.css'
import ArtLanding from './ArtPage/ArtLanding';
import WritingLanding from './WritingPage/WritingLanding';
import ProjectsLanding from './ProjectsPage/ProjectsLanding';
import Home from './Home';

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

  const goToPage = (page: string) => {

  }

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/art' element={<ArtLanding/>} />
      <Route path='/writing' element={<WritingLanding/>} />
      <Route path='/projects' element={<ProjectsLanding/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
