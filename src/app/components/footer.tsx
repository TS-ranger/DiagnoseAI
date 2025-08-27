import React from 'react';
import { AnimatedTooltip } from "../components/ui/animated-tooltip";

export default function Footer() {
  return (
    <footer className="w-full py-4">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />

      <div className="max-w-3xl mx-auto text-center text-gray-600 mt-3">
        <p className="text-lg font-semibold px-4">
          Built with ❤️ by
        </p>
      </div>

      <div className="flex justify-center mt-6 mb-4 flex-wrap gap-2">
        <AnimatedTooltip
          items={[
            {
              id: 1,
              name: "Nabadeep",
              designation: "Follow",
              image: "https://avatars.githubusercontent.com/u/119917983?v=4",
            },
            {
              id: 2,
              name: "Tushar",
              designation: "Connect",
              image: "https://avatars.githubusercontent.com/u/128035005?v=4",
            },
            {
              id: 3,
              name: "Prashant",
              designation: "Follow",
              image: "https://avatars.githubusercontent.com/u/117459774?v=4",
            },
          ]}
        />
      </div>
      <div className="text-center text-gray-600 text-lg font-semibold px-4 mb-2">
        @Dignose AI
      </div>
    </footer>
  );
}
