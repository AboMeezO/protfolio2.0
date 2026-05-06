import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import barba from "@barba/core";

const BarbaTransitions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    barba.init({
      preventRunning: true,
      prevent: () => true,
      transitions: [
        {
          name: "react-router-safe-transition",
          leave() {},
          enter() {},
        },
      ],
    });

    return () => barba.destroy();
  }, []);

  useEffect(() => {
    let transitionTimer;

    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = event.target.closest("a[href]");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (`${url.pathname}${url.search}${url.hash}` === `${location.pathname}${location.search}${location.hash}`) {
        return;
      }

      event.preventDefault();
      setActive(true);

      transitionTimer = window.setTimeout(() => {
        navigate(`${url.pathname}${url.search}${url.hash}`);
        window.setTimeout(() => setActive(false), 380);
      }, 220);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.clearTimeout(transitionTimer);
    };
  }, [location.hash, location.pathname, location.search, navigate]);

  return (
    <div
      aria-hidden="true"
      className={`barba-transition ${active ? "is-active" : ""}`}
    >
      <div className="barba-transition__panel barba-transition__panel--top" />
      <div className="barba-transition__panel barba-transition__panel--bottom" />
      <div className="barba-transition__beam green-pink-gradient" />
      <div className="barba-transition__core" />
    </div>
  );
};

export default BarbaTransitions;
