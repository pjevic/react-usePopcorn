/** @format */

import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";

export default function Navbar({ movies }) {
  return (
    <nav className="navbar">
      <Logo />
      <Search />
      <NumResults />
    </nav>
  );
}
