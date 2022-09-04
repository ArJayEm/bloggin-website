/* eslint-disable */
import React from "react";
//import * as Icon from "react-bootstrap-icons";
import {
  imageLoading,
  cosplayManiaLogo,
  facebookLogo,
  gankNowLogo,
  instagramLogo,
  pinterestLogo,
  tiktokLogo,
  twitterLogo,
  youtubeLogo,
} from "../icons";

export default function SocialsSection() {
  var socialsArr = [
    // {
    //   title: "Cosplay Website",
    //   description: "Cosplay Website",
    //   link: "arjayemcosplay.netlify.app",
    //   iconType: "icon",
    //   icon: <Icon.Globe />,
    // },
    {
      title: "Facebook.com/arjayem.cosplay",
      description: "Facebook",
      link: "www.facebook.com/arjayem.cosplay",
      iconType: "img",
      icon: facebookLogo,
    },
    {
      title: "Youtube.com/ArJayEmCosplay",
      description: "Youtube",
      link: "www.youtube.com/channel/UCep5khamOUzX5Nu-09jkMbg",
      iconType: "img",
      icon: youtubeLogo,
    },
    {
      title: "Instagram.com/arjayem.cosplay",
      description: "Cosplay IG",
      link: "www.instagram.com/arjayem.cosplay",
      iconType: "img",
      icon: instagramLogo,
    },
    {
      title: "Twitter.com/@ArJayEmCosplay",
      description: "Twitter",
      link: "www.twitter.com/@ArJayEmCosplay",
      iconType: "img",
      icon: twitterLogo,
    },
    {
      title: "Tiktok.com/@arjayem.cosplay",
      description: "Tiktok",
      link: "www.tiktok.com/@arjayem.cosplay",
      iconType: "img",
      icon: tiktokLogo,
    },
    {
      title: "GankNow.com/ArJayEmCosplay",
      description: "Gank Now",
      link: "www.ganknow.com/ArJayEmCosplay",
      iconType: "img",
      icon: gankNowLogo,
    },
    {
      title: "CosplayMania.com/arjayem_cosplay",
      description: "Cosplay Mania",
      link: "www.cosplaymania.com/arjayem_cosplay",
      iconType: "img",
      icon: cosplayManiaLogo,
    },
    {
      title: "Pinterest.com/arjayemcosplay",
      description: "Pinterest",
      link: "www.pinterest.com/arjayemcosplay",
      iconType: "img",
      icon: pinterestLogo,
    },
    {
      title: "Instagram.com/arjayem.anime",
      description: "BNHA OC IG",
      link: "www.instagram.com/arjayem.anime",
      iconType: "img",
      icon: instagramLogo,
    },
  ];

  return (
    <div className="socials-container">
      <div className="card wide">
        {socialsArr.map((e, i) => {
          return (
            <div className="social" key={i}>
              <a
                href={"https://" + e.link}
                key={i}
                target="_blank"
                rel="noreferrer noopener"
              >
                {e.iconType === "icon" ? (
                  e.icon
                ) : (
                  <img className="icon" src={e.icon} alt="" />
                )}
                <span>
                  <small>{e.title}</small>
                  {e.description}
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
