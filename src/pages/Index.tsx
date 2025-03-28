
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import EditorCanvas from "@/components/EditorCanvas";
import { toast } from "sonner";

const Index = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleProfileImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setProfileImage(e.target.result);
        toast.success("Profile image uploaded!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleQrCodeImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setQrCodeImage(e.target.result);
        toast.success("QR code uploaded!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
  };

  const handleRemoveQrCodeImage = () => {
    setQrCodeImage(null);
  };

  return (
    <div className="min-h-screen eid-pattern">
      <header className="container mx-auto py-8 text-center">
        <div className="inline-block px-3 py-1 bg-eid-gold/10 rounded-full text-eid-gold text-sm font-medium mb-4 animate-fade-in">
          <Gift className="h-4 w-4 inline-block mr-2" /> Eid Mubarak 1445
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-eid-gold via-eid-red to-eid-green bg-clip-text text-transparent playfair animate-fade-in" style={{ animationDelay: "0.1s" }}>
          সালামি QR
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          সালামি QR - সালামি দেন, সওয়াব কামান
        </p>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto glass rounded-xl p-6 md:p-8 shadow-lg animate-scale-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-2">1</span>
                  Upload Your Images
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageUploader
                    label="Profile Picture"
                    onImageUpload={handleProfileImageUpload}
                    previewUrl={profileImage}
                    onRemove={handleRemoveProfileImage}
                  />
                  <ImageUploader
                    label="bKash QR Code"
                    onImageUpload={handleQrCodeImageUpload}
                    previewUrl={qrCodeImage}
                    onRemove={handleRemoveQrCodeImage}
                  />
                </div>
              </div>

              <Separator />

              <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-2">2</span>
                  Enter Your Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="phone">bKash Number</Label>
                    <Input
                      id="phone"
                      placeholder="+880 1X XXX XXX XX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-2">3</span>
                Preview & Download
              </h2>
              <EditorCanvas
                profileImage={profileImage}
                qrCodeImage={qrCodeImage}
                phoneNumber={phoneNumber}
                name={name}
              />
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="inline-block px-4 py-1 bg-eid-green/10 rounded-full text-eid-green text-sm font-medium mb-4">
            How to use your QR code
          </div>
          <h2 className="text-2xl font-bold mb-6 playfair">
            Share Your QR Code This Eid
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-white shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Create</h3>
              <p className="text-sm text-muted-foreground">
                Upload your photo and bKash QR code to create your personalized Eid card
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-white shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Share</h3>
              <p className="text-sm text-muted-foreground">
                Download and share your Eid QR card on social media or with friends and family
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-white shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Receive</h3>
              <p className="text-sm text-muted-foreground">
                Friends and family can scan your QR code to send you Eid Salami via bKash
              </p>
            </div>
          </div>
          
          <div className="mt-10">
            <Button className="group">
              Create Your QR Code Now
              <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Eid QR Creator. All rights reserved by <a className="underline text-bkash" href="https://www.linkedin.com/in/afnanferdousi550/" target="_blank">Afnan</a></p>
          <p className="mt-1">Made with ❤️ for Eid ul-Fitr</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
