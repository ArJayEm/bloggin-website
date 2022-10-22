/* eslint-disable */
import React, { useState, useEffect } from "react";
import Container from "../app/components/Container";
import Navigation from "../app/components/Navigation";
import DeveloperSection from "../section/DeveloperSection";
import SocialsSection from "../section/SocialsSection";

export default function Socials() {
  return (
    <>
      <Navigation />
      <Container>
        <DeveloperSection/>
        <SocialsSection />
      </Container>
    </>
  );
}
