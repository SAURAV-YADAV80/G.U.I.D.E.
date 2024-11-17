import React from 'react';
import { Youtube, Facebook, Instagram, Twitter, Globe } from 'lucide-react';

const Reff = () => {
  const socialPlatforms = [
    {
      name: "YouTube",
      icon: Youtube,
      color: "text-red-600",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100",
      link: "https://youtube.com",
      description: "Subscribe to our channel for exclusive video content, tutorials, and behind-the-scenes footage. Join our growing community of over 100k subscribers!",
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      link: "https://facebook.com",
      description: "Connect with us on Facebook for daily updates, community discussions, and live events. Be part of our active social community!",
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      color: "text-blue-400",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      link: "https://twitter.com",
      description: "Follow us on X for real-time updates, industry news, and quick interactions. Join the conversation and stay updated!",
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
      link: "https://instagram.com",
      description: "Follow our Instagram for visual inspiration, product showcases, and stories. Experience our brand through beautiful imagery!",
    },
    {
      name: "Wikipedia",
      icon: Globe,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      link: "https://wikipedia.org",
      description: "Learn more about our history, achievements, and impact on our Wikipedia page. Discover our complete story!",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect With Us</h1>
          <p className="text-lg text-gray-600">
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
                className={`block ${platform.hoverColor} transition-all duration-300`}
              >
                <div className={`rounded-xl ${platform.bgColor} p-6 flex items-start gap-6 shadow-sm`}>
                  <div className={`${platform.color} p-4 rounded-full ${platform.bgColor}`}>
                    <IconComponent size={32} />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {platform.name}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                  
                  <div className="text-gray-400">
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
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Follow us to stay updated with our latest news and announcements.</p>
        </div>
      </div>
    </div>
  );
};

export default Reff;