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

# Assim você faz com que o seu front end seja executado
npm run dev                                                                                                      
```

Abra [http://localhost:4000](http://localhost:4000) com o seu browser e veja o front end sendo renderizado.

Caso não venha a aparecer por essa rota, verifique no seu prompt de comando, a rota que o arquivo está sendo renderizado, assim tendo maior certeza da rota usada.
