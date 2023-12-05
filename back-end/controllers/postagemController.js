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
        pet, usuario_id, nomepet, tipo, raca, porte, sexo,
        idade, descricaopet, fotopet, vacina, destaque, data } = req.body

    // Se pet for igual a 1, verifica todos os atributos, senão verifica apenas os obrigatórios
    const requiredAttributes = pet == 1
        ? [titulo, assunto, descricao, pet, nomepet, tipo, raca, porte, sexo,
            idade, descricaopet, fotopet, vacina, usuario_id]
        : [titulo, assunto, descricao, pet, usuario_id]
    // if (!titulo || !assunto || !descricao || !pet || !usuario_id) {
    //     res.status(400).json({ id: 0, msg: 'Erro... Informe os dados' });
    //     return;
    //   }

    if (requiredAttributes.some(attr => !attr)) {
        res.status(400).json({ id: 1, msg: 'Erro... Informe todos os dados obrigatórios' });
        return;
    }

    const urlTestPet = /\.(jpg|png)$/;
    if (!urlTestPet.test(fotopet)) {
        res.status(400).json({ id: 2, msg: "Certifique-se que o campo FOTOPET esteja preenchido com uma URL válida terminando em .jpg ou .png" });
        return;
    }

    const urlTestVacina = /\.(jpg|png)$/;
    if (!urlTestVacina.test(vacina)) {
        res.status(400).json({ id: 3, msg: "Certifique-se que o campo VACINA esteja preenchido com uma URL válida terminando em .jpg ou .png" });
        return;
    }

    try {
        // let postagem
        // if (pet == 1) {
        //     postagem = await Postagem.create({
        //         titulo, assunto, descricao, pet, nomepet, tipo, raca, porte, sexo,
        //         idade, descricaopet, fotopet, vacina,
        //         destaque, usuario_id, data: format(new Date(), 'dd/MM/yyyy HH:mm:ss')
        //     });
        // } else {
        //     postagem = await Postagem.create({
        //         titulo, assunto, descricao, pet, destaque,
        //         usuario_id, data: format(new Date(), 'dd/MM/yyyy HH:mm:ss')
        //     });
        // }
        let postagemData = {
            titulo, assunto, descricao, usuario_id,
            pet, destaque, data: format(new Date(), 'dd/MM/yyyy HH:mm:ss')
        };

        if (pet == 1) {
            postagemData = {
                ...postagemData,
                nomepet, tipo, raca, porte, sexo, idade, descricaopet, fotopet, vacina
            };
        }

        res.status(200).json(postagemData);
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

    const urlTestPet = /\.(jpg|png)$/;
    if (!urlTestPet.test(fotopet)) {
        res.status(400).json({ id: 1, msg: "Certifique-se que o campo FOTOPET esteja preenchido com uma URL válida terminando em .jpg ou .png" });
        return;
    }

    const urlTestVacina = /\.(jpg|png)$/;
    if (!urlTestVacina.test(vacina)) {
        res.status(400).json({ id: 1, msg: "Certifique-se que o campo VACINA esteja preenchido com uma URL válida terminando em .jpg ou .png" });
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