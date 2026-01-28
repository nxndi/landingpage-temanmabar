import LazyLoadImage from "../../../components/LazyLoadImage";
import placeholderCard from "../../../assets/placeholder/placeholder.png";

interface PreviewProps {
  imageUrl: string;
  title: string;
  isVisible: boolean;
}

const Preview: React.FC<PreviewProps> = ({ imageUrl, title, isVisible }) => {
  return (
    <div
      className="fixed bottom-10 right-3 z-40 max-w-[150px] sm:max-w-[300px] pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        display: isVisible ? "block" : "none",
      }}
    >
      <div className="relative">
        <div className="overflow-hidden">
          <LazyLoadImage
            placeholder={placeholderCard}
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
