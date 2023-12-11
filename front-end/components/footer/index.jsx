/* eslint-disable @next/next/no-img-element */
"use client";
import "./footer.css";

export default function Footer(props) {
  return (
    <footer>
      <div id="footer" class="footer-container">
        <div class="footer-logo-area">
          <img src="../me_adota.png" alt="Logo Social pet" width="80px" height="80px" />
        </div>
        <div class="footer-content">
          Pelpet é o seu ponto central para adoção de pets. Nosso objetivo é conectar pessoas que desejam adotar com nossos parceiros, ONGs e protetores de animais. Unimos esforços para centralizar informações, promover a adoção responsável e compartilhar conhecimento sobre o bem-estar dos animais. Junte-se a nós nessa missão de dar um lar amoroso aos nossos amigos peludos.
        </div>

        <div class="footer-social">
          <p class="footer-social-title">Redes sociais</p>
          <span>
            <img class="footer-social-img" src="../footer/instagram.png" alt="" />
            <img class="footer-social-img" src="../footer/facebook.png" alt="" />
            <img class="footer-social-img" src="../footer/twitter.png" alt="" />
          </span>
        </div>

        <div class="footer-contact">
          <p>Contato: (053) 7692-1254</p>
          <p>Email: pelpet@gmail.com</p>
        </div>
      </div>
    </footer>
  )
}
