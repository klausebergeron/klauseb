import { useParams, Link, useNavigate } from "react-router-dom";
import HeaderBar from "../../navBar";
import "../../styles/writing.less";
import "../../styles/common.less";
import One from "../../assets/writing/SiliconFairyOne";
import Two from "../../assets/writing/SiliconFairyTwo";
import Melody from "../../assets/writing/Melody";
import Belt from "../../assets/writing/Belt";
import Gaps from "../../assets/writing/Gaps";
import Losing from "../../assets/writing/Losing";
import Jamilla from "../../assets/writing/Jamilla";
import StressFractures from "../../assets/writing/StressFractures";

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
      case "Silicon Fairy One":
        return <One />;
      case "Silicon Fairy Two":
        return <Two />;
      case "Jamilla":
        return <Jamilla />;
      case "Stress Fractures":
        return <StressFractures />;
      default:
        return <div>Not Found</div>;
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      <HeaderBar activePage="writing" />
      <div className="top-nav back">
        <Link
          to={".."}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {"<< Back"}
        </Link>
      </div>
      <div className="writing-container">
        <h1>{page}</h1>
        {renderPage()}
      </div>
    </div>
  );
};

export default Pages;
