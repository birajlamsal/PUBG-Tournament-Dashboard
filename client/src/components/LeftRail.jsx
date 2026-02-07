import { NavLink } from "react-router-dom";
import {
  Flame,
  Trophy,
  Newspaper,
  Swords,
  Users,
  BarChart3,
  Gamepad2
} from "lucide-react";

const LeftRail = () => {
  const items = [
    { icon: Flame, label: "Home", to: "/" },
    { icon: Trophy, label: "Tournaments", to: "/tournaments" },
    { icon: Swords, label: "Scrims", to: "/scrims" },
    { icon: Newspaper, label: "News", to: "/announcements" },
    { icon: Users, label: "Contact us", to: "/contact" }
  ];

  return (
    <nav className="twire-rail" aria-label="Primary">
      <div className="twire-rail__inner">
        {items.map((it, idx) => {
          const Icon = it.icon;
          return (
            <NavLink
              key={it.label}
              to={it.to}
              className={({ isActive }) =>
                `twire-rail__item ${isActive ? "is-active" : ""}`
              }
              title={it.label}
            >
              <Icon className="twire-rail__icon" />
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default LeftRail;
