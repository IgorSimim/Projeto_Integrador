import dbKnex from '../databases/db_config.js';
import ejs from 'ejs';
import puppeteer from 'puppeteer';

export const ListaPostCIndex = async (req, res) => {
    try {
        const postagem = await dbKnex.select("p.id", "p.titulo", "p.assunto", "p.nomepet", "p.raca", "p.pet")
            .from("postagem as p")
            .where("p.pet", 1);

        res.status(200).json(postagem);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
}

export const PostagemCLista = async (req, res) => {
    try {
        const postagem = await dbKnex.select("p.id", "p.titulo", "p.assunto", "p.nomepet", "p.raca", "p.pet")
            .from("postagem as p")
            .where("p.pet", 1);

        ejs.renderFile('views/ListaPostagensC.ejs', { postagem }, (err, HTML) => {
            if (err) {
                res.status(400).send("Erro na geração da página");
            }
            res.status(200).send(HTML);
        });
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
}

export const PostagemCPdf = async (req, res) => {
    const browser = await puppeteer.launch({
        headless: "new",
    });
    const page = await browser.newPage();

    // Rota modificada para apenas usuários confirmados
    await page.goto('http://localhost:3000/postagenscompet/lista');

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

export const ListaPostSIndex = async (req, res) => {
    try {
        const postagem = await dbKnex.select("p.id", "p.titulo", "p.assunto", "p.pet")
            .from("postagem as p")
            .where("p.pet", 0);

        res.status(200).json(postagem);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
}

export const PostagemSLista = async (req, res) => {
    try {
        const postagem = await dbKnex.select("p.id", "p.titulo", "p.assunto", "p.pet")
            .from("postagem as p")
            .where("p.pet", 0);

        ejs.renderFile('views/ListaPostagensS.ejs', { postagem }, (err, HTML) => {
            if (err) {
                res.status(400).send("Erro na geração da página");
            }
            res.status(200).send(HTML);
        });
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
}

export const PostagemSPdf = async (req, res) => {
    const browser = await puppeteer.launch({
        headless: "new",
    });
    const page = await browser.newPage();

    // Rota modificada para apenas usuários confirmados
    await page.goto('http://localhost:3000/postagenssempet/lista');

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