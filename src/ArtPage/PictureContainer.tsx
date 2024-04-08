interface PictureContainerProps {
  filePath: string;
}

const PictureContainer: React.FC<PictureContainerProps> = (props) => {
  const { filePath } = props;
  return (
    <div className="picture-container col-6 col-s-8">
      <img className="image" src={filePath} />
      <p className="label">{filePath.substring(20, filePath.length - 4)}</p>
    </div>
  );
};

export default PictureContainer;
