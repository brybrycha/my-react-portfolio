import React from "react";
import { useNavigate } from "react-router-dom";
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
    title: "Phone Purchase Analysis",
    artist: "Bryan Cha",
    image: process.env.PUBLIC_URL + "/phone.jpg",
    link: "/pages/phone-purchase-analysis"
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

  const handleProjectClick = (link) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank"); // Open external links in a new tab
    } else {
      navigate(link);
    }
  };

  return (
    <div className="container">
      <div className="layout">
        <div className="profile-section">
          <img
            src={process.env.PUBLIC_URL + "/face.jpg"}
            alt="Bryan Cha"
            className="profile-pic"
          />
          <h2 className="profile-name">Bryan Cha</h2>
          <p className="bio">
            Business Economics and Data Science Enthusiast. Passionate about
            data-driven decision-making and web development.
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> bryancha0329@gmail.com</p>
            <p><strong>Cell:</strong> +1 (213) 595-9929</p>
            <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/bryancha" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
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