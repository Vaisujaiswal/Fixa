import { NavLink, useLocation, useNavigate } from "react-router-dom";

const ScrollNavLink = ({ to, children, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (location.pathname === to) {
      // 👇 Already on the page → force scroll
      window.scrollTo({ top: 0, behavior: "smooth" });
      e.preventDefault(); // prevent re-navigating
    } else {
      navigate(to); // normal navigation
    }
  };

  return (
    <NavLink to={to} onClick={handleClick} {...props}>
      {children}
    </NavLink>
  );
};

export default ScrollNavLink;
