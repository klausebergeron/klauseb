import { LazyLoadImage } from "react-lazy-load-image-component";
interface PictureContainerProps {
  filePath: string;
  onselect: () => void;
}

const PictureContainer: React.FC<PictureContainerProps> = (props) => {
  const { filePath, onselect } = props;
  const fpArr = filePath.split("/");
  var title = fpArr[fpArr.length - 1]
    .replace(".jpg", "")
    .replace(".png", "")
    .replaceAll("%20", " ");
  const indToSlice = title.includes("-") ? title.indexOf("-") : title.length;
  return (
    <div className="picture-container col-4 col-s-8" onClick={onselect}>
      <div>
        <div className="picture-container-inner">
          <div>
            <LazyLoadImage className="image" src={filePath} effect="blur" />
          </div>
        </div>
        <p className="label">{title.slice(0, indToSlice)}</p>
      </div>
    </div>
  );
};

export default PictureContainer;
