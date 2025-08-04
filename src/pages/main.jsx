import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegClipboard, FaEnvelope, FaPhoneAlt, FaLinkedin, FaFileAlt } from "react-icons/fa";
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
    title: "Data Analysis of Ultra-marathon Running ",
    artist: "Bryan Cha",
    image: process.env.PUBLIC_URL + "/Marathon.png",
    link: "https://github.com/brybrycha/Data_Analysis_of_Ultra-marathon_Running"
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
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef(null);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const handleProjectClick = (link) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    
    // Check if scrolled to the end (with a small tolerance)
    if (scrollLeft + clientWidth >= scrollWidth - 5) {
      setActiveDot(projects.length - 1);
      return;
    }
    
    const firstCard = scrollContainer.querySelector('.project-card');
    if (!firstCard) return;
    
    const gap = parseFloat(getComputedStyle(firstCard.parentElement).gap);
    const scrollStep = firstCard.offsetWidth + gap;

    if (scrollStep > 0) {
      const newActiveDot = Math.round(scrollLeft / scrollStep);
      setActiveDot(newActiveDot);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const debouncedScrollHandler = debounce(handleScroll, 50);
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", debouncedScrollHandler, { passive: true });
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", debouncedScrollHandler);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="layout">
        <div className="profile-container">
          <div className={`profile-card ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
            <div className="profile-front">
              <img src={process.env.PUBLIC_URL + "/face.jpg"} alt="Bryan Cha" className="profile-pic" />
              <h2 className="profile-name">Bryan Cha</h2>
              <p className="bio">I'm a Business Economics and Data Science enthusiast passionate about turning raw data into insights that drive smarter decisions.</p>
              <p className="flip-prompt"><strong>CLICK TO SEE MY INFO</strong></p>
            </div>
            <div className="profile-back">
              <div className="info-section">
                <p className="info-item">
                  <FaEnvelope className="info-icon" />
                  bryancha0329@gmail.com
                  <FaRegClipboard className="copy-icon" onClick={(e) => { e.stopPropagation(); handleCopy("bryancha0329@gmail.com"); }} />
                  {copiedText === "bryancha0329@gmail.com" && <span className="copied-msg">Copied!</span>}
                </p>
                <p className="info-item">
                  <FaPhoneAlt className="info-icon" />
                  +1 (213) 595-9929
                  <FaRegClipboard className="copy-icon" onClick={(e) => { e.stopPropagation(); handleCopy("+1 (213) 595-9929"); }} />
                  {copiedText === "+1 (213) 595-9929" && <span className="copied-msg">Copied!</span>}
                </p>
                <p className="info-item">
                  <FaLinkedin className="info-icon" />
                  <a href="https://www.linkedin.com/in/bryancha" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>LinkedIn Profile</a>
                </p>
                <p className="info-item">
                  <FaFileAlt className="info-icon" />
                  <a href={process.env.PUBLIC_URL + "/Bryan_Cha_Resume.pdf"} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>View My Resume</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="projects-content">
          <h1 className="title">My Projects</h1>
          <hr className="divider" />
          <div className="projects-container" ref={scrollRef}>
            <div className="scroll-wrapper">
              {projects.map((project, index) => (
                <div className="project-card" key={index} onClick={() => handleProjectClick(project.link)}>
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} className="project-img" />
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-artist">{project.artist}</p>
                    <button className="view-project-btn">View Project</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="scroll-dots">
            {projects.map((_, index) => (
              <span key={index} className={`dot ${index === activeDot ? "active" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;