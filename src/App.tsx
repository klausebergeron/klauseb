import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArtLanding from "./ArtPage/ArtLanding";
import WritingLanding from "./WritingPage/WritingLanding";
import ProjectsLanding from "./ProjectsPage/ProjectsLanding";
import Home from "./Home";
import Pages from "./WritingPage/Pages";
import WritingLandingOld from "./WritingPage/OldPage";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
