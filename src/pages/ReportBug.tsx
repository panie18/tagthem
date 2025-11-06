import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";

const ReportBug = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Bug report submitted! Thank you for helping us improve.");
  };

  return (
    <Card className="w-full max-w-lg text-white bg-black/20 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Report a Bug</CardTitle>
        <CardDescription>Found an issue? Please let us know by filling out the form below.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Your Email (Optional)</Label>
            <Input id="email" type="email" placeholder="your@email.com" className="bg-gray-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Bug Description</Label>
            <Textarea id="description" placeholder="Describe the bug in detail..." required className="bg-gray-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="steps">Steps to Reproduce</Label>
            <Textarea id="steps" placeholder="1. Go to '...'\n2. Click on '...'\n3. See error" required className="bg-gray-800 text-white" />
          </div>
          <Button type="submit" className="w-full">Submit Report</Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default ReportBug;