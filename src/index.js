/* eslint-disable no-extend-native */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as EmailValidator from "email-validator";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

String.prototype.testEmail = function () {
  return EmailValidator.validate(this || "");
};

String.prototype.containsMinimumLength = function () {
  var regex = new RegExp(/(.{8,})/g);
  var password = this || "";
  return regex.test(password);
};
String.prototype.containsLowercase = function () {
  var regex = new RegExp(/([a-z])/g);
  var password = this || "";
  return regex.test(password);
};
String.prototype.containsUppercase = function () {
  var regex = new RegExp(/([A-Z])/g);
  var password = this || "";
  return regex.test(password);
};
String.prototype.containsNumbers = function () {
  var regex = new RegExp(/([0-9])/g);
  var password = this || "";
  return regex.test(password);
};
String.prototype.containsSpecial = function () {
  var regex = new RegExp(/([^A-Za-z0-9])/g);
  var password = this || "";
  return regex.test(password);
};

String.prototype.splitSpecial = function () {
  return (this || "").split(/([^A-Za-z0-9])/g);
  //.map((e, i) => e.splitNumber().filter((e, i) => e));
  //.filter((e, i) => !/([^A-Za-z0-9])/g.test(e));
};
String.prototype.splitNumber = function () {
  return (this || "").split(/([0-9])/g);
};

//money format
Number.prototype.toMoney = function () {
  //nn-ph
  return this.toLocaleString("en-ph", { style: "currency", currency: "php" });
};

//date formats
const monthsFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dateFormats = ["mmm dd, yyyy", "mmm d, yyyy", "yyyy-mm-dd", "mmm dd"];

String.prototype.splitFormat = function () {
  if (!this.isValidFormat()) throw new Error("Can't clean. Invalid date.");

  return this.replace(/[ ,0-9-/]/g, "|")
    .replaceAll("||", "|")
    .split("|");
};
String.prototype.isValidFormat = function () {
  return dateFormats.filter((e) => e === this + "").length === 1;
};
function throwIfInvalid(date) {
  try {
    if (!date.isDate()) throw new Error("Invalid date. " + date);
  } catch (e) {
    //console.log("check this date: ", date);
  }
}

String.prototype.toDateFormat = function (params) {
  throwIfInvalid(this);

  var formattedDate = [];
  var d = new Date(this);
  var format = (params && params.format) || dateFormats[0];
  var separator =
    (params && params.format.replace(/([A-Za-z0-9])/g, "").split("")[0]) || " ";

  if (format.isValidFormat()) {
    var splittedFormat = format.splitFormat();
    splittedFormat.forEach((format) => {
      if (format.indexOf("m") > -1) {
        formattedDate.push(d.getMonth().toMonth(format));
      } else if (format.indexOf("d") > -1) {
        formattedDate.push(
          d.getDate().toDate(format) + (format.indexOf("y") > -1 ? "," : "")
        );
      } else if (format.indexOf("y") > -1) {
        formattedDate.push(d.getFullYear().toYear(format));
      }
    });
  }
  return formattedDate.join(separator);
};

String.prototype.fromStringDate = function () {
  throwIfInvalid(this);

  var d = new Date(this);
  return d.toMonth() + " " + d.getDate() + ", " + d.getFullYear();
};

Number.prototype.toDate = function () {
  throwIfInvalid(this);

  var d = this || new Date(this).getDate();
  return d.padDate();
};

Number.prototype.padDate = function () {
  throwIfInvalid(this);

  var d = this + "";
  return "0".repeat(2 - (d + "").length) + (d + "");
};

String.prototype.formatDate = function () {
  // unfunushed
  // throwIfInvalid(this);
  // var d = this.getMonth();
};

String.prototype.toMonthYear = function (params) {
  throwIfInvalid(this);

  var m = (params && params.month) || "";
  var y = (params && params.year) || "";
  var d = new Date(this);
  return d.getMonth().toMonth(m) + " " + d.getFullYear().toYear(y);
};

Number.prototype.toMonth = function (params) {
  throwIfInvalid(this);

  if (
    params
      .toLocaleLowerCase()
      .split("")
      .map((e) => e === "m")
      .filter((e) => !e).length === 0
  ) {
    var d = this; //.getMonth();
    return params.length === 4
      ? monthsFull[d]
      : params.length === 3
      ? monthsShort[d]
      : (d + 1).padDate();
  }

  return "";
};

Number.prototype.toYear = function (params) {
  throwIfInvalid(this);

  if (
    params
      .toLocaleLowerCase()
      .split("")
      .map((e) => e === "y")
      .filter((e) => !e).length === 0 &&
    params.length % 2 === 0
  ) {
    var d = this + ""; //.getFullYear();
    return params.length === 2 ? d.substring(2, 4) : d;
  }

  return "";
};

const daysLetters = ["S", "M", "T", "W", "Th", "F", "Sa"];
const daysShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const daysAbbrev = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysLong = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//var daysFormat = ["short", "long", "abbrev", "letter"];
Date.prototype.toDay = function (params) {
  throwIfInvalid(this);
  var d = this.getDay();

  switch (params) {
    case "short":
      return daysShort[d];
    case "abbrev":
      return daysAbbrev[d];
    case "letter":
      return daysLetters[d];
    default:
      return daysLong[d];
  }
};

String.prototype.isDate = function () {
  return !isNaN(new Date(this).getDate());
};
String.prototype.lastUpdated = function (updatedDate) {
  throwIfInvalid(this);

  var createdDate = this || "";
  updatedDate = updatedDate || "";
  var lastUpdated = "";
  if (createdDate.isDate()) {
    if (updatedDate.isDate()) {
      //check if lastUpdated is greater than created date
      lastUpdated = updatedDate;
    }
  }

  return lastUpdated.toDateFormat();
};

String.prototype.difference = function (startDate) {
  throwIfInvalid(this);

  var end = new Date(this) || "";
  var start = new Date(startDate) || "";
  var difference = end.getTime() - start.getTime();
  let totalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return totalDays;
};

export function checkIfHasScrollBar() {
  var clientHeight = document.querySelector(".container").clientHeight;
  var scrollHeight = document.querySelector(".container").scrollHeight;
  //console.log(clientHeight, scrollHeight);
  //setHasScrollBar(clientHeight < scrollHeight);
  let hasScrollBar = clientHeight < scrollHeight;
  //console.log(hasScrollBar);
  return hasScrollBar;
}
export function loadImage() {
  var imgs = Array.from(document.querySelectorAll(".figure-image")); //img
  var thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
  imgs = imgs.concat(thumbnails);
  imgs.forEach((img) => {
    var position = img.getBoundingClientRect();
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
      var src = img.getAttribute("data-src");

      if (src) {
        //console.log(img);
        //img.setAttribute("src", src);
        img.style.backgroundImage = "url('" + src + "')";
        img.style.backgroundSize = "cover";
        img.setAttribute("data-src", "");
      }
    }
  });
}

export function setActiveNavLink(currentSection) {
  if (currentSection) {
    document.querySelectorAll("nav li a").forEach((link) => {
      link.classList.remove("active");
    });
    document
      .querySelector("nav li a[href='#" + currentSection + "']")
      .classList.add("active");
    console.log(currentSection);
  }
}
