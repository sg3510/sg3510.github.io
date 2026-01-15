import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { SocialIcon } from "react-social-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { useMarkdown } from "./hooks/useMarkdown";
import "./App.css";

const imageList = [
  "seb_hiking.jpg",
  "seb_android.jpg",
  "seb_hiking_matterhorn.jpg",
  "seb_zermatt_2x.jpg",
  "seb_limmat_2x.jpg",
  "seb_hiking_ch_2x.jpg",
];

const getRandomImage = (current: string) => {
  let filtered = imageList.filter((img) => img !== current);
  if (filtered.length === 0) filtered = imageList;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

const Home: React.FC = () => {
  const [profileImg, setProfileImg] = useState<string>("seb_hiking.jpg");
  const { content, loading } = useMarkdown("/content/home.md");

  // For 2x images, use srcSet for better quality on retina screens
  const getImgSrc = (img: string) => `/images/${img}`;
  const getImgSrcSet = (img: string) => {
    if (img.endsWith("_2x.jpg")) {
      // 2x image, fallback to itself for 1x
      return `/images/${img} 2x, /images/${img} 1x`;
    }
    // If a 2x version exists, use it
    const base = img.replace(/\.jpg$/, "");
    const twoX = `/images/${base}_2x.jpg`;
    if (imageList.includes(`${base}_2x.jpg`)) {
      return `/images/${img} 1x, ${twoX} 2x`;
    }
    return undefined;
  };

  const handleImgClick = () => {
    setProfileImg((curr) => getRandomImage(curr));
  };

  return (
    <div className="content-container">
      <div className="text-content">
        <div className="profile-img-container">
          <img
            src={getImgSrc(profileImg)}
            srcSet={getImgSrcSet(profileImg)}
            alt="Seb hiking"
            className="profile-img"
            width={256}
            height={256}
            style={{ objectFit: "cover" }}
            onClick={handleImgClick}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
        <div className="social-icons">
          <SocialIcon
            url="https://twitter.com/seb_uk"
            style={{ height: 30, width: 30 }}
            target="_blank"
            rel="noopener noreferrer"
          />
          <SocialIcon
            url="https://www.linkedin.com/in/sebastiangrubb/"
            style={{ height: 30, width: 30 }}
            target="_blank"
            rel="noopener noreferrer"
          />
          <SocialIcon
            url="https://github.com/sg3510/"
            style={{ height: 30, width: 30 }}
            target="_blank"
            rel="noopener noreferrer"
          />
          <a
            href="/resume/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-icon"
            style={{ height: 30, width: 30 }}
          >
            <FontAwesomeIcon icon={faFileAlt} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Interests: React.FC = () => {
  const { content, loading } = useMarkdown("/content/interests.md");

  return (
    <div className="content-container">
      <div className="text-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`nav-link ${isActive ? "active" : ""}`}>
      {children}
    </Link>
  );
};

const App: React.FC = () => {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <header className="App-header">
            <div className="header-container">
              <h1 className="name">
                <TypeAnimation
                  sequence={["Seb Grubb", () => setTypingDone(true)]}
                  wrapper="span"
                  cursor={false}
                  speed={50}
                  className={typingDone ? "typing-done" : ""}
                  style={{ display: "inline-block" }}
                />
              </h1>
              <div className="nav-container">
                <nav>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/interests">Interests</NavLink>
                  <NavLink to="/fun-things">Fun Things</NavLink>
                </nav>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/interests" element={<Interests />} />
              <Route path="/fun-things" element={<FunThings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const FunThings: React.FC = () => {
  const { content, loading } = useMarkdown("/content/fun-things.md");

  return (
    <div className="content-container">
      <div className="text-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default App;
