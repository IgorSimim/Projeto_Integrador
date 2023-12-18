'use client'
import Link from 'next/link'
import './carousel.css'
import './last-news.css'
// import './modal.css'
import './pet-world.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import CarouselComponent from '@/components/carrousel'
// import { ToastContainer, toast } from 'react-toastify'

export default function HomeDeslogado() {

    return (
        <main>
            {/* <!-- carousel --> */}
            <CarouselComponent />


            {/* <!-- last news --> */}
            <div className="last-news-container">
                <div className="last-news-wrapper">
                    <div className="last-news-header">
                        <span className="last-news-title">Últimas notícias</span>
                        <Link href="/postagemNoticias" passHref>
                            <button className="last-news-button">Ver todas</button>
                        </Link>
                    </div>
                    <div className="last-news-card-wrapper">
                        <div className="last-news-card">
                            <div className="card-image">
                                <img src="https://source.unsplash.com/random/425x185/?pet" />
                            </div>
                            <div className="last-news-card-tag">Abandono</div>
                            <span className="last-news-card-title">Vários cães em situações precárias, no bairro Dunas</span>
                            <p className="last-news-card-content">Uma cena muito triste e, infelizmente, comum, é se deparar com
                                animais abandonados nas ruas.De
                                acordo com dados divulgados pela OMS (Organização Mundial de Saúde), existem mais de 30
                                milhões
                                de cães e gatos ...</p>
                        </div>

                        <div className="last-news-card">
                            <div className="card-image">
                                <img src="https://source.unsplash.com/random/425x185/?pets" />
                            </div>
                            <div className="last-news-card-tag">Adoção </div>
                            <span className="last-news-card-title">Adoção de pets aumenta gradativamente, nos últimos
                                meses</span>
                            <p className="last-news-card-content">Adotar um pet é um ato de amor aos animais. Afinal, com a
                                adoção de cães, você tira um bichinho da rua, dando um lar para ele, além de oferecer espaço
                                a outro peludo em ONGs. ...</p>
                        </div>

                        <div className="last-news-card">
                            <div className="card-image">
                                <img src="https://source.unsplash.com/random/425x185/?dog" />
                            </div>
                            <div className="last-news-card-tag">Doação</div>
                            <span className="last-news-card-title">As doações deste ano serão direcionadas a ONG SOS Animais
                                Pelotas</span>

                            <p className="last-news-card-content">A Pelpet divulgou hoje no dia (04/09) para qual ONG as doações
                                desse ano irão ser direcionadas. As informações do que realmente a ONG prática já se
                                encontra no site. ...

                            </p>

                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- our-pet-world --> */}
            <div className="pet-world-container" id='sobre'>
                <div className="pet-world-wrapper">
                    <div className="pet-world-header">
                        <h1 className="pet-world-title">Bem-vindo ao Nosso Mundo Pet!</h1>
                        <span className="pet-world-subtitle">No Nosso Mundo Pet, acreditamos que todos os animais merecem amor,
                            cuidado e um lar. Somos
                            mais do que
                            um
                            site, somos uma comunidade dedicada a centralizar informações, compartilhar histórias e criar um
                            espaço
                            inclusivo para amantes de animais de todas as formas e tamanhos.</span>
                    </div>

                    <div className="pet-world-content">
                        <div className="pet-world-content-head">
                            <img src="../our-pet-world/image_2.svg" width="110px" height="110px" />
                            <span className="pet-world-content-name">Propósito</span>

                            <p className="pet-world-content-context">
                                Unir amantes de animais, compartilhar conhecimento e promover a compaixão pelos nossos
                                amigos peludos. Somos um ponto de encontro para todos que desejam fazer a diferença na vida
                                dos animais e criar um mundo onde cada animal de estimação seja amado e cuidado.
                            </p>
                        </div>
                        <div className="pet-world-content-head">
                            <img src="../our-pet-world/image_1.svg" />
                            <span className="pet-world-content-name">Objetivo</span>

                            <p className="pet-world-content-context">
                                Nosso objetivo é fornecer recursos, informações e inspiração para todos que desejam melhorar
                                a vida dos animais de estimação. Queremos ser uma fonte confiável para adoção responsável,
                                cuidados amorosos e conscientização sobre os direitos dos animais, ajudando a construir um
                                futuro mais brilhante para nossos amigos de quatro patas.
                            </p>
                        </div>
                        <div className="pet-world-content-head">
                            <img src="../our-pet-world/image_3.svg" />
                            <span className="pet-world-content-name">Princípios</span>

                            <p className="pet-world-content-context">
                                Nossos princípios fundamentais são a compaixão, o respeito e a responsabilidade para com
                                todos os seres vivos. Acreditamos na igualdade e no bem-estar de todos os animais, e nos
                                esforçamos para promover a conscientização, a educação e a ação em prol de um mundo mais
                                gentil para nossos amigos de pelo e penas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}