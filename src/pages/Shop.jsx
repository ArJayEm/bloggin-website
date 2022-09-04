/* eslint-disable */
import React, { useState, useEffect } from "react";
import Navigation from "../app/components/Navigation";
import { useParams } from "react-router";
import Container from "../app/components/Container";
import ShopSection from "../section/ShopSection";

export default function Shop() {
  const { id } = useParams();

  return (
    <>
      <Navigation />
      <Container>
        <ShopSection/>
      </Container>
    </>
  );
}
