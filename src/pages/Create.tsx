import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Stepper, { Step } from '@/components/Stepper';
import { showError, showLoading, dismissToast, showSuccess } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';

const Create = () => {
  const [item, setItem] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const generateLink = async () => {
    if (!item || !name || !email) {
      showError('Item, Name and Email are required.');
      return;
    }
    
    const loadingToast = showLoading('Generating your secure tag...');

    const { data, error } = await supabase
      .from('tags')
      .insert([{ item, name, email, phone }])
      .select('id')
      .single();

    dismissToast(loadingToast);

    if (error) {
      showError('Could not create your tag. Please try again.');
      console.error(error);
      return;
    }

    if (data) {
      showSuccess('Tag created successfully!');
      window.location.href = `/generate?id=${data.id}`;
    }
  };

  return (
    <Card className="w-full max-w-lg text-white bg-black/20 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Create your Lost & Found Tag</CardTitle>
        <CardDescription>Enter your contact details below. This information will be stored securely.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stepper onFinalStepCompleted={generateLink} completeButtonText="Generate Tag">
          <Step>
            <h3 className="text-lg font-semibold mb-4">Lost Item</h3>
            <div className="space-y-2">
              <Label htmlFor="item">What item is this tag for?</Label>
              <Input id="item" placeholder="e.g., Keys, Backpack, Wallet" required value={item} onChange={(e) => setItem(e.target.value)} className="bg-gray-800 text-white" />
            </div>
          </Step>
          <Step>
            <h3 className="text-lg font-semibold mb-4">Your Name</h3>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-800 text-white" />
            </div>
          </Step>
          <Step>
            <h3 className="text-lg font-semibold mb-4">Contact Email</h3>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="john@example.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-800 text-white" />
            </div>
          </Step>
          <Step>
            <h3 className="text-lg font-semibold mb-4">Phone (Optional)</h3>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 123 456 7890" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-gray-800 text-white" />
            </div>
          </Step>
        </Stepper>
        <p className="text-xs text-gray-400 mt-4 text-center">
          By clicking "Generate Tag", you agree to our{' '}
          <Link to="/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
};

export default Create;