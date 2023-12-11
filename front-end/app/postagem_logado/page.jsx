'use client'
import Link from 'next/link'
import './posts.css'
import Button from '@/components/button/filter_post_desl'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'


export default function PostagemLogado() {
    return (
        <main className="posts">
            <div className="posts__header">

                <p>Postagens de pets</p>
                {/* <!-- dropdown button --> */}
                <Button type="filter_post_desl" />

            </div>

            {/* <!-- list cards --> */}
            <div className="posts__listcards">
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
            </div>

            <div className="posts__button">
                <button type="button" className="button">
                    <img src="buttons/chevron_down.svg" alt="" />
                </button>

            </div>
        </main>
    )
}