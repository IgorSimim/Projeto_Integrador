'use client'
import Link from "next/link";
import { useParams } from "next/navigation"
import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Alteracao() {
    const params = useParams()
    //  console.log(params)
    const { register, handleSubmit, reset, control, setValue } = useForm()

    const [showAdditionalLabels, setShowAdditionalLabels] = useState(false);
    const [showAdditionalLabels2, setShowAdditionalLabels2] = useState(false);

    const assunto = useWatch({ name: "assunto", control });

    useEffect(() => {
        async function getPostagem() {
            const response = await fetch("http://localhost:3004/postagens/" + params.id)
            const dado = await response.json()
            reset({
                nome: dado.nome,
                titulo: dado.titulo,
                assunto: dado.assunto,
                descricaopost: dado.descricaopost,
                pet: dado.pet,
                nomepet: dado.nomepet,
                raca: dado.raca,
                porte: dado.porte,
                idade: dado.idade,
                descricaopet: dado.descricaopet,
                fotopet: dado.fotopet,
                vacina: dado.vacina,
            });
            // Atualize o valor do campo "assunto" no formulário
            setShowAdditionalLabels2(dado.assunto === "Outro");
        }
        getPostagem()
    }, [params.id])

    useEffect(() => {
        // Atualize o estado showAdditionalLabels2 com base no valor atual do campo "Assunto"
        setShowAdditionalLabels2(assunto === "Outro");

        // Limpe o valor do campo "assuntoCustom" se a opção "Outro" não estiver selecionada
        if (assunto !== "Outro") {
            setValue("assuntoCustom", ""); // Use setValue do react-hook-form para limpar o valor de "assuntoCustom"
        }
    }, [assunto, setValue]);

    async function alteraDados(data) {
        // Se a opção for "Outro", defina o valor de "assunto" como o valor de "assuntoCustom"
        if (data.assunto === "Outro") {
            data.assunto = data.assuntoCustom;
        }

        const postagem = await fetch("http://localhost:3004/postagens/" + params.id,
            {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...data })
            },
        )
        if (postagem.status == 200) {
            // alert("Ok! Postagem cadastrada com sucesso")
            toast.success("Ok! Postagem alterada com sucesso")
        } else {
            // alert("Erro...")
            toast.error("Erro... Não foi possível concluir a alteração")
        }
    }

    return (
        <div className="container">
            <h2 className="mt-2">Cadastro das Postagens</h2>
            <form onSubmit={handleSubmit(alteraDados)}>
                <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="nome" className="form-label">Nome do Usuário</label>
                        <input type="text" className="form-control" id="nome" {...register("nome")} required />
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="titulo" className="form-label">Titulo da Postagem</label>
                        <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
                    </div>
                    <div className="col-sm-4">
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
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                    {showAdditionalLabels2 ? (
                        <div className="col-sm-4">
                            <label htmlFor="assuntoCustom" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="assuntoCustom"
                                style={{ marginLeft: "56vw" }}
                                {...register("assuntoCustom")}
                                placeholder="Digite o assunto personalizado"
                                required
                            />
                        </div>
                    ) : null}
                </div>


                <div className="row mt-3">
                    <div className="col-sm-8">
                        <label htmlFor="descricaopost" className="form-label">Descrição da Postagem</label>
                        <textarea className="form-control" id="descricaopost" rows="3" {...register("descricaopost")} required></textarea>
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
                            <div className="col-sm-4">
                                <label htmlFor="nomepet" className="form-label">Nome do Pet</label>
                                <input type="text" className="form-control" id="nomepet" {...register("nomepet")} required />
                            </div>
                            <div className="col-sm-4">
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
                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-4">
                                <label htmlFor="idade" className="form-label">Idade</label>
                                <input type="text" className="form-control" id="idade" placeholder="Ex: 1 ano e 3 meses" {...register("idade")} />
                            </div>
                            <div className="col-sm-8">
                                <label htmlFor="descricaopet" className="form-label">Descrição do Pet</label>
                                <textarea className="form-control" id="descricaopet" rows="3" {...register("descricaopet")}></textarea>
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