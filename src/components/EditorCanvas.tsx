import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import * as htmlToImage from "html-to-image";

interface EditorCanvasProps {
  profileImage: string | null;
  qrCodeImage: string | null;
  phoneNumber: string;
  name: string;
}

const EditorCanvas = ({
  profileImage,
  qrCodeImage,
  phoneNumber,
  name,
}: EditorCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!canvasRef.current) {
      toast.error("Please add your profile image and QR code first!");
      return;
    }

    setIsGenerating(true);

    try {
      await document.fonts.ready;

      const dataUrl = await htmlToImage.toPng(canvasRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "white",
        style: {
          border: "none",
        },
        filter: (node) => true,
      });

      const link = document.createElement("a");
      link.download = `eid-qr-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Error capturing image:", error);
      toast.error("Failed to capture image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!canvasRef.current || !profileImage || !qrCodeImage) {
      toast.error("Please add your profile image and QR code first!");
      return;
    }

    setIsGenerating(true);

    try {
      await document.fonts.ready;

      const dataUrl = await htmlToImage.toPng(canvasRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "white",
        style: {
          border: "none",
        },
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "eid-qr-share.png", { type: "image/png" });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Eid QR Code",
          text: "Check out my Eid QR Code!",
          files: [file],
        });
        toast.success("Shared successfully!");
      } else if (navigator.share) {
        await navigator.share({
          title: "My Eid QR Code",
          text: "Check out my Eid QR Code!",
          url: dataUrl,
        });
        toast.success("Shared successfully!");
      } else {
        await navigator.clipboard.writeText("Check out my Eid QR Code!");
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("Failed to share. Please try downloading instead.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!profileImage && !qrCodeImage) {
    return (
      <div className="w-full h-96 flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20">
        <div className="text-center">
          <p className="text-muted-foreground">
            Upload your profile picture and QR code to see the preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "none",
        boxShadow: "none",
        background: "white",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
      className="w-full flex flex-col items-center"
    >
      <div className="mb-6 w-full flex justify-center canvas-container">
        <div
          ref={canvasRef}
          className="relative bg-white border-8 border-eid-gold rounded-lg overflow-hidden"
          style={{
            width: "300px", // Reduced base width for better mobile fit
            aspectRatio: "3 / 4", // Maintain 3:4 aspect ratio
            fontSize: "14px", // Reduced base font size for mobile
            padding: "8px",
            boxSizing: "border-box",
            background: "white",
            transform: "scale(var(--scale-factor, 1))",
            transformOrigin: "top center",
          }}
        >
          <div className="absolute inset-0 bg-white"></div>
          <div className="absolute top-0 left-0 right-0 p-[0.75rem] text-center">
            <div className="flex items-center justify-center mb-[0.25rem]">
              <div className="bg-white px-[1rem] py-[0.25rem] rounded-full shadow-md border border-eid-gold/30">
                <img
                  src="/lovable-uploads/bkash.png"
                  alt="bKash Logo"
                  className="h-[2rem] object-contain"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
            <h1 className="text-[1.25rem] font-bold text-eid-gold playfair mb-[0.125rem]">
              Eid Mubarak
            </h1>
            <p className="text-[0.625rem] text-eid-green italic mb-[0.125rem] px-[0.5rem]">
              Taqabbalallahu Minna Wa Minkum
            </p>
            <div className="flex justify-center">
              <div className="px-[0.5rem] py-[0.125rem] bg-bkash text-white text-[0.625rem] font-medium tracking-wide rounded-full shadow-md">
                সালামি টা দিয়ে দেন ভাই
              </div>
            </div>
          </div>
          {qrCodeImage && (
            <div
              className="absolute w-[10rem] h-[10rem] bg-white p-[0.5rem] rounded-lg shadow-lg border-2 border-bkash flex items-center justify-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -40%)", // Adjusted to make space for the text above
              }}
            >
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            </div>
          )}
          {profileImage && (
            <div
              className="absolute w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden border-3 border-white shadow-lg"
              style={{
                bottom: "4.5rem",
                right: "0.75rem",
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          )}
          <div className="absolute bottom-[1rem] left-0 right-0 text-center">
            <div className="bg-white/90 mx-auto max-w-[90%] py-[0.25rem] px-[0.75rem] rounded-full border border-eid-gold/30 shadow-md">
              <p className="font-bold text-bkash text-[1rem]">
                {phoneNumber || "+880 1X XXX XXX XX"}
              </p>
              <p className="text-[0.75rem] text-eid-green font-medium">
                {name || "Your Name"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={handleDownload}
          className="bg-eid-green hover:bg-eid-green/90 text-white"
          disabled={isGenerating || (!profileImage && !qrCodeImage)}
        >
          {isGenerating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Download
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="border-eid-gold text-eid-gold hover:bg-eid-gold/10"
          disabled={isGenerating || (!profileImage && !qrCodeImage)}
        >
          {isGenerating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Share2 className="h-4 w-4 mr-2" />
          )}
          Share
        </Button>
      </div>
    </div>
  );
};

export default EditorCanvas;