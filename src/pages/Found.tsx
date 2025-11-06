import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Mail, Phone, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContactInfo {
  item: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

const Found = () => {
  const [searchParams] = useSearchParams();
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) {
      setError("No tag ID provided.");
      setLoading(false);
      return;
    }

    const fetchTagData = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('tags')
        .select('item, name, email, phone')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching tag data:", error);
        setError("Could not find the tag information. It may have been removed or the link is incorrect.");
        setContactInfo(null);
      } else {
        setContactInfo(data);
      }
      setLoading(false);
    };

    fetchTagData();
  }, [searchParams]);

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-4 text-white bg-black/20 border-gray-800 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center p-10 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <p className="text-gray-400">Loading contact information...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-4 text-white bg-black/20 border-gray-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const { item, name, email, phone } = contactInfo || {};

  return (
    <Card className="w-full max-w-md mx-4 text-white bg-black/20 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Contact Information</CardTitle>
        {item && (
            <CardDescription className="text-center text-lg pt-2">
                for: <span className="font-semibold">{item}</span>
            </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-gray-400">
          If you have found this item, please contact the owner:
        </p>
        {name && (
          <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-md">
            <User className="h-5 w-5 text-gray-400" />
            <span className="font-medium">{name}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-md">
            <Mail className="h-5 w-5 text-gray-400" />
            <a href={`mailto:${email}`} className="text-blue-400 hover:underline">
              {email}
            </a>
          </div>
        )}
        {phone && (
          <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-md">
            <Phone className="h-5 w-5 text-gray-400" />
            <a href={`tel:${phone}`} className="text-blue-400 hover:underline">
              {phone}
            </a>
          </div>
        )}
        {!name && !email && !phone && !item && (
          <p className="text-center text-red-500">No contact information available for this tag.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Found;