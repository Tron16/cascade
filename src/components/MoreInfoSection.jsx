import { useEffect, useRef, useState } from "react";
import "./MoreInfoSection.css"; // Adjust the path if using a separate CSS file

const MoreInfoSection = () => {
  return (
    <section className={"more-info-section visible"}>
      <h2 className="more-info-title">Discover the Power of Cascade.Ai</h2>
      <p className="more-info-text">
        At Cascade.Ai, we empower your meetings with intelligent assistance that
        turns every discussion into a highly productive conversation. Our
        state-of-the-art AI tools ensure you never miss a beat—bringing clarity,
        efficiency, and engagement to your work.
      </p>
    </section>
  );
};

export default MoreInfoSection;
