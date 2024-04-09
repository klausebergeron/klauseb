import { useParams, Link } from "react-router-dom";
import HeaderBar from "../navBar";
import "../styles/writing.less";
import "../styles/common.css";
import One from "../assets/writing/One";
import Two from "../assets/writing/Two";
import Melody from "../assets/writing/Melody";
import Belt from "../assets/writing/Belt";
import Gaps from "../assets/writing/Gaps";
import Losing from "../assets/writing/Losing";
import Jamilla from "../assets/writing/Jamilla";
import StressFractures from "../assets/writing/StressFractures";

const Pages = () => {
  const { page } = useParams();

  const renderPage = () => {
    switch (page) {
      case "Melody":
        return <Melody />;
      case "Belt":
        return <Belt />;
      case "Gaps":
        return <Gaps />;
      case "Losing":
        return <Losing />;
      case "One":
        return <One />;
      case "Two":
        return <Two />;
      case "Jamilla":
        return <Jamilla />;
      case "Stress Fractures":
        return <StressFractures />;
      default:
        return <div>Not Found</div>;
    }
  };
  return (
    <div>
      <HeaderBar activePage="writing" />
      <div className="top-nav back">
        <Link to="/writing">{"<< Back"}</Link>
      </div>
      <div className="writing-container">
        <h1>{page}</h1>
        {renderPage()}
      </div>
    </div>
  );
};

export default Pages;
