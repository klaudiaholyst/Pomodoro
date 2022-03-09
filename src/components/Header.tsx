import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const Header: React.FC = () => {
  return (
    <header className="containerWide">
      <h1 className="h1">
        <FontAwesomeIcon icon={faCircleCheck} className="icon" />
        Pomodoro timer. Focus!
      </h1>
    </header>
  );
};

export default Header;
