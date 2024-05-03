import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArtLanding from "./pages/ArtPage/ArtLanding";
import WritingLanding from "./pages/WritingPage/WritingLanding";
import ProjectsLanding from "./pages/ProjectsPage/ProjectsLanding";
import Home from "./Home";
import Pages from "./pages/WritingPage/Pages";
import WritingLandingOld from "./pages/WritingPage/OldPage";
import TamaGame from "./pages/ProjectsPage/TamaGame/TamaGame";
import TTT from "./pages/ProjectsPage/TTT";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/art" element={<ArtLanding />} />
          <Route path="/writing" element={<WritingLanding />} />
          <Route path="/writing/pages/:page" element={<Pages />} />
          <Route path="/writing/old" element={<WritingLandingOld />} />
          <Route path="/projects" element={<ProjectsLanding />} />
          <Route path="/projects/tamagame" element={<TamaGame />} />
          <Route path="/projects/tttgame" element={<TTT />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
