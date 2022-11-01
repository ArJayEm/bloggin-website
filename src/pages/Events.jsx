/* eslint-disable */
import React from "react";
import EventsSection from "../section/EventsSection";
import Navigation from "../app/components/Navigation";
import { useParams } from "react-router";
import Container from "../app/components/Container";

export default function Events() {
  const { id, isLoggedIn } = useParams();

  return (
    <>
      <Navigation />
      <Container>
        <EventsSection id={id} isLoggedIn={isLoggedIn} />
      </Container>
    </>
  );
}
