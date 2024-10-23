<h1 align="center" style="font-weight: bold;">HEROES API 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>Projeto usado como uma api para criar deletar e alterar personagens em um banco de dados não oficial de personagens da DC</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- Javascript
- MongoDB
- NodeJS
- Express
- Ajv

<h2 id="started">🚀 Getting started</h2>

Here you describe how to run your project locally

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [NodeJS](https://github.com/)
- [Git 2](https://github.com)

<h3>Cloning</h3>

How to clone your project

```bash
git clone your-project-url-in-github
```
<h3>Starting</h3>

How to start your project

```bash
cd project-name
npm install
npm start
```
Certifique-se de que o MongoDB esteja em execução
```bash
mongod
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /personagens</kbd>              | Retorna todos os Herois cadastrados [response details](#get-person-detail)
| <kbd>GET /personagens/nickname</kbd>     | Retorna apenas o heroi com o nickname especificado [response details](#get-one-person-detail)
| <kbd>POST /personagens/</kbd>            | Adiciona atraves do corpo da requisição as informações do personagem [response details](#post-person-detail)
| <kbd>PATCH /personagens/nickaname        | Atualiza atraves do corpo da requisição as informações do personagem [response details](#patch-person-detail)
| <kbd>DELETE /personagens/nickname        | Remove atarvés do nickname o personagem no banco de dados [response details](#delete-person-detail)

<h3 id="get-person-detail">GET /personagens</h3>

**RESPONSE**
```json
[
  {
    "realname": "Bruce Wayne",
    "nickname": "Batman",
    "description": "Bilionário e filantropo de Gotham City, que combate o crime usando suas habilidades em artes marciais e tecnologia avançada, além de sua inteligência."
  }
]
```

<h3 id="post-person-detail">POST /personagens</h3>

**REQUEST**
```json
{
  "realname": "Bruce Wayne",
  "nickname": "Batman",
  "description": "Bilionário e filantropo de Gotham City, que combate o crime usando suas habilidades em artes marciais e tecnologia avançada, além de sua inteligência."
}
```
<h3 id="get-one-person-detail">GET /personagens/Batman</h3>

**RESPONSE**
```json
{
    "realname": "Bruce Wayne",
    "nickname": "Batman",
    "description": "Bilionário e filantropo de Gotham City, que combate o crime usando suas habilidades em artes marciais e tecnologia avançada, além de sua inteligência."
}
```
<h3 id="patch-person-detail">PATCH /personagens/Batman</h3>

**REQUEST**
```json
{
  "realname": "Bruce Wayne",
  "nickname": "Batman",
  "description": "Bilionário e filantropo de Gotham City, que combate o crime usando suas habilidades em artes marciais e tecnologia avançada, além de sua inteligência."
}
```

**RESPONSE**
```json
{
    "message": "Personagem atualizado com sucesso"
}
```

<h3 id="delete-person-detail">DELETE /personagens/Batman</h3>

**RESPONSE**
```json
{
    "message": "Personagem removido com sucesso"
}
```

<h2 id="colab">🤝 Collaborators</h2>

<table>
  <tr>
      <td align="center">
          <a href="#">
              <img src="https://avatars.githubusercontent.com/u/87495429?v=4" width="100px;" alt="Joao silva profile picture"/><br>
              <sub>
                <b>João Marcos Silva</b>
              </sub>
          </a>
      </td>
  </tr>
</table>

<h2 id="contribute">📫 Contribute</h2>

Here you will explain how other developers can contribute to your project. For example, explaining how can create their branches, which patterns to follow and how to open an pull request

1. `git clone https://github.com/Joaosilvateixeira33/text-editor.git`
2. `git checkout -b feature/NAME`
3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!

<h3>Documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
