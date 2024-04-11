import HeaderBar from "../navBar";
import React, { useEffect, useState } from "react";
import "../styles/art.less";
import "../styles/common.less";
import PictureContainer from "./PictureContainer";
const images = import.meta.glob("../assets/artwork/*", {
  import: "default",
  eager: true,
});

const ArtLanding: React.FC<{}> = () => {
  const [imgs, setImgs] = useState<string[] | null>(null);

  useEffect(() => {
    var virtualImgs: string[] = [];
    for (let i of Object.values(images)) {
      if (typeof i === "string") {
        virtualImgs.push(i);
      }
    }
    setImgs(virtualImgs);
  }, []);

  return (
    <div>
      <HeaderBar activePage="art" />
      <div className="page-summary">
        <h1 className="title">Art</h1>
        <p>Some of my little doodles</p>
      </div>
      <div className="scroll-section">
        {imgs &&
          imgs.map((i) => {
            return <PictureContainer key={i} filePath={i} />;
          })}
      </div>
    </div>
  );
};

export default ArtLanding;
