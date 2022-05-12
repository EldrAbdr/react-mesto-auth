import headerLogo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <a href="#" className="hover-transparent">
        <img className="header__logo" src={headerLogo} alt="Место" />
      </a>
    </header>
  );
}
