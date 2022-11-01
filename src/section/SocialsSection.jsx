/* eslint-disable */
import React, { useEffect, useState } from "react";
import { socialsCollection } from "../firebase";
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

export default function SocialsSection({ isLoggedIn }) {
  const [socials, setSocials] = useState(() => null);
  // var socialsArr = [
  //   // {
  //   //   title: "Cosplay Website",
  //   //   description: "Cosplay Website",
  //   //   link: "arjayemcosplay.netlify.app",
  //   //   iconType: "icon",
  //   //   //icon: <Icon.Globe />,
  //   // },
  //   {
  //     title: "Facebook.com/arjayem.cosplay",
  //     description: "Facebook",
  //     link: "www.facebook.com/arjayem.cosplay",
  //     iconType: "img",
  //     //icon: facebookLogo,
  //     filename: "facebook.ico",
  //   },
  //   {
  //     title: "Youtubsocial.com/ArJayEmCosplay",
  //     description: "Youtube",
  //     link: "www.youtubsocial.com/channel/UCep5khamOUzX5Nu-09jkMbg",
  //     iconType: "img",
  //     //icon: youtubeLogo,
  //     filename: "youtubsocial.ico",
  //   },
  //   {
  //     title: "Instagram.com/arjayem.cosplay",
  //     description: "Cosplay IG",
  //     link: "www.instagram.com/arjayem.cosplay",
  //     iconType: "img",
  //     //icon: instagramLogo,
  //     filename: "instagram.png",
  //   },
  //   {
  //     title: "Twitter.com/@ArJayEmCosplay",
  //     description: "Twitter",
  //     link: "www.twitter.com/@ArJayEmCosplay",
  //     iconType: "img",
  //     //icon: twitterLogo,
  //     filename: "twitter.ico",
  //   },
  //   {
  //     title: "Tiktok.com/@arjayem.cosplay",
  //     description: "Tiktok",
  //     link: "www.tiktok.com/@arjayem.cosplay",
  //     iconType: "img",
  //     //icon: tiktokLogo,
  //     filename: "tiktok_circlsocial.png",
  //   },
  //   {
  //     title: "GankNow.com/ArJayEmCosplay",
  //     description: "Gank Now",
  //     link: "www.ganknow.com/ArJayEmCosplay",
  //     iconType: "img",
  //     //icon: gankNowLogo,
  //     filename: "ganknow.ico",
  //   },
  //   {
  //     title: "CosplayMania.com/arjayem_cosplay",
  //     description: "Cosplay Mania",
  //     link: "www.cosplaymania.com/arjayem_cosplay",
  //     iconType: "img",
  //     //icon: cosplayManiaLogo,
  //     filename: "cosplaymania_logo.jpg",
  //   },
  //   {
  //     title: "Pinterest.com/arjayemcosplay",
  //     description: "Pinterest",
  //     link: "www.pinterest.com/arjayemcosplay",
  //     iconType: "img",
  //     //icon: pinterestLogo,
  //     filename: "pinterest.png",
  //   },
  //   {
  //     title: "Instagram.com/arjayem.anime",
  //     description: "BNHA OC IG",
  //     link: "www.instagram.com/arjayem.anime",
  //     iconType: "img",
  //     //icon: instagramLogo,
  //     filename: "instagram.png",
  //   },
  // ];

  useEffect(
    () => {
      //saveSocials();
      getSocials();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function getSocials() {
    var col = isLoggedIn
      ? socialsCollection
      : socialsCollection.where("isShown", "==", true);

    await col
      .orderBy("filename")
      .get()
      .then((snapshots) => {
        setSocials(() =>
          snapshots.docs.map((e) => {
            return e.data();
          })
        );
      })
      .then(() => {})
      .catch((e) => {
        var msg = "get-events-error: " + e;
        consolsocial.error(msg);
      });
  }

  const handleChange = (chb, checked) => {
    chb.target.checked = chb.target.checked;
  };

  return (
    <div className="socials-container">
      <div className="card wide">
        {socials &&
          socials.map((social, i) => {
            return (
              <div className="social" key={i}>
                <a
                  href={"https://www." + social.link}
                  key={i}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    className="icon"
                    src={
                      `${process.env.PUBLIC_URL}/assets/icons/` +
                      social.filename
                    }
                    alt={social.filename}
                  />
                  <span>
                    {social.title}
                    <small>{social.description}</small>
                  </span>
                </a>
                {isLoggedIn && (
                  <input
                    type="checkbox"
                    checked={social.isShown}
                    onChange={(chb) => handleChange(chb, social.isShown)}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
