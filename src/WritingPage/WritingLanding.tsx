import { Link } from "react-router-dom";
import HeaderBar from "../navBar";
import "../styles/writing.less";
import { SectionType } from "../utils/Accordion";
import Accordion from "../utils/Accordion";

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

const accordion_data: SectionType[] = [
  {
    title: "Short Stories",
    data: ["Melody"],
  },
  {
    title: "Poems",
    data: ["Belt", "Gaps", "Losing"],
  },
  {
    title: "Book Chapters",
    data: ["One", "Two"],
  },
  {
    title: "Papers",
    data: ["Jamilla", "Stress Fractures"],
  },
];

const convertToPageLinks = (sections: SectionType[]): SectionType[] => {
  return sections.map((s: SectionType) => {
    return {
      title: s.title,
      data:
        s?.data?.map((p, i) => {
          return (
            <div key={"linkno" + i}>
              <Link to={"/writing/pages/" + p}>{p}</Link>
            </div>
          );
        }) || [],
    };
  });
};

const WritingLanding: React.FC = () => {
  const pagesData = convertToPageLinks(accordion_data);
  console.log("Pages data: ", pagesData);
  return (
    <div>
      <HeaderBar activePage="writing" />
      <div className="page-summary">
        <h1 className="title">Writing</h1>
        <p>
          Some poems, essays, and book chapters from my portfolio. The well
          formatted ones I set up way back when. Everything else is gonna be a
          google doc. Sorry. You can check out my old page which was originally
          written in PHP but converted to React
          <span>
            <Link to={"/writing/old"}> here </Link>
          </span>
          . It has pretty animations.
        </p>
      </div>
      <div className="scroll-section">
        <div>Accordion here</div>
        <Accordion multiOpen={true} sections={pagesData} />
      </div>
    </div>
  );
};

export default WritingLanding;
