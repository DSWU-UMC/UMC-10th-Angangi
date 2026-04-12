import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "홈", end: true },
  { path: "/popular", label: "인기 영화" },
  { path: "/now-playing", label: "상영 중" },
  { path: "/top-rated", label: "평점 높은" },
  { path: "/upcoming", label: "개봉 예정" },
];

export const Navbar = () => {
  return (
    <nav className="border-b bg-white px-4 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-5 font-semibold">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive
                ? "text-green-300"
                : "text-gray-500 transition hover:text-black"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
