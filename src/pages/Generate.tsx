import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, QrCode, Nfc, Loader2, Download, Sticker as StickerIcon } from "lucide-react";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toPng } from 'html-to-image';
import StickerPreview from "@/components/StickerPreview";
import { Checkbox } from "@/components/ui/checkbox";
import QRCodeStyled from "@/components/QRCodeStyled";
import QRCodeStyling from 'qr-code-styling';

interface TagData {
  item: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

const Generate = () => {
  const [searchParams] = useSearchParams();
  const [isWritingNfc, setIsWritingNfc] = useState(false);
  const [tagData, setTagData] = useState<TagData | null>(null);
  const [loading, setLoading] = useState(true);
  const [stickerOptions, setStickerOptions] = useState({
    width: 5,
    height: 5,
    message: 'Scan if found!',
    showEmail: true,
    showPhone: true,
  });
  const stickerRef = useRef<HTMLDivElement>(null);
  const [qrInstance, setQrInstance] = useState<QRCodeStyling | null>(null);
  const id = searchParams.get("id");
  const foundUrl = `${window.location.origin}/found?id=${id || ''}`;

  useEffect(() => {
    if (!id) {
      showError("No tag ID provided.");
      setLoading(false);
      return;
    }

    const fetchTagData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tags')
        .select('item, name, email, phone')
        .eq('id', id)
        .single();

      if (error) {
        showError("Could not load tag data.");
        console.error(error);
      } else {
        setTagData(data);
      }
      setLoading(false);
    };

    fetchTagData();
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(foundUrl)
      .then(() => showSuccess("Link copied to clipboard!"))
      .catch(() => showError("Failed to copy link."));
  };

  const writeNfc = async () => {
    if (!("NDEFReader" in window)) {
      showError("Web NFC is not supported on this device or browser.");
      return;
    }
    setIsWritingNfc(true);
    const loadingToast = showLoading("Waiting for NFC tag...");
    try {
      const nfcReader = new (window as any).NDEFReader();
      await nfcReader.write({ records: [{ recordType: "url", data: foundUrl }] });
      showSuccess("Tag written successfully!");
    } catch (error) {
      showError("Failed to write NFC tag. Please try again.");
      console.error("NFC write error:", error);
    } finally {
      dismissToast(loadingToast);
      setIsWritingNfc(false);
    }
  };
  
  const downloadQRCode = () => {
    if (qrInstance) {
      qrInstance.download({ name: "tagthem-qrcode", extension: "png" });
    } else {
      showError("QR Code is not ready yet. Please wait a moment.");
    }
  };

  const downloadSticker = () => {
    if (stickerRef.current === null) {
      return;
    }
    toPng(stickerRef.current, { cacheBust: true, pixelRatio: 3 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'tagthem-sticker.png';
        link.href = dataUrl;
        link.click();
        showSuccess("Sticker downloaded!");
      })
      .catch((err) => {
        showError("Could not create sticker image.");
        console.error(err);
      });
  };

  const handleStickerChange = (key: string, value: any) => {
    setStickerOptions(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <Card className="w-full max-w-lg text-white bg-black/20 border-gray-800 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center p-10 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <p className="text-gray-400">Loading tag data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg text-white bg-black/20 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Your Tag is Ready!</CardTitle>
        <CardDescription>Use the options below to copy the link, generate a QR code, or write to an NFC tag.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label htmlFor="link">Your Unique Link</Label>
          <div className="flex gap-2">
            <Input id="link" readOnly value={foundUrl} className="bg-gray-800 text-white" />
            <Button onClick={copyLink} size="icon" variant="outline">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="qrcode" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="qrcode"><QrCode className="h-4 w-4 mr-2" />QR Code</TabsTrigger>
            <TabsTrigger value="nfc"><Nfc className="h-4 w-4 mr-2" />NFC Tag</TabsTrigger>
            <TabsTrigger value="sticker"><StickerIcon className="h-4 w-4 mr-2" />Sticker</TabsTrigger>
          </TabsList>
          <TabsContent value="qrcode">
            <div className="flex flex-col items-center gap-4 p-4 border border-gray-800 rounded-md mt-2">
              <QRCodeStyled
                onInstance={setQrInstance}
                useWhiteLogo={true}
                options={{
                  width: 200,
                  height: 200,
                  data: foundUrl,
                  dotsOptions: { color: '#FFFFFF', type: 'rounded' },
                  backgroundOptions: { color: 'transparent' },
                  cornersSquareOptions: { type: 'extra-rounded', color: '#FFFFFF' },
                  qrOptions: { errorCorrectionLevel: 'H' }
                }}
              />
              <Button onClick={downloadQRCode} className="w-full">Download QR Code</Button>
            </div>
          </TabsContent>
          <TabsContent value="nfc">
            <div className="flex flex-col items-center gap-4 p-4 border border-gray-800 rounded-md mt-2">
              <p className="text-center text-sm text-gray-400">Click the button below and then hold an NFC tag near your device's NFC reader.</p>
              <Button onClick={writeNfc} className="w-full" disabled={isWritingNfc}>
                {isWritingNfc ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Waiting for Tag...</> : "Write to NFC Tag"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="sticker">
            <div className="p-4 border border-gray-800 rounded-md mt-2 space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Sticker Options</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Width (cm)</Label>
                    <Input type="number" value={stickerOptions.width} onChange={(e) => handleStickerChange('width', Math.max(1, Number(e.target.value)))} className="bg-gray-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Height (cm)</Label>
                    <Input type="number" value={stickerOptions.height} onChange={(e) => handleStickerChange('height', Math.max(1, Number(e.target.value)))} className="bg-gray-800" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Input value={stickerOptions.message} onChange={(e) => handleStickerChange('message', e.target.value)} className="bg-gray-800" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="showEmail" checked={stickerOptions.showEmail} onCheckedChange={(c) => handleStickerChange('showEmail', c)} disabled={!tagData?.email} />
                  <Label htmlFor="showEmail">Show Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="showPhone" checked={stickerOptions.showPhone} onCheckedChange={(c) => handleStickerChange('showPhone', c)} disabled={!tagData?.phone} />
                  <Label htmlFor="showPhone">Show Phone</Label>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Preview</h4>
                <div className="flex justify-center">
                  <StickerPreview ref={stickerRef} options={stickerOptions} tagData={tagData} foundUrl={foundUrl} />
                </div>
              </div>
              <Button onClick={downloadSticker} className="w-full">
                <Download className="h-4 w-4 mr-2" /> Download Sticker
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Generate;