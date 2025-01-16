
import LoginButton from './LoginButton'

const Navbar = ({ navOpen }) => {
  const navItems = [
    {
      label: "Home",
      link: "#home",
      className: "nav-item active"
    },
    {
      label: "Explore Menu",
      link: "#exploreMenu",
      className: "nav-item"
    },
    {
      label: "Recipes",
      link: "#recipes",
      className: "nav-item"
    },
    {
      label: "Contact Us",
      link: "#contactUs",
      className: "nav-item"
    }
  ]
  return (
    <nav className={'custom-navbar ' + (navOpen ? "active" : "")}>
      {navItems.map(({ label, link, className }, key) => (
        <a href={link} key={key}  className={className}>
          {label}
        </a>
      ))}
      <LoginButton label={"Login"} className={"md:hidden"}/>
    </nav>
  )
}

export default Navbar