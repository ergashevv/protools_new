import React from "react";
import "../global.scss";

function LinearCard({
  image,
  headline,
  title,
  description,
  date,
  videoLink,
  videoLinkTitle,
  onCardClick,
}) {
  const handleCardClick = () => {
    onCardClick({
      image,
      headline,
      title,
      description,
      date,
      videoLink,
      videoLinkTitle,
    });
  };

  return (
    <>
      {videoLink && (
        <div className="linearCard" onClick={handleCardClick}>
      <img className="linearCard__image" src={image} alt="img" />
      <div className="linearCard__content">
        <p className="linearCard__details">
          {headline} • {date}
        </p>
        <h2 className="linearCard__title">{title}</h2>
        <p className="linearCard__description">{description}</p>
      </div>
    </div>
      )}
    </>
  );
}

export default LinearCard;
