import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        Coded with <FontAwesomeIcon icon={faHeart} /> by{" "}
        <a href="https://www.linkedin.com/in/klaudia-holyst/" className="link">
          Klaudia
        </a>
        .
      </p>
      <p>
        Design from{" "}
        <a href="https://pomofocus.io/" className="link">
          https://pomofocus.io/
        </a>
      </p>
    </div>
  );
};

export default Footer;
