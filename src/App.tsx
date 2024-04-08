import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./styles/app.less";
import "./styles/common.css";
import ArtLanding from "./ArtPage/ArtLanding";
import WritingLanding from "./WritingPage/WritingLanding";
import ProjectsLanding from "./ProjectsPage/ProjectsLanding";
import Home from "./Home";
import decode from "./decode";

function App() {
  //console.log(decode());
  //decode();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/art" element={<ArtLanding />} />
          <Route path="/writing" element={<WritingLanding />} />
          <Route path="/projects" element={<ProjectsLanding />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
