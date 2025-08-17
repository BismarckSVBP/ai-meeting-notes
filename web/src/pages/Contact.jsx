import Card from "../components/Card";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Card>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Contact Us
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Have questions, feedback, or need support? Reach out to us:
        </p>
       
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <Mail /> bismarcksvbp@gmail.com
        </div>
      </Card>
    </main>
  );
}
