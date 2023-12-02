import dbKnex from '../databases/db_config.js';
import ejs from 'ejs';
import puppeteer from 'puppeteer';

export const ListaIndex = async (req, res) => {
    try {
        const usuario = await dbKnex.select("u.id", "u.nome", "u.email", "u.bairro", "u.telefone")
            .from("usuario as u")
            .where("u.confirmado", 1);

        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
}

export const UsuarioLista = async (req, res) => {
    try {
        const usuario = await dbKnex.select("u.id", "u.nome", "u.email", "u.bairro", "u.telefone")
            .from("usuario as u")
            .where("u.confirmado", 1);

        ejs.renderFile('views/ListaUsuarios.ejs', { usuario }, (err, HTML) => {
            if (err) {
                res.status(400).send("Erro na geração da página");
            }
            res.status(200).send(HTML);
        });
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
}

export const UsuarioPdf = async (req, res) => {
    const browser = await puppeteer.launch({
        headless: "new",
    });
    const page = await browser.newPage();

    // Rota modificada para apenas usuários confirmados
    await page.goto('http://localhost:3000/usuarios/lista');

    await page.waitForNetworkIdle(0);

    const pdf = await page.pdf({
        printBackground: true,
        format: 'A4',
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        }
    });

    await browser.close();

    res.contentType('application/pdf');
    res.status(200).send(pdf);
}