import React, { useState, useEffect } from "react";
import Input from "./Input";
import axios from "axios";

function Body() {
  const [fromValue, setFromValue] = React.useState(1);
  const [toValue, setToValue] = React.useState(0);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [currencies, setCurrencies] = useState([]);

  function selectCurrency(e) {
    if (e.target.name === "FROM") {
      setFromCurrency(e.target.value);
    } else {
      setToCurrency(e.target.value);
    }
  }

  useEffect(() => {
    setFromCurrency("usd");
    setToCurrency("inr");
    axios
      .get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
      )
      .then((res) => {
        console.log(res.data["usd"]["inr"]);
        setToValue(fromValue * res.data["usd"]["inr"]);
        setCurrencies(Object.keys(res.data["usd"]));
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
      )
      .then((res) => {
        console.log(res.data[fromCurrency][toCurrency]);
        setToValue(fromValue * res.data[fromCurrency][toCurrency]);
      });
  }, [fromValue, toCurrency, fromCurrency]);

  function handleChange(e) {
    console.log(e.target.value);
    setFromValue(e.target.value);
  }

  function handleClick() {
    //swap
    let temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  return (
    <div className="body">
      <div className="container">
        <Input
          name="FROM"
          currency={fromCurrency}
          value={fromValue}
          currencies={currencies}
          handleChange={handleChange}
          selectCurrency={selectCurrency}
        />
        <button onClick={handleClick} className="swap">
          SWAP
        </button>
        <Input
          name="TO"
          currency={toCurrency}
          value={toValue}
          currencies={currencies}
          handleChange={handleChange}
          selectCurrency={selectCurrency}
        />
      </div>
    </div>
  );
}

export default Body;
