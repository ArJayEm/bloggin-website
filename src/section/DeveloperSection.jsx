import React from "react";
import { arjayemLogo } from "../icons";
import * as Icon from "react-bootstrap-icons";

export default function DeveloperSection() {
  return (
    <div className="developer-container">
      <div className="card wide">
        <div class="app-logo">
          <div class="logo">
            <img className="icon" src={arjayemLogo} alt="arjayemLogo" />
          </div>
          <h2>ArJayEm</h2>
          <h3>All rights reserved © 2022</h3>
        </div>
        <div className="description">
          <h3 class="title">Developer</h3>
          <a href="/developerContact">
            <span>
              <Icon.EnvelopeFill />
              &nbsp;arjayem.developer@gmail.com
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
