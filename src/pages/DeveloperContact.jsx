import React from "react";
import Navigation from "../app/components/Navigation";
import Container from "../app/components/Container";
import ContactDeveloperSection from "../section/ContactDeveloperSection";

export default function DeveloperContact() {
  return (
    <>
      <Navigation />
      <Container>
        <ContactDeveloperSection />
      </Container>
    </>
  );
}
