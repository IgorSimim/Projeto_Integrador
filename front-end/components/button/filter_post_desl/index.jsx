/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";

export default function ButtonFilter(props) {
  const [show, setShow] = useState(false);
  const [arrow, setArrow] = useState(false);

  useEffect(() => {
    setShow(false);
    setArrow(false);
  }, []);

  const toggleDropdown = function () {
    setShow(!show);
    setArrow(!arrow);
  };

  // precisa ver os tipos de dados pra ser renderizado

  return (
    <>
      <div className="dropdown__container" onClick={toggleDropdown}>
        <button className="dropdown__button" id="dropdown__button">
          Filtrar por
          <i className={`bx bx-chevron-down ${arrow ? 'arrow' : ''}`} id="arrow"></i>
        </button>

        <div className={`dropdown ${show ? 'show' : ''}`} id="dropdown">
          <span href="#create">
            <i className="bx bx-user-circle"></i>
            Nome
          </span>
          
          <span href="#draft">
            <i className="bx bx-calendar"></i>
            Sexo
          </span>
          
          <span href="#move">
            <i className="bx bx-folder"></i>
            Porte
          </span>

          <span href="#notification">
            <i className="bx bx-bell"></i>
            Raça
          </span>
        </div>
      </div>
    </>
  )

}