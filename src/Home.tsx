import { useState } from "react";
import logo from "./assets/klause-b-logo.png";
import lowerIcon from "./assets/lower-icon.png";
import HeaderBar from "./navBar";
import { Link } from "react-router-dom";

function Home() {
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [resumeLoading, setResumeLoading] = useState<boolean>(true);

  const closeResume = async () => {
    const resumeWrap = document.getElementById("resumeWrapper");
    resumeWrap?.classList.add("closeWindowDown");
    await setTimeout(() => {
      setResumeOpen(false);
      resumeWrap?.classList.remove("closeWindowDown");
      setResumeLoading(true);
    }, 500);
  };

  return (
    <>
      <HeaderBar activePage="home" />
      <div id="homeContainer">
        <img src={logo} id={"homeLogo"} />
        <div className={"buttonRow col-7"}>
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
            {resumeLoading ? <div>Loading...</div> : null}
            <iframe
              src="https://drive.google.com/file/d/1LxCzaVgQS__bdklceXpqEMgdbbq6Yycd/preview"
              width="100%"
              height="94%"
              allow="autoplay"
              onLoad={() => setResumeLoading(false)}
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
