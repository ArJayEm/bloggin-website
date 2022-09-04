/* eslint-disable */
import React, { useState, useEffect } from "react";
import { isBrowser, isMobile } from "react-device-detect";
import { imageLoading } from "../icons/index";
import { loadImage } from "../index";

export default function AboutMeSection() {
  useEffect(
    () => {
      loadImage();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <div className="aboutme-container">
        <div className={"card wide"}>
          <p>
            I (officially) started cosplaying when I attended{" "}
            <a href="/events" className="reverse-link">
              Cosplay Mania 2018
            </a>
            , but I cosplayed characters wayback since 2011 when I cosplayed my
            Original Character (image A) where the theme is to use recycled
            materials for the costume (old cardboard boxes, bottles, etc.). I
            also cosplayed War Machine Mk 1 (gotta find images) &amp; 2 (image
            B) on 2013 during my college's foundation day parade.
          </p>
          <div className="figures">
            <div className="figure">
              <div
                className="figure-image"
                style={{
                  backgroundImage: "url('" + imageLoading + "')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
                data-src="https://firebasestorage.googleapis.com/v0/b/blogging-97ff7.appspot.com/o/CM_Photogrid_1661362481935.jpg?alt=media&token=64d7a608-fd92-44f6-9339-f70ab2a21bae"
              >
                {/* <img
                  src={imageLoading}
                  data-src="https://firebasestorage.googleapis.com/v0/b/blogging-97ff7.appspot.com/o/CM_Photogrid_1661362481935.jpg?alt=media&token=64d7a608-fd92-44f6-9339-f70ab2a21bae"
                  alt="highschool oc cosplay"
                /> */}
                <small className="caption">
                  image A: G. at Bb. Agham 2011 as my o.c. 'R-bEat'
                </small>
              </div>
            </div>
            <div className="figure">
              <div
                className="figure-image"
                style={{
                  backgroundImage: "url('" + imageLoading + "')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
                data-src="https://firebasestorage.googleapis.com/v0/b/blogging-97ff7.appspot.com/o/CM_Photogrid_1661366782464.jpg?alt=media&token=537abac3-b8c2-4e5a-b9ce-93979224f3bb"
              >
                {/* <img
                  src={imageLoading}
                  // src="https://firebasestorage.googleapis.com/v0/b/blogging-97ff7.appspot.com/o/CM_Photogrid_1661362602497.jpg?alt=media&token=0fe24c30-ed53-4b0e-91ba-31fe1738ac80"
                  data-src="https://firebasestorage.googleapis.com/v0/b/blogging-97ff7.appspot.com/o/CM_Photogrid_1661366782464.jpg?alt=media&token=537abac3-b8c2-4e5a-b9ce-93979224f3bb"
                  alt="college parade cosplay"
                /> */}
                <small className="caption">
                  image B: NPC 19th Foundation Day as 'War Machine Mk 2'
                </small>
              </div>
            </div>
          </div>
          <p>
            Since my first official convention, I also attended{" "}
            <a href="/events" className="reverse-link">
              Cosplay Mania 2019
            </a>
            . I really wanted to continue doing cosplay for the next coming
            years but then the pandemic happened, so 2020 (and 2021) was
            (mostly) skipped. I really expected 2021 to be the year for cosplay
            events could come back and finally on December they attempted to do{" "}
            <a href="/events" className="reverse-link">
              Cosplay Matsuri
            </a>
            . I did not let myself miss that since I prepared my next cosplan 11
            months prior.
          </p>
          <p>
            Starting 2022, I tried to attend more events. (Visit my{" "}
            <a href="#events" className="reverse-link">
              Events
            </a>{" "}
            page to see them).
            {/* Firstly last April
            on my very first <a href="/events">Cosplay Carnival</a>, then on
            July's <a href="/events">ToyCon PH</a> and the lastly{" "}
            <a href="/events">Anime Cosplay Expo</a>. */}
            I am also happy to more cosplays since I am now able to do it with
            my daughter. if you want to see them, just click the Events tab on
            the navigation above.
          </p>
          <p
            style={{
              width: "100%",
            }}
          >
            Happy browsing!
          </p>
        </div>
      </div>
    </>
  );
}
