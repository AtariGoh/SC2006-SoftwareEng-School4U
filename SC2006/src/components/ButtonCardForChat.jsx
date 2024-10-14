import React from "react";

const ButtonCardForChat = ({ title, imageUrl, description, linkText, linkHref }) => {
  return (
    <div className="card">
      <div className="w-64 h-80 bg-[#FAEDCE] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
        <div>
          <img src={imageUrl} alt={title} className="mb-4" />
          <h5 className="text-xl font-bold mb-2 text-center">{title}</h5>
          <p className="text-center">{description}</p>
        </div>
        <div className="flex justify-center mt-4">
          <a href={linkHref} className="bg-[#536493] py-2 px-6 text-white rounded hover:shadow-lg transition-shadow duration-300">
            {linkText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ButtonCardForChat;
