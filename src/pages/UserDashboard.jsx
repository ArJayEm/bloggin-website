/* eslint-disable */
import React, { useState, useEffect } from "react";

import Navigation from "../app/components/Navigation";
import Container from "../app/components/Container";
import Welcome from "../pages/Welcome";
import SocialsSection from "../section/SocialsSection";
import AboutMeSection from "../section/AboutMeSection";
import ShopSection from "../section/ShopSection";
import EventsSection from "../section/EventsSection";
import { isMobile } from "react-device-detect";
import { setActiveNavLink } from "../index";
import DeveloperSection from "../section/DeveloperSection";

const UserDashboard = ({ isLoggedIn }) => {
  const [currentSection, setCurrentSection] = useState(() => "");

  var navigationLinks = [
    { title: "Dashboard", link: "/dashboard", child: [<Welcome key="0" />] },
    {
      title: "About Me",
      link: "/aboutme",
      child: [<AboutMeSection key="0" />],
    },
    //{ title: "Gallery" },
    {
      title: "Events",
      link: "/events",
      child: [<EventsSection isLoggedIn={isLoggedIn} key="0" />],
    },
    { title: "Shop", link: "/shop", child: [<ShopSection key="0" />] },
    {
      title: "Socials",
      link: "/socials",
      child: [
        <SocialsSection isLoggedIn={isLoggedIn} key="0" />,
        <DeveloperSection key="1class" />,
      ],
    },
  ];

  var scrollTimer = -1;
  function onContainerScroll() {
    if (scrollTimer != -1) clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(switchNav, 100);
  }

  function switchNav() {
    var sections = Array.from(document.querySelectorAll("section"));
    sections.forEach((section) => {
      var position = section.getBoundingClientRect();

      if (position.top >= 0 && position.bottom <= window.innerHeight) {
        document.querySelectorAll("nav li a").forEach((link) => {
          link.classList.remove("active");
        });

        var id = section.getAttribute("id");
        setCurrentSection(id);

        var scrollHeight = document.querySelector(".container").scrollHeight;
        var scrollTop = document.querySelector(".container").scrollTop;
        var clientHeight = document.querySelector(".container").clientHeight;

        if (
          Math.round(scrollTop + clientHeight + (isMobile ? 0 : 1)) ===
          scrollHeight
        ) {
          document
            .querySelector("nav li a[href='#socials']")
            .classList.add("active");
          setCurrentSection("socials");
        } else {
          document
            .querySelector("nav li a[href='#" + id + "']")
            .classList.add("active");
        }
        if (isMobile) {
          setActiveNavLink(currentSection);
        }
        return;
      }
    });
  }

  return (
    <>
      <Navigation isDashboard="true" isLoggedIn={isLoggedIn} />
      <Container onScroll={onContainerScroll}>
        {navigationLinks.map((e, i) => {
          var id = e.title.toLocaleLowerCase().replace(/[ ]/g, "");
          var link = e.link || "/" + id;
          return (
            <section
              id={id}
              key={i}
              style={{
                backgroundImage:
                  i === 0
                    ? "url('https://firebasestorage.googleapis.com/v0/b/blogging-97ff7.appspot.com/o/dashboard%2FTVA%20Agent%20Void%20Loki%20watermarked.jpg?alt=media&token=e519b67e-28ab-4124-b489-958d1b624772')"
                    : "",
              }}
            >
              <h1 className="section-title">
                <a className="section-link" href={link}>
                  {e.title}
                </a>
              </h1>
              {e.child
                ? e.child.map((child, i) => {
                    return child;
                  })
                : e.title}
            </section>
          );
        })}
      </Container>
    </>
  );
};

export default UserDashboard;
