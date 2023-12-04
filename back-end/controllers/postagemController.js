import { Op } from "sequelize"
import { format } from "date-fns";
import { Usuario } from '../models/Usuario.js';
import { Postagem } from '../models/Postagem.js';
import dbKnex from '../databases/db_config.js'

export const postagemIndex = async (req, res) => {

    try {
        const postagens = await Postagem.findAll({
            include: [Usuario]
        });
        res.status(200).json(postagens)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const postagemCreate = async (req, res) => {
    const { titulo, assunto, descricao,
        pet, nomepet, tipo, raca, porte, sexo,
        idade, descricaopet, fotopet, vacina, destaque, usuario_id, data } = req.body

    // Se pet for igual a 1, verifica todos os atributos, senão verifica apenas os obrigatórios
    const requiredAttributes = pet == 1
        ? [titulo, assunto, descricao, pet, nomepet, tipo, raca, porte, sexo, idade, descricaopet, fotopet, usuario_id]
        : [titulo, assunto, descricao, pet, usuario_id];

    if (requiredAttributes.some(attr => !attr)) {
        res.status(400).json({ id: 0, msg: 'Erro... Informe todos os dados obrigatórios' });
        return;
    }

    try {
        const dataPostagem = data || format(new Date(), "dd-MM-yyyy HH:mm:ss");

        const postagemData = {
            titulo, assunto, descricao, destaque, usuario_id, pet, data: dataPostagem
        };

        if (pet == 1) {
            postagemData.nomepet = nomepet;
            postagemData.tipo = tipo;
            postagemData.raca = raca;
            postagemData.porte = porte;
            postagemData.sexo = sexo;
            postagemData.idade = idade;
            postagemData.descricaopet = descricaopet;
            postagemData.fotopet = fotopet;
            postagemData.vacina = vacina;
        }

        console.log(postagemData);

        const postagem = await Postagem.create(postagemData);
        res.status(201).json(postagem)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const postagemDestaque = async (req, res) => {
    const { id } = req.params;

    try {
        // Retorna o registro para obter o status atual do campo destaque
        const postagem = await Postagem.findByPk(id)

        // Altera com o contrário do atual
        await Postagem.update({ destaque: !postagem.destaque }, { where: { id } })

        res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
};

export const postagemUpdate = async (req, res) => {
    const { id } = req.params;

    const { titulo, assunto, descricao,
        pet, nomepet, tipo, raca, porte, sexo,
        idade, descricaopet, fotopet, vacina, destaque, usuario_id } = req.body;

    // Se pet for igual a 1, verifica todos os atributos, senão verifica apenas os obrigatórios
    const requiredAttributes = pet == 1
        ? [titulo, assunto, descricao, pet, nomepet, tipo, raca, porte, sexo, idade, descricaopet, fotopet, usuario_id]
        : [titulo, assunto, descricao, pet, usuario_id];

    if (requiredAttributes.some(attr => !attr)) {
        res.status(400).json({ id: 0, msg: 'Erro... Informe todos os dados obrigatórios' });
        return;
    }

    try {
        if (pet == 1) {
            await dbKnex("usuario").where({ id })
                .update({
                    titulo: titulo,
                    assunto: assunto,
                    descricao: descricao,
                    pet: pet,
                    nomepet: nomepet,
                    tipo: tipo,
                    raca: raca,
                    porte: porte,
                    sexo: sexo,
                    idade: idade,
                    descricaopet: descricaopet,
                    fotopet: fotopet,
                    vacina: vacina,
                    destaque: destaque,
                    usuario_id: usuario_id
                })
        } else {
            await dbKnex("usuario").where({ id })
                .update({
                    titulo: titulo,
                    assunto: assunto,
                    descricao: descricao,
                    pet: pet,
                    destaque: destaque,
                    usuario_id: usuario_id
                })
        }

        res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
    } catch (error) {
        res.status(400).json({ id: 6, msg: "Erro: " + error.message })
    }
}


export const postagemDestroy = async (req, res) => {
    const { id } = req.params
    try {
        await Postagem.destroy({ where: { id } });


        res.status(200).json({ msg: "Ok! Postagem excluído com sucesso" })
    } catch (error) {
        res.status(400).send(error)
    }
}

export const postagemPesq = async (req, res) => {
    const { id } = req.params

    try {
        const postagem = await Postagem.findByPk(id)
        res.status(200).json(postagem)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const postagemGeral = async (req, res) => {
    try {
        const consulta = await dbKnex("postagem")
            .count({ num: "*" })


        res.status(200).json(consulta)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const postagemSemPet = async (req, res) => {
    try {
        const consulta = await dbKnex("postagem")
            .count({ num: "*" })
            .where({ pet: 0 });

        res.status(200).json(consulta[0]);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
}

export const postagemComPet = async (req, res) => {
    try {
        const consulta = await dbKnex("postagem")
            .count({ num: "*" })
            .where({ pet: 0 });

        res.status(200).json(consulta[0]);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
}

export const postagemVacina = async (req, res) => {
    try {
        const consulta = await dbKnex("postagem")
            .count({ num: "*" })
            .whereNotNull('vacina');

        res.status(200).json(consulta[0]);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
};