interface PictureContainerProps {
  filePath: string;
}

const PictureContainer: React.FC<PictureContainerProps> = (props) => {
  const { filePath } = props;
  const fpArr = filePath.split("/");
  console.log("filepath: ", filePath.split("/"));
  var title = fpArr[fpArr.length - 1]
    .replace(".jpg", "")
    .replace(".png", "")
    .replaceAll("%20", " ");
  const indToSlice = title.includes("-") ? title.indexOf("-") : title.length;
  title.slice(0, indToSlice);
  console.log("title: ", title);
  console.log("title slice: ", title.slice(0, indToSlice));
  return (
    <div className="picture-container col-6 col-s-8">
      <img className="image" src={filePath} />
      <p className="label">{title.slice(0, indToSlice)}</p>
    </div>
  );
};

export default PictureContainer;
