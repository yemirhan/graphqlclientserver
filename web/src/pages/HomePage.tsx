import React from "react";
import { Footer } from "../components/Footer";
import GuestPage from "../components/GuestPage";
import Navigation from "../components/Navigation";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <GuestPage />
      <Footer />
    </>
  );
}
