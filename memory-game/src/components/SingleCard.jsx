import React from "react";

const SingleCard = ({ card }) => {
  return (
    <>
      <div className="card" key={card.id}>
        <div>
          <img src={card.src} alt="card front" className="front" />
          <img src="/image/cover.png" alt="card-back" className="back" />
        </div>
      </div>
    </>
  );
};

export default SingleCard;
