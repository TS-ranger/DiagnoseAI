import react from 'react';
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="max-w-3xl mx-auto text-center text-gray-600">
       
      
        <div className="mt-4 flex justify-center">
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
      </div>
    </footer>
  );
}