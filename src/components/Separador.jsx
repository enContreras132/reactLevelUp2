import React from 'react';

export default function Separador() {
  return (
    <div className="container-fluid my-5">
      <div className="row align-items-center">
        <div className="col-md-7 ">
          <img
            src="https://images.unsplash.com/photo-1754820978711-611479056f97?..."
            alt=""
            className="img-fluid"
          />
        </div>

        <div className="col-md-5 ">
          <h3 className="bbh-sans-bartle-regular">Los mejores productos</h3>
          <h3 className="bbh-sans-bartle-regular">Los mejores productos</h3>
          <h3 className="bbh-sans-bartle-regular">Los mejores productos</h3>

          <h3 className="bbh-sans-bartle-regular">Al mejor precio</h3>
          <h3 className="bbh-sans-bartle-regular">Al mejor precio</h3>
          <h3 className="bbh-sans-bartle-regular">Al mejor precio</h3>

          <h3 className="bbh-sans-bartle-regular">Los mejores productos</h3>
          <h3 className="bbh-sans-bartle-regular">Los mejores productos</h3>
          <h3 className="bbh-sans-bartle-regular">Los mejores productos</h3>
        </div>
      </div>
    </div>
  );
}