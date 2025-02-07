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
import "./App.css";

const Home: React.FC = () => (
  <div className="text-content">
    <h1>Hi I'm Seb</h1>
    <p>I'm currently exploring different startup ideas.</p>
    <p>I enjoy both writing software but also making it scale to millions (or billions) of users - this has led me to jump between the roles of software engineer and a PM at various companies including:</p>
    <ul>
      <li><strong>Google:</strong> I joined as part of the APM program and worked on various products including YouTube, Android and Pixel.</li>
      <li><strong>Home Automation Startup:</strong> Shortly after graduating I spent a year working as a machine learning engineer building sound recognition neural networks for a home automation device.</li>
      <li><strong>ARM:</strong> I worked two summers as a software engineer and a PM, mostly working on the Cortex-M processors.</li>
    </ul>
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
    </div>
  </div>
);


const Interests: React.FC = () => (
  <div className="text-content">
    <h2>Interests</h2>
    <p>I usually try to stay open-minded and curious about various things, but areas that I'm particularly interested in are:</p>
    <ul>
      <li>
        <strong>Fitness / Health:</strong> Not just regularly exercising but how we can stay healthy for longer as we age. I enjoy fitness monitoring but often question the value of over self-quantification without concrete results.
      </li>
      <li>
        <strong>Medicine:</strong> Having undergone <a href="http://drbugbee.com/bipolarAnkleAllograft.html" target="_blank" rel="noopener noreferrer">ankle transplant surgery</a>, a rare procedure few surgeons I talked to knew about, I'm deeply interested in how doctors make decisions for their patients and how we can help patients better understand their options when doctors themselves don't know all the possibilities. I'll usually have a lot of fun going through all the papers related to the treatment of a condition to understand how the doctors came to agree on the best way forward. LLMs make this even easier.
      </li>
      <li>
        <strong>Hardware:</strong> I studied electrical & electronic engineering mostly because I like to play with and understand what software runs on. I occasionally hack some hardware projects together, such as self-balancing controllers.
      </li>
      <li>
        <strong>Music:</strong> I actually enjoy a wide range, from classical to electronic music. I used to play flute and piano as a kid but have definitely gotten very rusty now.
      </li>
      <li>
        <strong>Video Games:</strong> While I used to play a lot as a kid, I occasionally enjoy trying out the latest games to see how far we've come. Most recently I've been enjoying Zelda: Breath of the Wild and its sequel, Tears of the Kingdom. I also like following efforts to beat video games I'd play as a kid with reinforcement learning (e.g., <a href="https://github.com/PWhiddy/PokemonRedExperiments" target="_blank" rel="noopener noreferrer">Pokemon Red Experiments</a>) - we've come a long way!
      </li>
    </ul>
  </div>
);

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
    <Router>
      <div className="App">
        <header className="App-header">
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
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/interests">Interests</NavLink>
            <NavLink to="/fun-things">Fun Things</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/fun-things" element={<FunThings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

function FunThings() {
  return (
    <div className="text-content">
      <h2>Fun Things</h2>
      <ul>
        <li>
          <a
            href="https://sebgrubb.com/pokemon-tileset/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pokemon Tileset Viewer
          </a>
          : A fun project I made to read and display tilesets and blocksets from Pokemon Yellow in a browser.  In Pokemon, each map is made of a grid of 16x16 pixel squares. Each square is composed of four 8x8 pixel tiles. This was done since Pokemon Yellow had to fit in *just* 503 KB of ROM so devs had to get very creative with how they stored the graphics data.
        </li>
      </ul>
    </div>
  );
}

export default App;
