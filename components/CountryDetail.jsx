import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import CountryDetailShimmer from "./CountryDetailShimmer";

export default function CountryDetail() {
  const [isDark] = useTheme();
  const params = useParams();
  const countryName = params.country;
  const { state } = useLocation();
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  function updateData(data) {
    setCountryData({
      flag: data.flags.svg,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      topLevelDomain: data.tld,
      currency: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(" "),
      languages: Object.values(data.languages || {}).join(" , "),
      borders: [],
    });
    if (!data.borders) {
      return (data.borders = []);
    }

    Promise.all(
      data.borders?.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            return borderCountry.name.common;
          });
      })
    ).then((borders) => {
      setCountryData((prevState) => ({ ...prevState, borders }));
    });
  }
  useEffect(() => {
    if (state) {
      updateData(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateData(data);
      });
  }, [countryName]);

  if (notFound) {
    return <div>Country not found</div>;
  }

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="back-button"
        >
          <i className="fa-solid fa-arrow-left"></i>
          &nbsp; Back
        </span>
        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flag} alt={`${countryName} flag`} />
            <div className="details-text-container">
              <h1>{countryName}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: </b>
                  <span className="native-name">{countryData.nativeName}</span>
                </p>
                <p>
                  <b>Population: </b>
                  <span className="population">
                    {countryData.population.toLocaleString("en-IN")}
                  </span>
                </p>
                <p>
                  <b>Region: </b>
                  <span className="region">{countryData.region}</span>
                </p>
                <p>
                  <b>Sub Region: </b>
                  <span className="sub-region">{countryData.subregion}</span>
                </p>
                <p>
                  <b>Capital: </b>
                  <span className="capital">
                    {countryData.capital?.join(" , ")}
                  </span>
                </p>
                <p>
                  <b>Top Level Domain: </b>
                  <span className="top-level-domain">
                    {countryData.topLevelDomain}
                  </span>
                </p>
                <p>
                  <b>Currencies: </b>
                  <span className="currencies">{countryData.currency}</span>
                </p>
                <p>
                  <b>Languages: </b>
                  <span className="languages">{countryData.languages}</span>
                </p>
              </div>
              {countryData.borders.length != 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
