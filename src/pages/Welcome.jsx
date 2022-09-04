/* eslint-disable */
import React, { useState, useEffect } from "react";
import { isBrowser, isMobile } from "react-device-detect";

export default function Welcome() {
  return (
    <>
      <div className="welcome-container">
        <p>
          Hello there! My cosplay name is 
          {isMobile && <br/>}
          <b> ArJayEm </b>
          {isMobile && <br/>}
           and welcome to my
          webpage.
        </p>
      </div>
    </>
  );
}
