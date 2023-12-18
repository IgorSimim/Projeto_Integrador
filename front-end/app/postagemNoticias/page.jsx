'use client'
import Link from 'next/link'
import './posts.css'
import Button from '@/components/button/filter_post_desl'
import './last-news.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'


export default function postagemNoticias() {
    return (
        <main className="posts">
            <div className="posts__header">

                <p>Notícias</p>
                {/* <!-- dropdown button --> */}
                {/* <Button type="filter_post_desl" /> */}

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

                <div className="last-news-card">
                    <div className="card-image">
                        <img src="https://source.unsplash.com/random/425x185/?dog" />
                    </div>
                    <div className="last-news-card-tag">Doação</div>
                    <span className="last-news-card-title">No próximo ano vão disponibilizar 
                    vacinas de graça para gatos de pequeno porte.</span>

                    <p className="last-news-card-content">Foi divulgado hoje no dia (21/01) pelo municipio de Pelotas,
                    que no próximo mês irão ser disponibilizados vacinação de graça pra gatos recém nascidos. ...
                    </p>

                </div>
            </div>

            {/* <!-- list cards --> */}
            {/* <div className="posts__listcards">
                <div className="card card__pet card__minimal">
                    <div className="shadow"></div>
                    <img className="pet__picture" src="../posts/Princesa.jpg" />
                        <div className="card__info">
                            <p className="pet__name">Princesa</p>
                            <p className="pet__sex">Sexo: Fêmea</p>
                            <p className="pet__size">Porte: Pequeno</p>
                            <p className="pet__race">Raça: SRD Pelo curto</p>
                            <p className="pet__age">Idade: 1,5 anos</p>
                            <p className="pet__about">
                                <span>Sobre mim:</span>
                                Sou carinhosa, brincalhona e adoro correr.
                            </p>
                        </div>
                </div>

                <div className="card card__pet card__minimal">
                    <div className="shadow"></div>
                    <img className="pet__picture" src="../posts/Thor.jpg"/>
                        <div className="card__info">
                            <p className="pet__name">Thor</p>
                            <p className="pet__sex">Sexo: Fêmea</p>
                            <p className="pet__size">Porte: Pequeno</p>
                            <p className="pet__race">Raça: SRD Pelo curto</p>
                            <p className="pet__age">Idade: 1,5 anos</p>
                            <p className="pet__about">
                                <span>Sobre mim:</span>
                                Sou carinhosa, brincalhona e adoro correr.
                            </p>
                        </div>
                </div>

                <div className="card card__pet card__minimal">
                    <div className="shadow"></div>
                    <img className="pet__picture" src="../posts/Mel.jpg"/>
                        <div className="card__info">
                            <p className="pet__name">Mel</p>
                            <p className="pet__sex">Sexo: Fêmea</p>
                            <p className="pet__size">Porte: Pequeno</p>
                            <p className="pet__race">Raça: SRD Pelo curto</p>
                            <p className="pet__age">Idade: 1,5 anos</p>
                            <p className="pet__about">
                                <span>Sobre mim:</span>
                                Sou carinhosa, brincalhona e adoro correr.
                            </p>
                        </div>
                </div>

                <div className="card card__pet card__minimal">
                    <div className="shadow"></div>
                    <img className="pet__picture" src="../posts/Luke.jpg"/>
                        <div className="card__info">
                            <p className="pet__name">Luke</p>
                            <p className="pet__sex">Sexo: Fêmea</p>
                            <p className="pet__size">Porte: Pequeno</p>
                            <p className="pet__race">Raça: SRD Pelo curto</p>
                            <p className="pet__age">Idade: 1,5 anos</p>
                            <p className="pet__about">
                                <span>Sobre mim:</span>
                                Sou carinhosa, brincalhona e adoro correr.
                            </p>
                        </div>
                </div>

                <div className="card card__pet card__minimal">
                    <div className="shadow"></div>
                    <img className="pet__picture" src="../posts/Bob.jpg"/>
                        <div className="card__info">
                            <p className="pet__name">Bob</p>
                            <p className="pet__sex">Sexo: Fêmea</p>
                            <p className="pet__size">Porte: Pequeno</p>
                            <p className="pet__race">Raça: SRD Pelo curto</p>
                            <p className="pet__age">Idade: 1,5 anos</p>
                            <p className="pet__about">
                                <span>Sobre mim:</span>
                                Sou carinhosa, brincalhona e adoro correr.
                            </p>
                        </div>
                </div>

                <div className="card card__pet card__minimal">
                    <div className="shadow"></div>
                    <img className="pet__picture" src="../posts/Theo.jpg"/>
                        <div className="card__info">
                            <p className="pet__name">Theo</p>
                            <p className="pet__sex">Sexo: Fêmea</p>
                            <p className="pet__size">Porte: Pequeno</p>
                            <p className="pet__race">Raça: SRD Pelo curto</p>
                            <p className="pet__age">Idade: 1,5 anos</p>
                            <p className="pet__about">
                                <span>Sobre mim:</span>
                                Sou carinhosa, brincalhona e adoro correr.
                            </p>
                        </div>
                </div>

                <div className="card card__pet card__minimal">
                    <div className="shadow"></div>
                    <img className="pet__picture" src="../posts/Lola.jpg"/>
                        <div className="card__info">
                            <p className="pet__name">Lola</p>
                            <p className="pet__sex">Sexo: Fêmea</p>
                            <p className="pet__size">Porte: Pequeno</p>
                            <p className="pet__race">Raça: SRD Pelo curto</p>
                            <p className="pet__age">Idade: 1,5 anos</p>
                            <p className="pet__about">
                                <span>Sobre mim:</span>
                                Sou carinhosa, brincalhona e adoro correr.
                            </p>
                        </div>
                </div>

                <div className="card card__pet card__minimal">
                    <div className="shadow"></div>
                    <img className="pet__picture" src="posts/Meg.jpg"/>
                        <div className="card__info">
                            <p className="pet__name">Meg</p>
                            <p className="pet__sex">Sexo: Fêmea</p>
                            <p className="pet__size">Porte: Pequeno</p>
                            <p className="pet__race">Raça: SRD Pelo curto</p>
                            <p className="pet__age">Idade: 1,5 anos</p>
                            <p className="pet__about">
                                <span>Sobre mim:</span>
                                Sou carinhosa, brincalhona e adoro correr.
                            </p>
                        </div>
                </div>
            </div> */}

            <div className="posts__button">
                <button type="button" className="button">
                    <img src="buttons/chevron_down.svg" alt="" />
                </button>
            </div>
        </main>
    )
}