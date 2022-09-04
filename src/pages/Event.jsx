/* eslint-disable */
import { eventsCollection, firestore } from "../firebase";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

export default function Event({ id }) {
  const [event, setEvent] = useState(() => null);

  useEffect(
    () => {
      if (id) {
        getEvent();
        //console.log(event);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function getEvent() {
    await eventsCollection
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setEvent(() => snapshot.data());
        }
      })
      .catch((e) => {
        var msg = "get-event-error: " + e;
        console.error(msg);
      });
  }

  function getDays(eventDays) {
    var last = eventDays.slice(eventDays.length - 1);
    var isOneDay = eventDays.length === 1;
    const days =
      "Day" +
      (!isOneDay ? "s " : " ") +
      eventDays.slice(0, eventDays.length - 1) +
      (!isOneDay ? " & " : " ") +
      last;
    return days;
  }

  return (
    <>
      {event && (
        <>
          {/* <h1>Event Id: {event.description}</h1> */}
          <h1>{event.title}</h1>

          <h3>
            {event.startDate.toDateFormat({ format: "mmm dd" })} -{" "}
            {event.endDate.toDateFormat()}
          </h3>
          <h4>
            <span>Attended: {getDays(event.eventDays)}</span>
          </h4>
          {parse(event.description)}

          {event.fbAlbums && (
            <>
              <h4>Social media posts: </h4>
              <br />
              <br />
            </>
          )}
          <div className="fb-albums">
            {event.fbAlbums &&
              event.fbAlbums.map((album, i) => {
                const splittedURL = album.url.split("&");
                const width = splittedURL[1].split("=")[1];
                const height = splittedURL[4].split("=")[1];
                //console.log(splittedURL[0]);

                return (
                  <iframe
                    key={i}
                    //longDesc={album.url}
                    src={album.url}
                    title={"Facebook Album " + (i + 1)}
                    width={width}
                    height={height}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
