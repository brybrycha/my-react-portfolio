import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegClipboard, FaEnvelope, FaPhoneAlt, FaLinkedin } from "react-icons/fa"; // Import icons
import "../pages/main.css";

const projects = [
  {
    title: "UCSD Class Data",
    artist: "Bryan Cha & LikeLion Team",
    image: process.env.PUBLIC_URL + "/UCSD.jpg",
    link: "https://classual.vercel.app/"
  },
  {
    title: "Accident Rate Analysis",
    artist: "Bryan Cha & Chloe Kim",
    image: process.env.PUBLIC_URL + "/uk.jpg",
    link: "https://brybrycha.github.io/Accident_Rate_Day_Night/"
  },
  {
    title: "Netflix ELT Project ",
    artist: "Bryan Cha",
    image: process.env.PUBLIC_URL + "/Netflix.png",
    link: "https://github.com/brybrycha/Netflix-Data-ETL-Project"
  },
  {
    title: "Playlist Visualization",
    artist: "Bryan Cha & Like Lion Team",
    image: process.env.PUBLIC_URL + "/spotify.jpg",
    link: "/pages/playlist-visualization"
  },
  {
    title: "Recipes and Ratings",
    artist: "Bryan Cha, Chloe Kim",
    image: process.env.PUBLIC_URL + "/food.jpg",
    link: "https://sek034.github.io/Predicting-Minutes-Taken-for-Different-Recipes/"
  },
];

const Portfolio = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000); // Reset after 2 seconds
  };

  const handleProjectClick = (link) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  return (
    <div className="container">
      <div className="layout">
        <div className="profile-container" onClick={handleFlip}>
          <div className={`profile-card ${isFlipped ? "flipped" : ""}`}>
            <div className="profile-front">
              <img
                src={process.env.PUBLIC_URL + "/face.jpg"}
                alt="Bryan Cha"
                className="profile-pic"
              />
              <h2 className="profile-name">Bryan Cha</h2>
              <p className="bio">
                I'm a Business Economics and Data Science enthusiast with a deep passion 
                for turning raw data into meaningful insights that drive smarter decisions. 
                Please let me know if you have any questions or feedback!
              </p>
              <p><strong>CLICK TO SEE MY INFO</strong></p>
            </div>

            <div className="profile-back">
              <p>
                <FaEnvelope className="info-icon email-icon" />
                bryancha0329@gmail.com
                <FaRegClipboard 
                  className="copy-icon" 
                  onClick={(e) => { e.stopPropagation(); handleCopy("bryancha0329@gmail.com"); }}
                />
                {copiedText === "bryancha0329@gmail.com" && <span className="copied-msg">Copied!</span>}
              </p>

              <p>
                <FaPhoneAlt className="info-icon phone-icon" />
                +1 (213) 595-9929
                <FaRegClipboard 
                  className="copy-icon" 
                  onClick={(e) => { e.stopPropagation(); handleCopy("+1 (213) 595-9929"); }}
                />
                {copiedText === "+1 (213) 595-9929" && <span className="copied-msg">Copied!</span>}
              </p>

              <p>
                <FaLinkedin className="info-icon linkedin-icon" />
                <a 
                  href="https://www.linkedin.com/in/bryancha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  LinkedIn Profile
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="projects-content">
          <h1 className="title">My Projects</h1>
          <hr className="divider" />
          <div className="projects-container">
            <div className="scroll-wrapper">
              {projects.map((project, index) => (
                <div className="project-card" key={index} onClick={() => handleProjectClick(project.link)}>
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} className="project-img" />
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-artist">{project.artist}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
