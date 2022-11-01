import React from "react";
import Navigation from "../app/components/Navigation";
import Container from "../app/components/Container";
import GallerySection from "../section/GallerySection";

export default function Gallery() {
  return (
    <>
      <Navigation />
      <Container>
        <GallerySection/>
      </Container>
    </>
  );
}
