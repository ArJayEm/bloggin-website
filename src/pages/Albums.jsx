import React from "react";
import Navigation from "../app/components/Navigation";
import Container from "../app/components/Container";
import AlbumsSection from "../section/AlbumsSection";
import { useParams } from "react-router";

export default function Albums() {
  const { id, isLoggedIn } = useParams();
  return (
    <>
      <Navigation />
      <Container>
        <AlbumsSection id={id} isLoggedIn={isLoggedIn} />
      </Container>
    </>
  );
}
