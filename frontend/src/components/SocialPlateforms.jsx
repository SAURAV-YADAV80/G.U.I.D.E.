import PageSection from "./PageSection";
import PlatformCard from "./PlatformCard";

const SocialPlatforms = ({ platforms }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <PageSection 
            title="Connect With Us" 
            subtitle="Stay connected and join our community across all social platforms."
          />
  
          {/* Platform Cards */}
          <div className="space-y-6">
            {platforms.map((platform) => (
              <PlatformCard key={platform.name} platform={platform} />
            ))}
          </div>
  
          {/* Footer */}
          <div className="mt-16 text-center text-teal-600 text-sm">
            <p>Follow us to stay updated with our latest news and announcements.</p>
          </div>
        </div>
      </div>
    );
  };

  export default SocialPlatforms;