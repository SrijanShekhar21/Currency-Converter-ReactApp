import React from "react";

function Input(props) {
  return (
    <div className="inputDiv">
      <p>
        {props.name} :{" "}
        <span style={{ fontWeight: "bold", color: "black" }}>
          {props.currency.toUpperCase()}
        </span>
      </p>
      <p>CURRENCY</p>
      <input
        onChange={props.handleChange}
        type="number"
        value={props.value}
        className="input"
        disabled={props.name === "TO" ? true : false}
      />
      <div className="selectDiv">
        <select
          onChange={props.selectCurrency}
          name={props.name}
          id={props.name}
          className="select"
          value={props.currency}
        >
          {props.currencies.map((currency) => {
            return (
              <option value={currency} className="option">
                {currency.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Input;
