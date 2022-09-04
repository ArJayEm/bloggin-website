/* eslint-disable */
import React, { useState, useEffect } from "react";
import Navigation from "../app/components/Navigation";
import { useParams } from "react-router";
import Container from "../app/components/Container";
import AboutMeSection from "../section/AboutMeSection";

export default function AboutMe() {
  const { id } = useParams();

  return (
    <>
      <Navigation />
      <Container>
        <AboutMeSection/>
      </Container>
    </>
  );
}
