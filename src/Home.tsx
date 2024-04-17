import { useState } from "react";
import logo from "./assets/klause-b-logo.png";
import resume from "./assets/Resume.pdf";
import lowerIcon from "./assets/lower-icon.png";
import HeaderBar from "./navBar";
import { Link } from "react-router-dom";

function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const closeResume = async () => {
    const resumeWrap = document.getElementById("resumeWrapper");
    resumeWrap?.classList.add("closeWindowDown");
    await setTimeout(() => {
      setResumeOpen(false);
      resumeWrap?.classList.remove("closeWindowDown");
    }, 500);
  };

  return (
    <>
      <HeaderBar activePage="home" />
      <div id="homeContainer">
        <img src={logo} style={{ width: "22%", marginTop: "70px" }} />
        <div className={"buttonRow col-6"}>
          <div
            className={"button resumebutton"}
            onClick={() => setResumeOpen(true)}
          >
            resume
          </div>
          <Link to="/art" className={"button art"}>
            art
          </Link>
          <Link to="/writing" className={"button writing"}>
            writing
          </Link>
          <Link to="/projects" className={"button research"}>
            projects
          </Link>
        </div>
        {resumeOpen && (
          <div id={"resumeWrapper"}>
            <div className={"closeResume"} onClick={closeResume}>
              <img src={lowerIcon} />
            </div>
            <object
              data={resume}
              type="application/pdf"
              width="100%"
              height="94%"
            >
              <iframe
                src="https://drive.google.com/file/d/1LxCzaVgQS__bdklceXpqEMgdbbq6Yycd/preview"
                width="100%"
                height="94%"
                allow="autoplay"
              ></iframe>
            </object>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
