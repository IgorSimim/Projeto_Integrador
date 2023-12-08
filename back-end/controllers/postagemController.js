import { Op } from "sequelize"
import { format } from "date-fns";
import { Usuario } from '../models/Usuario.js';
import { Postagem } from '../models/Postagem.js';
import dbKnex from '../databases/db_config.js'

const formatDates = (postagem) => {
    const formattedUpdatedAt = format(new Date(postagem.updatedAt), 'dd/MM/yyyy HH:mm:ss');
    const formattedCreatedAt = format(new Date(postagem.createdAt), 'dd/MM/yyyy HH:mm:ss');

    return {
        ...postagem.toJSON(), // Converte o objeto postagem para JSON
        updatedAt: formattedUpdatedAt,
        createdAt: formattedCreatedAt,
    };
};

export const postagemIndex = async (req, res) => {

    try {
        const postagens = await Postagem.findAll({
            include: [Usuario, Pet]
        });
        res.status(200).json(postagens)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const postagemCreate = async (req, res) => {
    const { titulo, assunto, descricao,
        pet, nomepet, tipo, raca, porte,
        sexo, fotopet, idade, destaque, usuario_id, vacina } = req.body;

    // Se pet for igual a 1, verifica todos os atributos, senão verifica apenas os obrigatórios
    const requiredAttributes = pet == 1
        ? [titulo, assunto, descricao, nomepet, tipo, raca, porte, sexo, idade, fotopet, usuario_id]
        : [titulo, assunto, descricao, usuario_id];

    if (requiredAttributes.some(attr => !attr)) {
        res.status(400).json({ id: 0, msg: 'Erro... Informe todos os dados obrigatórios' });
        return;
    }

    const urlTestPet = /\.(jpg|png)$/;
    if (!urlTestPet.test(fotopet) && pet == 1) {
        res.status(400).json({ id: 1, msg: "Certifique-se que o campo FOTOPET esteja preenchido com uma URL válida terminando em .jpg ou .png" });
        return;
    }

    const urlTestVacina = /\.(jpg|png)$/;
    if (!urlTestVacina.test(vacina) && pet == 1) {
        res.status(400).json({ id: 1, msg: "Certifique-se que o campo VACINA esteja preenchido com uma URL válida terminando em .jpg ou .png" });
        return;
    }

    try {
        const postagem = await Postagem.create({
            titulo, assunto, descricao, usuario_id, pet,
            nomepet, tipo, raca, porte, sexo, idade, fotopet, destaque
        });

        // Função para formatar as datas
        const formattedPostagem = formatDates(postagem);

        res.status(200).json(formattedPostagem);
    } catch (error) {
        console.error("Erro ao criar postagem:", error);
        res.status(400).json({ id: 4, msg: "Erro ao criar postagem. Consulte o console para obter mais informações." });
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
        pet, nomepet, tipo, raca, porte,
        sexo, fotopet, idade, destaque, usuario_id, vacina } = req.body;

    // Se pet for igual a 1, verifica todos os atributos, senão verifica apenas os obrigatórios
    const requiredAttributes = pet == 1
        ? [titulo, assunto, descricao, nomepet, tipo, raca, porte, sexo, idade, fotopet, usuario_id]
        : [titulo, assunto, descricao, usuario_id];

    if (requiredAttributes.some(attr => !attr)) {
        res.status(400).json({ id: 0, msg: 'Erro... Informe todos os dados obrigatórios' });
        return;
    }

    const urlTestPet = /\.(jpg|png)$/;
    if (!urlTestPet.test(fotopet) && pet == 1) {
        res.status(400).json({ id: 1, msg: "Certifique-se que o campo FOTOPET esteja preenchido com uma URL válida terminando em .jpg ou .png" });
        return;
    }

    const urlTestVacina = /\.(jpg|png)$/;
    if (!urlTestVacina.test(vacina) && pet == 1) {
        res.status(400).json({ id: 1, msg: "Certifique-se que o campo VACINA esteja preenchido com uma URL válida terminando em .jpg ou .png" });
        return;
    }

    try {
        if (pet == 1) {
            await dbKnex("postagem").where({ id })
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
                    fotopet: fotopet,
                    destaque: destaque,
                    usuario_id: usuario_id,
                    vacina: vacina
                })
        } else {
            await dbKnex("postagem").where({ id })
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
            .where({ pet: 1 });

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