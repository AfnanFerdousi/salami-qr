
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Download, RefreshCw } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "sonner";

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
    if (!canvasRef.current || !profileImage || !qrCodeImage) {
      toast.error("Please add your profile image and QR code first!");
      return;
    }

    try {
      setIsGenerating(true);
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });
      
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `eid-qr-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!canvasRef.current || !profileImage || !qrCodeImage) {
      toast.error("Please add your profile image and QR code first!");
      return;
    }

    try {
      setIsGenerating(true);
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });
      
      const dataUrl = canvas.toDataURL("image/png");
      
      // Convert base64 to blob
      const byteString = atob(dataUrl.split(',')[1]);
      const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "eid-qr-share.png", { type: "image/png" });
      
      if (navigator.share) {
        await navigator.share({
          title: "My Eid QR Code",
          text: "Check out my Eid QR Code!",
          files: [file],
        });
        toast.success("Shared successfully!");
      } else {
        // Fallback for browsers that don't support navigator.share with files
        const shareData = {
          title: "My Eid QR Code",
          text: "Check out my Eid QR Code!",
          url: dataUrl,
        };
        
        if (navigator.share) {
          await navigator.share(shareData);
          toast.success("Shared successfully!");
        } else {
          // Copy to clipboard as fallback
          await navigator.clipboard.writeText("Check out my Eid QR Code!");
          toast.success("Link copied to clipboard!");
        }
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
    <div className="w-full flex flex-col items-center">
      <div className="mb-6 w-full max-w-md">
        <div 
          ref={canvasRef}
          className="w-full aspect-[3/4] rounded-lg overflow-hidden relative bg-white border-8 border-eid-gold"
        >
          {/* Festive background pattern */}
          <div className="absolute inset-0 bg-eid-cream eid-pattern opacity-10"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-eid-gold/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-eid-red/10 rounded-full -ml-10 -mb-10"></div>
          </div>
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-eid-gold/10 px-4 py-2 rounded-full">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/57/BKash_logo.png" 
                  alt="bKash Logo" 
                  className="h-8 object-contain"
                />
              </div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-eid-gold playfair mb-1">
              Eid Mubarak
            </h1>
            <div className="flex justify-center">
              <div className="px-3 py-1 bg-bkash text-white text-xs font-medium tracking-wide rounded-full shadow-md">
                Send Eid Salami with bKash
              </div>
            </div>
          </div>
          
          {/* Profile Image */}
          {profileImage && (
            <div className="absolute bottom-20 right-4 left-4 flex justify-center">
              <div className="w-3/4 aspect-square rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          {/* QR Code */}
          {qrCodeImage && (
            <div className="absolute top-36 left-4 w-36 h-36 bg-white p-2 rounded-lg shadow-lg border-2 border-bkash">
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          {/* Phone number */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="font-bold text-bkash text-lg truncate px-4">
              {phoneNumber || "+880 1X XXX XXX XX"}
            </p>
            <p className="text-sm text-eid-green font-medium truncate px-4">
              {name || "Your Name"}
            </p>
          </div>
          
          {/* Decoration elements */}
          <div className="absolute top-16 right-4 text-eid-gold opacity-70">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C12.36 22 12.72 21.97 13.08 21.93C10.11 20.97 8 17.76 8 14C8 10.24 10.11 7.03 13.08 6.07C12.72 6.03 12.36 6 12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Festive stars */}
          <div className="absolute top-24 right-10 text-eid-gold opacity-70 animate-float">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          
          <div className="absolute top-28 right-6 text-eid-gold opacity-60 animate-float" style={{ animationDelay: "0.5s" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>

          {/* More decorative elements */}
          <div className="absolute top-20 left-2 text-eid-red opacity-80 animate-float" style={{ animationDelay: "0.7s" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.02 2.84L9.93 3.75M14.98 2.84L14.07 3.75M12 2V3M7.5 5.75C7.5 5.75 8 7.5 12 7.5C16 7.5 16.5 5.75 16.5 5.75M18 12H17.5M18.5 9H18M19 15H18.5M6 12H6.5M5.5 9H6M5 15H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.5 13.5V20.5M9.5 13.5V20.5M8 22H16M14.5 10.5C14.5 12.1569 13.3807 13.5 12 13.5C10.6193 13.5 9.5 12.1569 9.5 10.5C9.5 8.84315 10.6193 7.5 12 7.5C13.3807 7.5 14.5 8.84315 14.5 10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Festive confetti decorations */}
          <div className="absolute top-40 right-12 h-2 w-2 bg-eid-green rounded-full opacity-40"></div>
          <div className="absolute top-48 right-6 h-1.5 w-1.5 bg-eid-red rounded-full opacity-30"></div>
          <div className="absolute top-52 right-14 h-1 w-2 bg-eid-gold rounded-full opacity-50"></div>
          <div className="absolute bottom-32 left-6 h-2 w-2 bg-eid-gold rounded-full opacity-40"></div>
          <div className="absolute bottom-28 left-10 h-1 w-1 bg-eid-red rounded-full opacity-30"></div>
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
