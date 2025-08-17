
import React from "react";
import Card from "../components/Card";
import { Linkedin, Mail } from "lucide-react";
import abhayImg from "../assets/abhay.jpg";

const developers = [
  {
    id: 1,
    name: "Abhay Kumar",
    role: "Full-Stack Developer and Coder",
    bio: "CSE B.Tech 3rd Year | Passionate full-stack developer skilled in building robust systems to solve real-world problems with code.",
    avatar: abhayImg, 
    skills: [
      "C/C++",
      "Data Structures and Algorithms",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "MySQL",
      "Python",
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/abhay-kumar-4aa26b282",
      email: "bismarcksvbp@gmail.com",
    },
  },
];

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 ">
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          About AI Meeting Notes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed ">
          AI Meeting Notes helps teams save time by automatically summarizing meeting transcripts into clear, actionable notes.
          You can upload transcripts, customize prompts for AI, edit the summaries, and instantly share them with colleagues.
        </p>

        <section className="mb-16 mt-10">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Meet Our Developer
          </h2>
          {developers.map((dev) => (
            <Card
              key={dev.id}
              className="max-w-md mx-auto mb-8 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-skyblue-100 dark:from-blue-900/20 dark:to-skyblue-900/20 rounded-lg overflow-hidden">
                  <img
                    src={dev.avatar}
                    alt={`Profile picture of ${dev.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-2 px-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {dev.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">{dev.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {dev.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dev.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
                    <a
                      href={dev.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${dev.name} LinkedIn`}
                      className="hover:text-gray-900 dark:hover:text-gray-100 transition"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a
                      href={`mailto:${dev.social.email}`}
                      aria-label={`${dev.name} Email`}
                      className="hover:text-gray-900 dark:hover:text-gray-100 transition"
                    >
                      <Mail size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </section>
      </Card>
    </main>
  );
}
