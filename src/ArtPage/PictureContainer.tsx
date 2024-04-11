interface PictureContainerProps {
  filePath: string;
}

const PictureContainer: React.FC<PictureContainerProps> = (props) => {
  const { filePath } = props;
  const fpArr = filePath.split("/");
  console.log("filepath: ", filePath.split("/"));
  var title = fpArr[fpArr.length - 1];
  title =
    title.includes(".jpg") || title.includes(".png")
      ? title.replace(".jpg", "").replace(".png", "")
      : title.slice(0, title.indexOf("-"));
  return (
    <div className="picture-container col-6 col-s-8">
      <img className="image" src={filePath} />
      <p className="label">{title}</p>
    </div>
  );
};

export default PictureContainer;
