/* eslint-disable */
import React, { useState, useEffect } from "react";
import { eventsCollection, firestore } from "../firebase";
import { isBrowser, isMobile } from "react-device-detect";
import * as Icon from "react-bootstrap-icons";
import { imageLoading } from "../icons/index";
import FileUploader from "../app/components/FileUploader";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { loadImage } from "../index";
import Event from "../pages/Event";
import EventCard from "../app/components/EventCard";

const EventsSection = ({ id, isLoggedIn }) => {
  const [events, setEvents] = useState(() => null);
  const [addEvent, setAddEvent] = useState(() => false);
  //const [isLoggedIn, setIsLoggedIn] = useState(() => false);
  var maxDate = new Date()
    .toDateString()
    .toDateFormat({ format: "yyyy-mm-dd" });

  const [title, setTitle] = useState(() => "");
  const [caption, setCaption] = useState(() => "");
  const [description, setDescription] = useState(() => "");
  const [startDate, setStartDate] = useState(() =>
    new Date().toDateString().toDateFormat({ format: "yyyy-mm-dd" })
  );
  const [endDate, setEndDate] = useState(() =>
    new Date().toDateString().toDateFormat({ format: "yyyy-mm-dd" })
  );
  const [eventDays, setEventDays] = useState(() => []);
  const [file, setFile] = useState(() => "");
  const [thumbnail, setThumbnail] = useState(() => "");

  const [fileUploadPercent, setFileUploadPercent] = useState(() => 0);
  const [eventSaving, setEventSaving] = useState(() => false);
  const [daysOption, setDaysOption] = useState(() => []);

  const [event, setEvent] = useState(() => null);

  useEffect(
    () => {
      //console.log(hasScrollBar);
      getEvents();
      // if (id && events) {
      //   //console.log(events.filter((e, i) => e.id === id)[0]);
      //   setEvent(events.filter((e, i) => e.id === id)[0]);
      // }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      if (addEvent) {
        daysSelection();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endDate]
  );

  useEffect(
    () => {
      loadImage();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [events]
  );

  async function getEvents() {
    var isDashboard = document
      .getElementById("root")
      .classList.contains("dashboard-nav");

    var limitedEventCOllection = isDashboard
      ? eventsCollection.limit(isMobile ? 4 : 3)
      : eventsCollection;

    await limitedEventCOllection
      .orderBy("startDate", "desc")
      .get()
      .then((snapshots) => {
        setEvents(() =>
          snapshots.docs.map((e) => {
            return e.data();
          })
        );
      })
      .then(() => {})
      .catch((e) => {
        var msg = "get-events-error: " + e;
        console.error(msg);
      });
  }

  function onAddEvent(e) {
    e.preventDefault();
    //document.querySelector(".container").scrollTop = 0;
    setTimeout(function () {
      setAddEvent(!addEvent);
      var root = document.getElementById("root");
      if (root.classList.contains("in-modal"))
        root.classList.remove("in-modal");
      else root.classList.add("in-modal");
    }, 300);
  }

  function onEventDayCheckChange(e) {
    var value = e.target.value;
    var eventCheckboxes = document.querySelectorAll(
      ".add-event-modal .event-days-checkbox:checked"
    );
    if (e.target.checked === true) {
      e.target.parentElement.classList.add("checked");
    }
    //setEventDays(() => []);
    var days = [];
    eventCheckboxes.forEach((e, i) => {
      days.push(e.value);
    });
    setEventDays(() => days);
    console.log(days);
  }

  async function onSaveEvent(e, url) {
    e.preventDefault();
    setEventSaving(true);

    await eventsCollection
      .add({
        title: title,
        caption: caption,
        description: description,
        startDate: startDate,
        endDate: endDate,
        eventDays: eventDays,
        thumbnail: thumbnail || url,
        postedDate: new Date(Date.now()),
      })
      .then((document) => {
        eventsCollection
          .doc(document.id)
          .update({ id: document.id })
          .catch((e) => {
            var msg = "event-update-error: " + e;
            console.error(msg);
            alert(msg);
          });
      })
      .catch((e) => {
        var msg = "event-insert-error: " + e;
        console.error(msg);
        alert(msg);
      });
    setEventSaving(false);
  }

  async function handleFileUpload(e) {
    if (!file) {
      alert("Please upload an image first!");
    }

    setEventSaving(true);

    var blob = file.slice(0, file.size, file.type);
    var fileExt = file.name.substring(file.name.indexOf("."));
    var fileName = title.replace(/([^0-9A-Za-z])/g, "_") + "_thumbnail";
    var newFile = new File([blob], fileName + fileExt, { type: file.type });
    //setFile(newFile);

    const storage = getStorage();
    const storageRef = ref(storage, `/thumbnails/${newFile.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, newFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setFileUploadPercent(percent);
      },
      (e) => {
        var msg = "image-upload-error: " + e;
        console.error(msg);
        alert(msg);
        setEventSaving(false);
      },
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setThumbnail(url);
          onSaveEvent(e, url);
        });
      }
    );
    setEventSaving(false);
  }

  function setDate(e, dateType) {
    if (dateType === "start") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  }

  function daysSelection() {
    if (startDate && endDate) {
      let end = new Date(endDate); //endDate ? new Date(endDate) : new Date(Date.now());
      let start = new Date(startDate); //startDate ? new Date(startDate) : new Date(Date.now());

      if (end >= start) {
        let difference = end.toString().difference(start.toDateString()); // end.getTime() - start.getTime();
        var daysArray = Array.from(Array(difference).keys());
        setDaysOption(() => daysArray);
        console.log(daysOption, daysArray);
      } else {
        alert("Start Date can't be greater than End Date.");
        //setEndDate(() => new Date(Date.now()));
      }
    }
  }

  function onFileSelected(e, file) {
    setFile(file);
    e.target.parentElement.classList.add("checked");
  }

  function addEventModal() {
    return (
      <div id="modal">
        <div className="add-event-modal modal">
          <div className="modal-title">
            <h1>Add Event</h1>
            <Icon.X
              className="close"
              size={35}
              title="Close"
              onClick={(e) => {
                onAddEvent(e);
              }}
            />
          </div>
          <form>
            <div className={"form-group grid-" + (isMobile ? "12" : "8")}>
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                autoFocus
                defaultValue={title}
                onKeyUp={(e) => setTitle(e.currentTarget.value)}
                disabled={eventSaving}
                autoComplete="true"
              />
            </div>
            {/* <div className={"form-group grid-" + (isMobile ? "12" : "4")}>
              <label>Caption</label>
              <input
                type="text"
                className="form-control"
                placeholder="Caption"
                defaultValue={caption}
                onKeyUp={(e) => setCaption(e.currentTarget.value)}
                disabled={eventSaving}
                autoComplete="true"
              />
            </div> */}
            <div className={"form-group grid-" + (isMobile ? "12" : "4")}>
              <label>Start Date</label>
              <input
                id="StartDate"
                type="date"
                className="form-control"
                onChange={(e) => setDate(e, "start")}
                defaultValue={startDate}
                max={maxDate}
                disabled={eventSaving}
              />
            </div>
            <div className={"form-group grid-" + (isMobile ? "12" : "4")}>
              <label>End Date</label>
              <input
                id="EndDate"
                type="date"
                className="form-control"
                onChange={(e) => setDate(e, "end")}
                defaultValue={endDate}
                max={maxDate}
                disabled={eventSaving}
              />
            </div>
            {daysOption &&
              daysOption.map((e, i) => {
                var day = e + 1;
                return (
                  <div
                    className={"form-group grid-" + (isMobile ? "12" : "4")}
                    key={i}
                  >
                    <label>&nbsp;</label>
                    <label htmlFor={"Day" + day} className="form-control">
                      <input
                        type="checkbox"
                        className="event-days-checkbox"
                        value={day}
                        id={"Day" + day}
                        onChange={(e) => onEventDayCheckChange(e)}
                      />
                      {"Day " + day}
                    </label>
                  </div>
                );
              })}
            <div className={"form-group grid-" + (isMobile ? "12" : "4")}>
              <label>Thumbnail</label>
              <FileUploader
                accept={"image/*"}
                onFileSelectSuccess={(e, file) => onFileSelected(e, file)}
                onFileSelectError={({ error }) => alert(error)}
                disabled={eventSaving}
              />
            </div>
            {file && (
              <div>
                Thumbnail preview: <img src={file} />
              </div>
            )}
            <div className="form-group grid-12">
              <label>Description</label>
              <textarea
                name=""
                id=""
                className="form-control"
                placeholder="Description"
                rows="10"
                onKeyUp={(e) => setDescription(e.currentTarget.value)}
                defaultValue={description}
                disabled={eventSaving}
                autoCorrect="true"
              ></textarea>
            </div>
            <div className="form-group grid-12 actions">
              <h5>
                {eventSaving &&
                  "Uploading thumbnail:" + fileUploadPercent + "% done"}
              </h5>
              <button
                className="btn btn-primary"
                type="button"
                title="Save"
                //onClick={(e) => onSaveEvent(e)}
                onClick={(e) => handleFileUpload(e)}
                disabled={eventSaving}
              >
                <Icon.Save /> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function viewEventSection() {
    return (
      <section className="event">
        {/* <h1>Event Id: {id && JSON.stringify(events.filter((e, i) => e.id === id)[0])}</h1> */}
        <Event id={id} />
      </section>
    );
  }

  return (
    <>
      {addEvent && addEventModal()}
      <div className={"events-container" + (id ? " view-event" : "")}>
        {/* {isMobile && (
          <div className="controls left">
            <Icon.ChevronLeft size={40} color="gold" />
          </div>
        )} */}
        {id && viewEventSection()}
        <div className="event-links list-view">
          {(
            <a
              href="#"
              className="add-card card"
              title="Add Event"
              onClick={(e) => onAddEvent(e)}
            >
              <Icon.Plus size={60} /> <span>Add Event</span>
            </a>
          )}
          {events &&
            events
              //.filter((e, i) => e.id !== id)
              .map((event, i) => {
                return (
                // event.id !== id ? (
                //   <a href={"/events/" + event.id} key={i}>
                //     <EventCard event={event} index={i} id={id} />
                //   </a>
                // ) : (
                  <EventCard isSelected={event.id === id} event={event} index={i} id={id} />
                );
              })}
        </div>

        {/* {isMobile && (
          <div className="controls right">
            <Icon.ChevronRight size={40} color="gold" />
          </div>
        )} */}
      </div>
    </>
  );
};

export default EventsSection;
