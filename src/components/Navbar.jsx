import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo } from "../assets";
import { blogs } from "../utils/blogs";

const hasBlogs = blogs.length > 0;

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [toggle]);

  const mobileLinks = [
    ...navLinks.map((nav) => ({
      id: nav.id,
      title: nav.title,
      href: isHome ? `#${nav.id}` : `/#${nav.id}`,
      isRoute: false,
      isActive: active === nav.title,
    })),
    {
      id: "projects",
      title: "Projects",
      href: "/projects",
      isRoute: true,
      isActive: location.pathname.startsWith("/projects"),
    },
    ...(hasBlogs
      ? [
          {
            id: "blogs",
            title: "Blogs",
            href: "/blogs",
            isRoute: true,
            isActive: location.pathname.startsWith("/blogs"),
          },
        ]
      : []),
  ];

  const closeMobileMenu = (title = "") => {
    setToggle(false);
    if (title) setActive(title);
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-screen-2xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-9 h-9 object-contain rounded-md"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            AboTasneem &nbsp;
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={isHome ? `#${nav.id}` : `/#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li
            className={`${
              location.pathname.startsWith("/projects") ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
          >
            <Link to="/projects">Projects</Link>
          </li>
          {hasBlogs && (
            <li
              className={`${
                location.pathname.startsWith("/blogs") ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
            >
              <Link to="/blogs">Blogs</Link>
            </li>
          )}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={toggle}
            onClick={() => setToggle((current) => !current)}
            className="relative z-40 flex h-11 w-11 items-center justify-center rounded-full bg-tertiary shadow-card"
          >
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                toggle ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                toggle ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                toggle ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>

          <div
            className={`mobile-nav-overlay fixed inset-0 z-30 flex flex-col justify-between bg-primary/80 px-6 pb-10 pt-28 backdrop-blur-xl transition-all duration-500 ease-out ${
              toggle
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-6 opacity-0"
            }`}
          >
            <div className="relative z-10">
              <ul className="flex list-none flex-col gap-3">
                {mobileLinks.map((nav, index) => {
                  const linkClassName = `mobile-nav-link ${
                    nav.isActive ? "mobile-nav-link--active" : ""
                  }`;

                  return (
                    <li
                      key={nav.id}
                      className="mobile-nav-item"
                      style={{ "--nav-delay": `${index * 70}ms` }}
                    >
                      {nav.isRoute ? (
                        <Link
                          to={nav.href}
                          className={linkClassName}
                          onClick={() => closeMobileMenu(nav.title)}
                        >
                          {nav.title}
                        </Link>
                      ) : (
                        <a
                          href={nav.href}
                          className={linkClassName}
                          onClick={() => closeMobileMenu(nav.title)}
                        >
                          {nav.title}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div aria-hidden="true" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
