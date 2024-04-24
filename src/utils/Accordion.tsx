//data structure:
/*[{
    title: string;
    isOpen: boolean;
    sectionData: {list?}
}]
*/
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import "../styles/accordion.less";

export type SectionType = {
  title: string;
  data: (string | object)[] | null;
};

type SectionProps = {
  title: string;
  data: any | null;
  isOpen: boolean;
  setOpen: (id: string) => void;
};
const Section = ({ title, data, isOpen, setOpen }: SectionProps) => {
  return (
    <div>
      <div className={"accordion row"} onClick={() => setOpen(title)}>
        <div className="icon">
          {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </div>
        <h3 className="accordion">{title}</h3>
      </div>
      <div className={isOpen ? "grow-open" : "shrink-closed"}>{data}</div>
    </div>
  );
};

type AccordianProps = {
  multiOpen: boolean | true;
  sections: SectionType[];
};
const Accordion = ({ multiOpen, sections }: AccordianProps) => {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const handleOpen = (title: string) => {
    if (multiOpen) {
      if (openIds.includes(title)) {
        setOpenIds(openIds.filter((id) => id !== title));
      } else {
        setOpenIds(openIds.concat([title]));
      }
    } else {
      if (openIds.includes(title)) setOpenIds([]);
      else setOpenIds([title]);
    }
  };
  return (
    <div>
      {sections.map((section, i) => (
        <Section
          key={"section" + i}
          data={section.data}
          title={section.title}
          isOpen={openIds.includes(section.title)}
          setOpen={handleOpen}
        />
      ))}
    </div>
  );
};

export default Accordion;
