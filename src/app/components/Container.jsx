import React, { useEffect } from "react";

export default function Container({ className, onScroll, children }) {
  className = className ? " " + className : "";

  useEffect(() => {
    // document
    //   .querySelector(".container")
    //   .addEventListener("scroll", function (e) {
    //     var scrollTop = e.currentTarget.scrollTop;
    //     var nav = document.querySelector(".navigation");
    //     if (scrollTop > 0) {
    //       //nav.style.height = 0; //.top = "-" + nav.clientHeight + "px";
    //       // setTimeout(function () {
    //       //   nav.style.opacity = 0;
    //       // }, 500);
    //     } else {
    //       //nav.style.height = "70px";
    //       // setTimeout(function () {
    //       //   nav.style.opacity = 1;
    //       // }, 300);
    //     }
    //   });
  }, []);

  return (
    <div className={"container" + className} onScroll={onScroll}>
      {children}
    </div>
  );
}
