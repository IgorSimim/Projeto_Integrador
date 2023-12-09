'use client'
import Link from "next/link";
import { useParams } from "next/navigation"
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Alteracao() {
    const params = useParams();
    const { register, handleSubmit, reset } = useForm();

    const [showAdditionalLabels, setShowAdditionalLabels] = useState(false);


    useEffect(() => {
        async function getPostagem() {
            const response = await fetch("http://localhost:3000/postagens/pesq/" + params.id);
            const dado = await response.json();
            reset({
                titulo: dado.titulo,
                assunto: dado.assunto,
                descricao: dado.descricao,
                pet: dado.pet,
                nomepet: dado.nomepet,
                tipo: dado.tipo,
                raca: dado.raca,
                porte: dado.porte,
                sexo: dado.sexo,
                idade: dado.idade,
                fotopet: dado.fotopet,
                vacina: dado.vacina,
            });

            setShowAdditionalLabels(dado.pet === 1);

        }
        getPostagem();
    }, [params.id]);

    async function alteraDados(data) {

        const postagem = await fetch("http://localhost:3000/postagens/pesq/" + params.id, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ ...data }),
        });

        if (postagem.status == 200) {
            toast.success("Ok! Postagem alterada com sucesso");
        } else {
            const errorData = await postagem.json();

            if (errorData.id === 0) {
                toast.error(errorData.msg);
            } else if (errorData.id === 2) {
                toast.error(errorData.msg);
            } else if (errorData.id === 3) {
                toast.error(errorData.msg);
            } else {
                toast.error("Erro... Não foi possível concluir a alteração");
            }
        }
    }

    return (
        <div className="container">
            <h2 className="mt-2">Cadastro das Postagens</h2>
            <form onSubmit={handleSubmit(alteraDados)}>
                <div className="row">
                    <div className="col-sm-6">
                        <label htmlFor="titulo" className="form-label">Titulo da Postagem</label>
                        <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="assunto" className="form-label">Assunto</label>
                            <select
                                id="assunto"
                                className="form-select"
                                {...register("assunto")}
                                required
                            >
                                <option value="Abandono">Abandono</option>
                                <option value="Maus-tratos">Maus-tratos</option>
                                <option value="Adoção">Adoção</option>
                                <option value="Vacina">Vacina</option>
                                <option value="Procura-se">Procura-se</option>
                                <option value="Outros">Outros</option>
                            </select>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-sm-8">
                        <label htmlFor="descricao" className="form-label">Descrição da Postagem</label>
                        <textarea className="form-control" id="descricao" rows="3" {...register("descricao")} required></textarea>
                    </div>
                    <div className="col-sm-4">
                        <p>Postagem com pet:</p>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="pet"
                                {...register("pet")}
                                onChange={(e) => setShowAdditionalLabels(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="pet">Pet</label>
                        </div>
                    </div>
                </div>

                {showAdditionalLabels && (
                    <div>
                        <div className="row mt-3">
                            <div className="col-sm-8">
                                <label htmlFor="nomepet" className="form-label">Nome do Pet</label>
                                <input type="text" className="form-control" id="nomepet" {...register("nomepet")} required />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="tipo" className="form-label">Tipo</label>
                                <select id="tipo" className="form-select" {...register("tipo")} required>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-5">
                                <label htmlFor="raca" className="form-label">Raça</label>
                                <input type="text" className="form-control" id="raca" {...register("raca")} required />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="porte" className="form-label">Porte</label>
                                <select id="porte" className="form-select" {...register("porte")} required>
                                    <option value="Pequeno">Pequeno</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Grande">Grande</option>
                                    <option value="Gigante">Gigante</option>
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="sexo" className="form-label">Sexo</label>
                                <select id="sexo" className="form-select" {...register("sexo")} required>
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-6">
                                <label htmlFor="fotopet" className="form-label">Foto do Pet</label>
                                <input type="url" className="form-control" id="fotopet" placeholder="Ex: http://www.example.com/image1.jpg" {...register("fotopet")} required />
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="vacina" className="form-label">Cartão de Vacina do Pet</label>
                                <input type="url" className="form-control" id="vacina" placeholder="Ex: http://www.example.com/image1.jpg" {...register("vacina")} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-3">
                    <input type="submit" value="Enviar" className="btn btn-primary me-3" />
                    <input type="button" value="Limpar" className="btn btn-danger" onClick={() => reset()} />
                    <Link className="btn btn-success float-end" href="/listagemPostagem">Voltar</Link>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}