import headerLogo from "../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header({
  userEmail,
  cornerLinkText,
  path,
  onCornerLinkClick,
}) {
  return (
    <header className="header">
      <a href="#" className="hover-transparent">
        <img className="header__logo" src={headerLogo} alt="Место" />
      </a>
      <div className="header__navBlock">
        <Link to="/" className="header__text">
          {userEmail}
        </Link>
        <Link to={path} onClick={onCornerLinkClick} className="header__text">
          {cornerLinkText}
        </Link>
      </div>
      <button className="header__navButton" />
    </header>
  );
}
