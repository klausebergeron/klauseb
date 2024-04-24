import { Link } from "react-router-dom";
import HeaderBar from "../navBar";
import "../styles/writing.less";
import { SectionType } from "../utils/Accordion";
import Accordion from "../utils/Accordion";

const accordion_data: SectionType[] = [
  {
    title: "Short Stories",
    data: ["Melody"],
  },
  {
    title: "Poems",
    data: [
      "Belt",
      "Gaps",
      "Losing",
      {
        title: "Killing Two Words with One Phone",
        doclink:
          "https://docs.google.com/document/d/1kHBxNtV4ugZWklhwIkxfdCBPxGu5eKb37RbcvZfnGyY/edit?usp=sharing",
      },
    ],
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
            <Link
              key={"linkno" + i}
              //@ts-ignore
              to={p.doclink ? p.doclink : "/writing/pages/" + p}
            >
              {
                //@ts-ignore
                p.title ? p.title : p
              }
            </Link>
          );
        }) || [],
    };
  });
};

const WritingLanding: React.FC = () => {
  const pagesData = convertToPageLinks(accordion_data);
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
            <Link to={"/writing/old"}> here. </Link>
          </span>
          It has more fun animations but isn't good for mobile displays.
        </p>
      </div>
      <div className="scroll-section">
        <Accordion multiOpen={true} sections={pagesData} width={"100%"} />
      </div>
    </div>
  );
};

export default WritingLanding;
