"use client";
import React, { useState, useEffect } from "react";

export default function CardPet(props) {
  const [pet, setPet] = useState();

  useEffect(() => {
    setPet(props.pet);
  }, []);

  if (!pet) {
    return <div>Loading...</div>;
  }

  const isMinimal = props.isMinimal;
  const isProfile = props.isProfile;

  return (
    <>
      <div className={`card card__pet ${isMinimal} ${isProfile}`}>
        <div className="card__shadow"></div>

        {(isProfile || isProfile) ? (
          <div className="post__edit">
            <img className="post__image" src="./edit.svg" alt="" />
          </div>
        ) : null}

        {!isProfile && (
          <img className="pet__picture" src={pet.image} />
        )}

        <div className={`card__info ${isProfile ? 'post_info' : ''}`}>
          {!isProfile && (
            <p className="pet__name">{pet.name}</p>
          )}
          <p className="pet__sex">Sexo: {pet.sex}</p>
          <p className="pet__size">Porte: {pet.size}</p>
          <p className="pet__race">Raça: {pet.race}</p>
          <p className={`pet__age ${isProfile ? 'post__font' : ''}`}>Idade: {pet.age}</p>
          {isProfile ? (
            <p className="pet__about pet__about--post ">
              Sobre mim: {pet.about}
            </p>
          ) : (
            <p className="pet__about">
              <span className="post__font">Sobre mim:</span>
              {pet.about}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
