import { Link } from "react-router-dom";
import HeaderBar from "../navBar";
import "../styles/writing.less";

const pages = [
  "Melody",
  "Belt",
  "Gaps",
  "Losing",
  "One",
  "Two",
  "Jamilla",
  "Stress Fractures",
];
const WritingLanding: React.FC = () => {
  return (
    <div>
      <HeaderBar activePage="writing" />
      <div style={{ marginTop: "80px" }}>
        <h3>Under construction</h3>
        <h4>Responsive styling in progress</h4>
        <div id="circleSpace">
          <div id="centercircle">
            <h1 className="titleW">Writing</h1>
          </div>
          <div className="planet planet1" />
          <div className="planet planet1 delay"></div>
          <div className="subtitleW one">Short Stories</div>
          <div className="planet planet2" />
          <div className="planet planet2 delay"></div>
          <div className="subtitleW two">Poems</div>
          <div className="planet planet3" />
          <div className="planet planet3 delay"></div>
          <div className="subtitleW three">Book Chapters</div>
          <div className="planet planet4" />
          <div className="planet planet4 delay"></div>
          <div className="subtitleW four">Papers</div>
        </div>
        <div id="miniCircleSpace">
          {pages.map((p) => {
            return (
              <div className="miniPlanet" id={p.replace(" ", "")}>
                <Link to={"/writing/pages/" + p}>{p}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WritingLanding;
