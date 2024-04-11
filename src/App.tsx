import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/styles/app.less";
import "./styles/common.less";
import ArtLanding from "./ArtPage/ArtLanding";
import WritingLanding from "./WritingPage/WritingLanding";
import ProjectsLanding from "./ProjectsPage/ProjectsLanding";
import Home from "./Home";
import Pages from "./WritingPage/Pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/art" element={<ArtLanding />} />
          <Route path="/writing" element={<WritingLanding />} />
          <Route path="/writing/pages/:page" element={<Pages />} />
          <Route path="/projects" element={<ProjectsLanding />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
