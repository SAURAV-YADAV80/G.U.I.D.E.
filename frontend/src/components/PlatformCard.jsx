const PlatformCard = ({ platform }) => {
    const { icon: IconComponent, name, description, color, hoverColor, link } = platform;
    
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-all duration-300"
      >
        <div className={`rounded-xl bg-white p-6 flex items-start gap-6 shadow-lg 
          hover:shadow-xl hover:scale-105 transition-all duration-300 ${hoverColor} group`}>
          {/* Icon Section */}
          <div className={`${color} p-4 rounded-full bg-opacity-10 
            group-hover:bg-opacity-20 transition-all duration-300`}>
            <IconComponent size={32} />
          </div>
          
          {/* Content Section */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-teal-900 mb-2 
              group-hover:text-emerald-700 transition-colors duration-300">
              {name}
            </h2>
            <p className="text-teal-600 leading-relaxed group-hover:text-emerald-600 
              transition-colors duration-300">
              {description}
            </p>
          </div>
          
          {/* Arrow Icon */}
          <div className="text-teal-400 group-hover:text-emerald-500 
            transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    );
  };

  export default PlatformCard;