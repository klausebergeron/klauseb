import HeaderBar from "../navBar";
import React, { useEffect, useState } from "react";
import "../styles/art.less";
import "../styles/common.less";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PictureContainer from "./PictureContainer";
const images = import.meta.glob("../assets/artwork/*", {
  import: "default",
  eager: true,
});

const ArtLanding: React.FC<{}> = () => {
  const [imgs, setImgs] = useState<string[] | null>(null);
  const [modalImg, setModalImg] = useState<string>("");

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
        <p>
          Some of my little doodles.
          <br /> Commissions are always welcome. <br />
          Contact me at claudia.j.bergeron@gmail.com for requests.
        </p>
      </div>
      <div className="scroll-section">
        {imgs &&
          imgs.map((i) => {
            return (
              <PictureContainer
                key={i}
                filePath={i}
                onselect={() => setModalImg(i)}
              />
            );
          })}
      </div>
      <Modal open={modalImg !== ""} onClose={() => setModalImg("")}>
        <Box className={"art-modal"}>
          <img src={modalImg} />
        </Box>
      </Modal>
    </div>
  );
};

export default ArtLanding;
