import { Search, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="twire-header">
      <div className="twire-header__inner">
        <div className="twire-brand">
          <img
            className="twire-brand__icon"
            src="/logo/Main_Logo.png"
            alt="ApexGrid logo"
          />
        </div>

        <button className="twire-game" type="button">
          <span>PUBG</span>
          <ChevronDown className="twire-icon" />
        </button>

        <div className="twire-search">
          <Search className="twire-icon" />
          <input placeholder="Search tournaments, teams..." />
        </div>

        <a className="twire-contact twire-contact--fixed" href="/contact">
          Contact us
        </a>

        <button className="twire-lang" type="button" aria-label="Language">
          EN
        </button>
      </div>
    </header>
  );
};

export default Header;
