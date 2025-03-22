import React from "react";
import { useLocation } from "react-router-dom";
import "./BackgroundWrapper.css";

// Import all background images
import homeBg from "../assets/background.jpg";
import aboutBg from "../assets/background.jpg";
import faqBg from "../assets/background.jpg";
import uploadBg from "../assets/background.jpg";
import dashboardBg from "../assets/background.jpg";

const BackgroundWrapper = ({ children }) => {
  const location = useLocation();

  // Map routes to their respective background images
  const backgrounds = {
    "/": homeBg,
    "/about": aboutBg,
    "/faq": faqBg,
    "/upload": uploadBg,
    "/dashboard": dashboardBg,
  };

  // Get the background image for the current route, or use the default
  const backgroundImage = backgrounds[location.pathname] || `..assets/background.jpg`;

  console.log("Background Image URL:", backgroundImage); // Debugging

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        border: "2px solid red", // Temporary border for debugging
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Temporary background color for debugging
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;