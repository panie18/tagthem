import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const Imprint = () => {
  const motionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5 }
  };

  return (
    <Card className="w-full max-w-4xl text-white bg-black/20 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Imprint</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-lg prose-invert text-left max-w-none prose-p:text-gray-300 prose-headings:text-white prose-headings:font-normal">
        <motion.div {...motionProps} className="space-y-4">
          <h2>Information according to § 5 TMG (German Telemedia Act)</h2>
          <p>
            Paulify Development<br />
            Represented by: Paulify Development Team<br />
            E-Mail: contact@paulify.cc
          </p>
          <p>Website: <a href="https://paulify.eu" target="_blank" rel="noopener noreferrer">https://paulify.eu</a></p>
        </motion.div>

        <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: 0.1 }} className="space-y-4 mt-8">
          <h2>Responsible for the content according to § 55 Abs. 2 RStV</h2>
          <p>
            Paulify Development<br />
            E-Mail: contact@paulify.cc
          </p>
        </motion.div>

        <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: 0.2 }} className="space-y-4 mt-8">
          <h2>Disclaimer</h2>
          <p>
            The use of Tagthem.app is at your own risk. Although the application has been developed with care, we assume no liability for any damages resulting from its use.
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default Imprint;