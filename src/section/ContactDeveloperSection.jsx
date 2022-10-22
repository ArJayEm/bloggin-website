import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import * as Icon from "react-bootstrap-icons";

export default function ContactDeveloperSection() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("");
    setError("");
    var errors = [];

    document.querySelectorAll("form .form-control").forEach((control, i) => {
      //var name = control.name;
      var value = control.value;
      var placeholder = "'" + control.placeholder + "'";
      var isValidEmail =
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );

      if (value) {
        if (
          placeholder === "'Email'" &&
          (!isValidEmail || value.indexOf(".com") === -1)
        ) {
          errors.push(placeholder);
        }
      } else {
        errors.push(placeholder);
      }
    });

    if (errors.length > 0) {
      console.log(errors);
      setError(errors.join(", ") + " required!");
    } else {
      emailjs
        .sendForm(
          "service_vepsail",
          //"template_0hztmxj",
          "template_sy777g9",
          form.current,
          "M17P3nl33JpJUGayn"
        )
        .then(
          (result) => {
            console.log(result.text);
            setStatus(result.text);
            e.target.reset();
          },
          (error) => {
            //setError(error.text);
            console.log(error.text);
          }
        );
    }
  };

  return (
    <form id="ContactUs" ref={form} onSubmit={sendEmail}>
      <h2>Developer Contact</h2>
      <div className="form-group">
        <label>Your Name</label>
        <input
          type="text"
          className="form-control"
          name="from_name"
          placeholder="Name"
          title="Name"
        />
      </div>
      <div className="form-group">
        <label>Your Email</label>
        <input
          type="email"
          className="form-control"
          name="from_email"
          placeholder="Email"
          title="Email"
        />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea
          className="form-control"
          name="message"
          placeholder="Message"
          title="Message"
          rows="5"
        />
      </div>
      <div className="form-group">
        {status && <span className="text-success">Email sent!</span>}
        {error && <span className="text-danger">Email not sent. {error}</span>}
        <button type="submit" className="btn btn-primary" value="Send">
          <Icon.Send /> Send
        </button>
      </div>
    </form>
  );
}
