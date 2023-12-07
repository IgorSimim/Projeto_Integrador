/* eslint-disable @next/next/no-img-element */
"use client";
import "./header.css";

export default function Header(props) {
  return (
    <header>
      <div class="header-container">
        <div class="header-logo-and-links">
          <div class="header-logo-area">
            <div class="header-logo-box"></div>
          </div>
          <div class="header-links-container">
            <a href="#" class="header-links">
              Home
            </a>
            <a href="#" class="header-links">
              Postagens
              <img src="public/user/chevron-down.svg" alt="" />
            </a>
            <a href="#" class="header-links">
              ONG's/Parceiros
            </a>
            <a href="#" class="header-links">
              Contato
            </a>
          </div>
        </div>

        <div class="header-buttons">
          <button class="login-button">Entrar</button>
          <button class="signin-button">Cadastre-se</button>
        </div>
      </div>
    </header>
  );
}
