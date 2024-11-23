 const PageSection = ({ title, subtitle }) => {
    return (
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-teal-900 mb-4">{title}</h1>
        <p className="text-lg text-teal-600">{subtitle}</p>
      </div>
    );
  };

  export default PageSection;