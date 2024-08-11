import React from "react";
import "./CountriesListShimmer.css";

export default function CountriesListShimmer() {
  // 1. Making an array from new Array() method
  // const arr = new Array(10).fill("Anurag").map((el) => {
  //   console.log(el);
  // });

  // 2. Making an array of 2nd method

  return (
    <div className="countries-container">
      {Array.from({ length: 10 }).map((el, index) => {
        return (
          <div key={index} className="country-card shimmer-card">
            <div className="flag-container"></div>
            <div className="card-text">
              <h3 className="card-title"></h3>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
