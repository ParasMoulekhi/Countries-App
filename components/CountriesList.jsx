import CountryCard from "./CountryCard";
import { useEffect, useState } from "react";
import CountriesListShimmer from "./CountriesListShimmer";
// import countriesData from "../countriesData";
const CountriesList = ({ query }) => {
  const [countriesData, setCountriesData] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setCountriesData(data);
        }, 1000);
      });
    // console.log(countriesData);

    // const intervalID = setInterval(() => {
    //   console.log("running countriesList component");
    // }, [1000]);
    // console.log(intervalID);

    // unmount -> when our component leave the page to unmount kehte hai
    return () => {
      // clearInterval(intervalID);
    };
  }, []);

  return (
    <>
      {countriesData.length == 0 ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          {countriesData
            .filter(
              (c) =>
                c.name.common.toLowerCase().includes(query) ||
                c.region.toLowerCase().includes(query)
            )
            .map((c) => (
              <CountryCard
                key={c.name.common}
                flag={c.flags.svg}
                name={c.name.common}
                population={c.population}
                region={c.region}
                capital={c.capital?.[0]}
                data={c}
              />
            ))}
        </div>
      )}
    </>
  );
};
export default CountriesList;
