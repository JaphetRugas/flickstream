import Footer from "@/components/Footer";
import YouTubePlayer from "@/components/YouTubePlayer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <YouTubePlayer />
      <Footer />
    </div>
  );
}
