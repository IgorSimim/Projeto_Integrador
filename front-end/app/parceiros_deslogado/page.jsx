'use client'
import Link from 'next/link'
import './partners.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'


export default function ParceirosDeslogado() {
    return (
        <main className="partners">
            <p className="partners__title">Os nossos parceiros</p>
            <p className="partners__description">Orgulhosamente colaboramos com ONGs dedicadas e veterinárias comprometidas em nossa missão de promover o
                bem-estar dos animais. Nossos parceiros são fundamentais para a realização dessa jornada, fornecendo
                cuidados de qualidade e apoio às famílias que desejam adotar e cuidar de seus pets. Juntos, fazemos a
                diferença na vida dos nossos amigos de quatro patas.</p>
            <div className="partners__cards mb-5">
                <div className="card__partner">
                    <div className="partner__logo">
                        <img className="partner__image" src="../pets/parceiro.png" />
                    </div>
                    <div className="partner__info">
                        <p className="partner__title">SOS Animais Pelotas</p>
                    </div>
                </div>
                <div className="card__partner">
                    <div className="partner__logo">
                        <img className="partner__image" src="../partners/salva_pet.png" />
                    </div>
                    <div className="partner__info">
                        <p className="partner__title">ONG Salva pets</p>
                    </div>
                </div>
                <div className="card__partner">
                    <div className="partner__logo">
                        <img className="partner__image" src="../partners/canina.png" />
                    </div>
                    <div className="partner__info">
                        <p className="partner__title">ONG Canina</p>
                    </div>
                </div>
                <div className="card__partner">
                    <div className="partner__logo">
                        <img className="partner__image" src="../partners/para_todos.png" />
                    </div>
                    <div className="partner__info">
                        <p className="partner__title">ONG para todos</p>
                    </div>
                </div>
                <div className="card__partner">
                    <div className="partner__logo">
                        <img className="partner__image" src="../partners/pet_vida.png" />
                    </div>
                    <div className="partner__info">
                        <p className="partner__title">Veterinária PetVida</p>
                    </div>
                </div>
                <div className="card__partner">
                    <div className="partner__logo">
                        <img className="partner__image" src="../partners/frost.png" />
                    </div>
                    <div className="partner__info">
                        <p className="partner__title">Veterinária Minten</p>
                    </div>
                </div>
            </div>
        </main>
    )
}