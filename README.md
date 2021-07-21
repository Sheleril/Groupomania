<h1 align= "center" >Groupomania_P7 OC</h1>

<p align= "center"><img src="https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png" width= "300px">

Le réseau social Groupomania est une application qui a été crée spécialement pour les employé(e)s de l'entreprise afin de pouvoir communiquer et avoir une bonne ambiance au sein du groupe.

<details open="open">
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#demarrage">Démarrage</a>
      <ul>
        <li><a href="#prerequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    </li>
        <li>
      <a href="#apropos">A propos du Site</a>
      <ul>
        <li><a href="#outils">Outils utilisés</a></li>
      </ul>
    </li>
    <li><a href="#dependence">Dépendences NPM</li> 
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<h2 id="demarrage" align="center">Démarrage</h2>

<h3 id="prerequis">Prérequis</h3>

<p>Avant toute chose, il faut cloner le projet via GitHub vers le dossier de votre choix :</p>

```sh
git clone https://github.com/Sheleril/Groupomania.git
```

:warning: Attention, pour que votre site fonctionne et que la connexion à la base de donnée puisse se faire, il faut crée un fichier dans votre dossier Backend.
L'appeler `.env` , et suivre la structure qui suit :

```js
DB_NAME= Nom de la BDD
DB_USER= Nom de l'utilisateur
DB_PASS= MdP
```

Ceci est une sécurité pour la base de donnée, pour pouvoir avoir accès , mettez vos identifiants à la place de "Nom de la BDD" "Nom de l'utilisateur" "MdP".

<h3 id="installation">Installation</h3>

<h4 align="center">Côté Frontend</h4>

Ciblez le Frontend avec votre terminal

```sh
cd frontend
```

Installez NPM

```sh
npm install
```

Lancez le serveur Frontend

```sh
npm run serve
```

:warning: Pensez à garder ce terminal ouvert :warning:

<h4 align="center">Côté Backend</h4>

Dans un second terminal, ciblez le backend

```sh
cd backend
```

Installez NPM

```sh
npm install
```

Puis, pour finir, tapez dans le terminal

```sh
nodemon server
```

:warning: Pensez à garder ce terminal ouvert :warning:

Enfin, pour lancer le site vous pouvez cliquer si dessous:  
http://localhost:8080/ :bowtie:

<h2 align="center" id="apropos"> A propos du site </h2>

<h3 id="outils">Outils utilisés &#x1F6E0; </h3>

- [Node.js](https://nodejs.org/en/)
- [VueJS](https://vuejs.org/) Pour le Frontend
- [MySQL](https://www.mysql.com/fr/downloads/) Base de donnée relationnelle
- [Sequelize](https://sequelize.org/) (Version 6.5.1)

<h2 id="dependence" align="center">Dépendences NPM</h2>

| Dépendance                | Description                                                                                                                                                 | Documentation                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Express                   | Express est un Framework qui fournit un ensemble robuste de fonctionnalités pour développer des applications Web et mobiles                                 | [Express](https://www.npmjs.com/package/express)                                     |
| Helmet                    | Helmet vous aide à sécuriser vos applications Express en définissant divers en-têtes HTTP.                                                                  | [Helmet](https://www.npmjs.com/package/helmet)                                       |
| Bcrypt                    | Bcrypt vous permet de crypter vos mots de passe.                                                                                                            | [bcrypt](https://www.npmjs.com/package/bcrypt)                                       |
| Body-Parser               | Parse des données JSON.                                                                                                                                     | [Body-Parser](https://www.npmjs.com/package/body-parser)                             |
| Dotenv                    | Dotenv est un module sans dépendance qui charge les variables d'environnement d'un fichier .env dans process.env. Utile pour cacher les données d'accès MD. | [Dotenv](https://www.npmjs.com/package/dotenv)                                       |
| Jsonwebtoken              | Création de Token.                                                                                                                                          | [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)                           |                                                                                                         | [Mongoose-Unique-Validator](https://www.npmjs.com/package/mongoose-unique-validator) |
| Multer                    | Multer est utilisé principalement pour télécharger des fichiers.                                                                                            | [Multer](https://www.npmjs.com/package/multer)                                       |
| Password Validator        | Password Validator est utilisé pour optimiser le mot de passe et le rendre plus robuste en y mettant des règles.                                            | [Password Validator](https://www.npmjs.com/package/password-validator)               |
| Axios | Système permettant de faire des requêtes simplifier vers la BDD | [Axios](https://www.npmjs.com/package/axios#features) |
| Sequelize | Sequelize est un outil ORM Node.js basé sur la promesse pour Postgres , MySQL , MariaDB , SQLite et Microsoft SQL Server | [Sequelize](https://www.npmjs.com/package/sequelize) |


<h2 align="center">Contact</h2>

:e-mail: [Emmanuelle](mailto:sheleril68@gmail.com) :e-mail:

:heavy_plus_sign: [Github](https://github.com/Sheleril)
