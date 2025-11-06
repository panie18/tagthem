import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";
import Stepper, { Step } from "@/components/Stepper";

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    showSuccess("Thank you for your message! We will get back to you soon.");
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Card className="w-full max-w-lg text-white bg-black/20 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Get in Touch</CardTitle>
        <CardDescription>Have a question or feedback? Fill out the form below and we'll get back to you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stepper onFinalStepCompleted={handleSubmit} completeButtonText="Send Message">
          <Step>
            <h3 className="text-lg font-semibold mb-4">Your Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-800 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-800 text-white" />
              </div>
            </div>
          </Step>
          <Step>
            <h3 className="text-lg font-semibold mb-4">Your Message</h3>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message..." required value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[80px] bg-gray-800 text-white" />
            </div>
          </Step>
        </Stepper>
      </CardContent>
    </Card>
  );
};

export default Contact;