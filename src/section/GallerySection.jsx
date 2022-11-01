import React from "react";
import * as Icon from "react-bootstrap-icons";

const GallerySection = ({ id, isLoggedIn }) => {
  function addItems() {
    return (
      <div className="gallery-item">
        <Icon.Plus size={60} /> <span>Add Album</span>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-container">
        <div className="gallery-grid">
          {isLoggedIn && addItems}
          {Array.from(Array(15)).map((card, i) => {
            return (
              <div className="gallery-card">
                <div
                  className="thumbnail"
                  style={{
                    backgroundImage:
                      "url(https://static.wixstatic.com/media/dbd057_eb039fef05e6471a97d643aaee577708~mv2.jpg/v1/fill/w_313,h_313,fp_0.50_0.50,q_90,usm_1.00_0.66_0.01/dbd057_eb039fef05e6471a97d643aaee577708~mv2.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cm46YXBwOjZiZTRmNGFmMjAzOTQwOTVhZDY5Y2NjMzk4ODkyYzhkIiwib2JqIjpbW3sicGF0aCI6Ii9tZWRpYS9kYmQwNTdfZWIwMzlmZWYwNWU2NDcxYTk3ZDY0M2FhZWU1Nzc3MDh-bXYyLmpwZyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sImlzcyI6InVybjphcHA6NmJlNGY0YWYyMDM5NDA5NWFkNjljY2MzOTg4OTJjOGQiLCJpYXQiOjEwMDAsImp0aSI6IjE2NzI1MzEyMDAiLCJleHAiOjE2NzI1MzEyMDAsIndtayI6eyJwYXRoIjoiL21lZGlhLzhiYjQzOF8zOWE3OGI0NmQ0ZmU0NzA2OWRhNjNkYTkzNDhiNGVlNX5tdjIucG5nIiwib3BhY2l0eSI6MSwicHJvcG9ydGlvbnMiOjAuMSwiZ3Jhdml0eSI6Im5vcnRoLXdlc3QifX0.5LrQAZtEMIpWO3QTPzil6KalK0qqGrqxINfGDScFuIA)",
                  }}
                ></div>
                <h1 className="title">Card Title {i}</h1>
                <h3 className="description">Card Description {i}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GallerySection;
