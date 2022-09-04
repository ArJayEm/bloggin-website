import React from "react";
import { isMobile } from "react-device-detect";
import { imageLoading } from "../../icons/index";

export default function EventCard({ event, index, id }) {
  var last = event.eventDays.slice(event.eventDays.length - 1);
  var isOneDay = event.eventDays.length === 1;
  const days =
    "Day" +
    (!isOneDay ? "s " : " ") +
    event.eventDays.slice(0, event.eventDays.length - 1) +
    (!isOneDay ? " & " : " ") +
    last;

  return (
    <div className="event-card card" key={index} title="Read morevent...">
      <div className="description">
        <h2>{event.title}</h2>
        <h4>
          {event.startDate.toDateFormat({ format: "mmm dd" })} -{" "}
          {event.endDate.toDateFormat()}
        </h4>
        <h5>
          <span>Attended: {days}</span>
          {/* <span>{event.postedDate}</span> */}
        </h5>
        <p>{event.description}</p>
        <strong className="read-more">Read morevent...</strong>
      </div>
      {!id && (
        <div
          className="thumbnail"
          data-src={event.thumbnail}
          style={{
            backgroundImage:
              "url(" + (isMobile ? event.thumbnail : imageLoading) + ")",
            backgroundSize: isMobile ? "cover" : "contain",
          }}
        ></div>
      )}
    </div>
  );
}
