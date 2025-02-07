
import { PDFViewer } from "./PDFViewer";

interface VideoPlayerProps {
  url: string | null;
  slidesUrl: string | null;
}

export const VideoPlayer = ({ url, slidesUrl }: VideoPlayerProps) => {
  // If there's a video URL, show the video player
  if (url) {
    return (
      <div className="aspect-video mb-6">
        <iframe
          className="w-full h-full rounded-lg"
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // If there's no video URL but there's a slides URL, show the PDF viewer
  if (slidesUrl) {
    return (
      <div className="mb-6">
        <PDFViewer url={slidesUrl} />
      </div>
    );
  }

  // If neither URL is present, show nothing
  return null;
};
