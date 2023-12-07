/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import "./pet-world.css";

export default function PetWorld(props) {
  return (
    <div class="pet-world-container">
        <div class="pet-world-wrapper">
            <div class="pet-world-header">
                <h1 class="pet-world-title">Bem-vindo ao Nosso Mundo Pet!</h1>
                <span class="pet-world-subtitle">No Nosso Mundo Pet, acreditamos que todos os animais merecem amor, cuidado e um lar. Somos mais do que um site, somos uma comunidade dedicada a centralizar informações, compartilhar histórias e criar um espaço inclusivo para amantes de animais de todas as formas e tamanhos.</span>
            </div>

            <div class="pet-world-content">
                <div class="pet-world-content-head">
                    <img src="public/our-pet-world/image_2.svg" width="110px" height="110px" />
                    <span class="pet-world-content-name">Propósito</span>

                    <p class="pet-world-content-context">
                        Unir amantes de animais, compartilhar conhecimento e promover a compaixão pelos nossos amigos peludos. Somos um ponto de encontro para todos que desejam fazer a diferença na vida dos animais e criar um mundo onde cada animal de estimação seja amado e cuidado.
                    </p>
                </div>

                <div class="pet-world-content-head">
                    <img src="public/our-pet-world/image_1.svg" />
                    <span class="pet-world-content-name">Objetivo</span>

                    <p class="pet-world-content-context">
                        Nosso objetivo é fornecer recursos, informações e inspiração para todos que desejam melhorar a vida dos animais de estimação. Queremos ser uma fonte confiável para adoção responsável, cuidados amorosos e conscientização sobre os direitos dos animais, ajudando a construir um futuro mais brilhante para nossos amigos de quatro patas.
                    </p>
                </div>
                <div class="pet-world-content-head">
                    <img src="public/our-pet-world/image_3.svg" />
                    <span class="pet-world-content-name">Princípios</span>

                    <p class="pet-world-content-context">
                        Nossos princípios fundamentais são a compaixão, o respeito e a responsabilidade para com todos os seres vivos. Acreditamos na igualdade e no bem-estar de todos os animais, e nos esforçamos para promover a conscientização, a educação e a ação em prol de um mundo mais gentil para nossos amigos de pelo e penas.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
