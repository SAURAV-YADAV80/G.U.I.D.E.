import React from 'react';
import { Youtube, Facebook, Instagram, Twitter, Globe, Album } from 'lucide-react';

const Reff = () => {
  const socialPlatforms = [
    {
      name: "YouTube",
      icon: Youtube,
      color: "text-red-600",
      bgColor: "bg-white",
      hoverColor: "hover:bg-emerald-50",
      link: "https://youtube.com",
      description: "Subscribe to our channel for exclusive video content, tutorials, and behind-the-scenes footage. Join our growing community of over 100k subscribers!",
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-white",
      hoverColor: "hover:bg-emerald-50",
      link: "https://facebook.com",
      description: "Connect with us on Facebook for daily updates, community discussions, and live events. Be part of our active social community!",
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      color: "text-blue-400",
      bgColor: "bg-white",
      hoverColor: "hover:bg-emerald-50",
      link: "https://twitter.com",
      description: "Follow us on X for real-time updates, industry news, and quick interactions. Join the conversation and stay updated!",
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-600",
      bgColor: "bg-white",
      hoverColor: "hover:bg-emerald-50",
      link: "https://instagram.com",
      description: "Follow our Instagram for visual inspiration, product showcases, and stories. Experience our brand through beautiful imagery!",
    },
    {
      name: "Wikipedia",
      icon: Globe,
      color: "text-gray-600",
      bgColor: "bg-white",
      hoverColor: "hover:bg-emerald-50",
      link: "https://wikipedia.org",
      description: "Learn more about our history, achievements, and impact on our Wikipedia page. Discover our complete story!",
    },
    {
      name: "App1",
      icon: Album,
      color: "text-gray-600",
      bgColor: "bg-white",
      hoverColor: "hover:bg-emerald-50",
      link: "https://wikipedia.org",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi accusamus ea quia omnis!",
    },
    {
      name: "App2",
      icon: Album,
      color: "text-gray-600",
      bgColor: "bg-white",
      hoverColor: "hover:bg-emerald-50",
      link: "https://wikipedia.org",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi accusamus ea quia omnis!",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-teal-900 mb-4">Connect With Us</h1>
          <p className="text-lg text-teal-600">
            Stay connected and join our community across all social platforms.
          </p>
        </div>

        {/* Social Platforms Grid */}
        <div className="space-y-6">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            
            return (
              <a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all duration-300"
              >
                <div className={`rounded-xl bg-white p-6 flex items-start gap-6 shadow-lg 
                  hover:shadow-xl transition-all duration-300 ${platform.hoverColor} group`}>
                  <div className={`${platform.color} p-4 rounded-full bg-opacity-10 
                    group-hover:bg-opacity-20 transition-all duration-300`}>
                    <IconComponent size={32} />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-teal-900 mb-2 
                      group-hover:text-emerald-700 transition-colors duration-300">
                      {platform.name}
                    </h2>
                    <p className="text-teal-600 leading-relaxed group-hover:text-emerald-600 
                      transition-colors duration-300">
                      {platform.description}
                    </p>
                  </div>
                  
                  <div className="text-teal-400 group-hover:text-emerald-500 
                    transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center text-teal-600 text-sm">
          <p>Follow us to stay updated with our latest news and announcements.</p>
        </div>
      </div>
    </div>
  );
};

export default Reff;