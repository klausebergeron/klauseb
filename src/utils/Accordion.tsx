import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import "../styles/accordion.less";

export type SectionType = {
  title: string;
  data: (string | object)[] | null;
};

type SectionProps = {
  title: string;
  data: any[] | null;
  isOpen: boolean;
  setOpen: (id: string) => void;
};
const Section = ({ title, data, isOpen, setOpen }: SectionProps) => {
  return (
    <div>
      <div className={"accordion row"} onClick={() => setOpen(title)}>
        <div className={isOpen ? "point-down icon" : "point-right icon"}>
          {<ChevronRightIcon />}
        </div>
        <h3 className="accordion">{title}</h3>
      </div>
      <div className={isOpen ? "grow-open" : "shrink-closed"}>
        {data?.map((d, i) => (
          <div key={"data" + i} className={"accordion subsection"}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

type AccordianProps = {
  multiOpen: boolean | true;
  sections: SectionType[];
  width?: number | string;
};
const Accordion = ({ multiOpen, sections, width }: AccordianProps) => {
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
    <div style={{ width: width }}>
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
