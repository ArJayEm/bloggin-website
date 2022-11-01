import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";

const AlbumsSection = ({ id, isLoggedIn }) => {
  const [isDashboard, setIsDashboard] = useState(() => false);

  useEffect(
    () => {
      if (id != null) getGallery();
      else getAlbums();

      console.log(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function getGallery() {}

  function getAlbums() {
    var isDashboard = document
      .getElementById("root")
      .classList.contains("dashboard-nav");
    setIsDashboard(isDashboard);
  }

  function addAlbum(e) {
    e.preventDefault();
  }

  function addphotos(e) {
    e.preventDefault();
  }

  function onClickCard(e) {
    if (id) e.preventDefault();
  }

  var thumbnails = [
    {url: "https://firebasestorage.googleapis.com/v0/b/blogging-97ff7.appspot.com/o/thumbnails%2FAnime_and_Cosplay_Expo_2022_thumbnail.jpg?alt=media&token=ccfc766b-6b31-4976-a532-50659153ab84", orientation: "portrait"},
    {url: "https://firebasestorage.googleapis.com/v0/b/blogging-97ff7.appspot.com/o/dashboard%2FTVA%20Agent%20Void%20Loki%20watermarked.jpg?alt=media&token=e519b67e-28ab-4124-b489-958d1b624772", orientation: "landscape"},
    {url: "https://firebasestorage.googleapis.com/v0/b/blogging-97ff7.appspot.com/o/thumbnails%2FDoctor_Strange_and_the_Multiverse_of_Madness_Premiere_thumbnail.jpg?alt=media&token=4f71078c-b6a9-4685-bb69-d176b5ba9703", orientation: "portrait"},
  ];

  return (
    <>
      <div className="album-container">
        {isLoggedIn &&
          (id ? (
            <a className="add-items" href="/add-photos" onClick={addphotos}>
              <Icon.Plus size={60} /> <span>Add Photos</span>
            </a>
          ) : (
            <a className="add-album" href="/add-album" onClick={addAlbum}>
              <Icon.Plus size={60} /> <span>Add Album</span>
            </a>
          ))}
        <div className={"album-grid" + (id ? " album-photo" : "")}>
          {Array.from(Array(isDashboard ? 3 : 55)).map((card, i) => {
            var index = Math.floor(Math.random() * (3 - 0) + 0)
            //var thumbnail = ;
            // var img = new Image();
            // img.src = thumbnail;
            // var orientation = "even";
            // img.onload = function () {
            //   if (img.naturalWidth > img.naturalHeight) {
            //     orientation = "landscape";
            //   } else if (img.naturalWidth < img.naturalHeight) {
            //     orientation = "portrait";
            //   } else {
            //     orientation = "even";
            //   }
            // };
            return (
              <a
                className="album-card"
                key={i}
                title={i}
                href={"/albums/" + i}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => onClickCard(e)}
              >
                <div
                  className={index + " thumbnail " + thumbnails[index].orientation}
                  style={{
                    backgroundImage: "url(" + thumbnails[index].url + ")",
                  }}
                ></div>
                {!id && (
                  <>
                    <h1 className="title">Album {i}</h1>
                    <h3 className="description">Album {i}</h3>
                  </>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AlbumsSection;
