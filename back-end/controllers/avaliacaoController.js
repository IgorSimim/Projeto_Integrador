// import { sequelize } from '../databases/conecta.js'
// import { Avaliacao } from '../models/Avaliacao.js';
// import { Churrascaria } from '../models/Churrascaria.js';

// export const avaliacaoIndex = async (req, res) => {

//   try {
//     const avaliacoes = await Avaliacao.findAll({
//       include: Churrascaria
//     });
//     res.status(200).json(avaliacoes)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// }

// export const avaliacaoCreate = async (req, res) => {
//   const { churrascaria_id, nome, comentario, nota } = req.body

//   // se não informou estes atributos
//   if (!churrascaria_id || !nome || !comentario || !nota) {
//     res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
//     return
//   }

//   const t = await sequelize.transaction();

//   try {

//     const avaliacao = await Avaliacao.create({
//       churrascaria_id, nome, comentario, nota
//     }, { transaction: t });

//     await Churrascaria.increment('total',
//       { by: nota, where: { id: churrascaria_id }, transaction: t }
//     );

//     await Churrascaria.increment('num',
//       { by: 1, where: { id: churrascaria_id }, transaction: t }
//     );

//     await t.commit();
//     res.status(201).json(avaliacao)

//   } catch (error) {

//     await t.rollback();
//     res.status(400).json({"id": 0, "Erro": error})

//   }
// }

// export const avaliacaoDestroy = async (req, res) => {
//   const { id } = req.params

//   const t = await sequelize.transaction();

//   try {

//     const avaliacao = await Avaliacao.findByPk(id)

//     await Churrascaria.decrement('total',
//       { by: avaliacao.nota, 
//         where: { id: avaliacao.churrascaria_id }, 
//         transaction: t }
//     );

//     await Churrascaria.decrement('num',
//       { by: 1, 
//         where: { id: avaliacao.churrascaria_id }, 
//         transaction: t }
//     );

//     await Avaliacao.destroy({
//         where: { id }
//     });
  
//     await t.commit();
//     res.status(200).json({msg: "Ok! Avaliação Excluída com Sucesso"})

//   } catch (error) {

//     await t.rollback();
//     res.status(400).json({"id": 0, "Erro": error})

//   }
// }


