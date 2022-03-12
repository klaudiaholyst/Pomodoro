import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  setSettingsActive: () => void;
}
const Header = (props: HeaderProps) => {
  return (
    <header className="containerWide header">
      <h1 className="h1">
        <FontAwesomeIcon icon={faCircleCheck} className="headerIcon" />
        Pomodoro timer. Focus!
      </h1>
      <button
        onClick={props.setSettingsActive}
        className="button button--settings"
      >
        <FontAwesomeIcon icon={faGear} className="headerIcon" />
        Settings
      </button>
    </header>
  );
};

export default Header;
