# <img src="https://github.com/IgorSimim/Projeto_Integrador/assets/120426953/4ca78d8f-8ba9-45fa-83ce-bae2b6beb129" width="45" /> Como executar:

## Etapa de clonagem:

Primeiro você deve pegar os arquivos que estão no repositório do github e clonar para o seu desktop:
```bash
# Clonar o projeto
git@github.com:IgorSimim/Projeto_Integrador.git

# Entrar na pasta do projeto Projeto_Integrador
cd Projeto_Integrador                                                                                                      
```
## Agora já dentro da pasta:

Caso você queira, pode abrir o seu editor de código-fonte já no diretório onde se encontram os arquivos que foram clonados. Exemplo: Visual Studio Code, Sublime Text:
```bash
# Abrir o arquivo clonado pelo seu editor de código-fonte
code .
```

Caso não queira visualizar o arquivo em forma de código, basta seguir os pasos indicados abaixo. Esses comandos abaixo eu sugiro que você realize pelo prompt de comando, para melhor visualização:

Lembrando que tem que ser feito em um prompt que esteja dentro do diretório, onde se encontra os arquivos.
```bash
# Para ter certeza de que todas dependêcias estão instaladas corretamente
npm i

# ATENÇÃO: Inicialize o back end antes de inicializar o front end.
# No caso, dê o comando abaixo antes.
# Evitando conflito de rotas.

# Assim você faz com que o seu back end seja executado na porta 3004
npx json-server --watch db.json --port 3004                                                                                                      
```

Abra [http://localhost:3001/usuarios](http://localhost:3004/usuarios) com o seu browser e veja os dados armazenados da tabela usuarios no seu back end.

Abra [http://localhost:3001/postagens](http://localhost:3004/postagens) com o seu browser e veja os dados armazenados da tabela postagens no seu back end.
