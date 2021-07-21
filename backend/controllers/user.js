//APPEL DES DEPENDANCES
const validator = require('validator');
const jwtUtils  = require('../utils/jwt.utils');
const bcrypt = require('bcrypt');
const models = require('../models');
const fs = require('fs');
const { model } = require('../config/dbconnect');

// FONCTION SUPPRESSION ATTACHMENT
function deleteImg(userId) {
    models.Message.findAll({
        attributes: ['attachment'], 
        where: { userId: userId}
    })
    .then(function(allMessage){
        for (let message of allMessage){
            let filename = message.attachment.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                console.log('Les images sont supprimer')
            })
        }
    })
    .catch(function(err){
        res.status(404).json({ 'error': `Aucune image trouvé pour l'utilisateur recherché`, err})
    })
}

//CONDITION LORS DE CREATION COMPTE
exports.register = (req, res) => {

    let email    = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let bio      = req.body.bio;

    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error': 'Paramètres manquants' });
    }
    if (username.length >= 17 || username.length <= 2) {
        return res.status(400).json({ 'error': `Caractère requis entre 3 - 16` });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ 'error': 'Format Email non valide' });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ 'error': 'Mot de passe non valide' });
    }
    
    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(function(userFound) {
        if (!userFound) {
            
            bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                let newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    bio: bio,
                    avatar: null,
                    isAdmin: 0
                })
                .then(function(newUser){
                    return res.status(201).json({
                        'userId': newUser.id
                    })
                })
                .catch(function(err){
                    return res.status(400).json({ 'error': `Impossible de créer un utilisateur`, err});
                });
            });
        } else {
            return res.status(409).json({ 'error': `L'utilisateur existe déjà`});
        }
    })
    .catch(function(err){
        return res.status(500).json({ 'error': `Impossible de vérifier l'utilisateur`, err });
    });
}

//CONDITION POUR SE LOGUER
exports.login = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'Paramètres manquants'});
    }

    models.User.findOne({
        where: { email: email }
    })
    .then(function(userFound){
        if (userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                if(resBycrypt) {
                    return res.status(200).json({
                        'userId': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    })
                } else {
                    return res.status(403).json({ 'error': 'Mot de passe invalide'});
                }
            });
        } else {
            return res.status(404).json({ 'error': `L'utilisateur n'existe pas dans la BDD`});
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'error': `Impossible de vérifier l'utilisateur`, err});
    });
}

//CONDITION POUR RECUPERER UN PROFIL
exports.getUserProfil = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne({
        attributes: [ 'id', 'email', 'username', 'bio', 'isAdmin', 'avatar' ],
        where: { id: userId }
    })
    .then(function(user) {
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ 'error': 'Utilisateur non trouvé dans la BDD'})
        }
    })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err})
    })
}

// CONDITION POUR MODIFIER UN COMPTE
exports.updateUserProfil = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    let bio = req.body.bio;

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound){
        if(!req.file){
            if(userFound.bio !== bio || userFound.bio == ''){
                userFound.update({
                    bio: bio
                })
            .then(function() {
                res.status(201).json({'message': `Bio mise à jour avec succès`})
            })
            } else {
                res.status(400).json({ 'message': `Votre bio est identique`})
            }
        } else if(userFound.avatar) {
            if(userFound.bio !== bio || userFound.bio == ''){
                const filename = userFound.avatar.split('/avatars/')[1]
                fs.unlinkSync(`avatars/${filename}`)
                userFound.update({
                    avatar: `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`,
                    bio: bio
                })
            .then(function() {
                res.status(201).json({'message': `Bio et avatar mise à jour avec succès`})
            })
            } else {
                const filename = userFound.avatar.split('/avatars/')[1]
                console.log(filename)
                fs.unlinkSync(`avatars/${filename}`)
            userFound.update({
                avatar: `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`
            })            
            .then(function() {
                res.status(201).json({'message': `Avatar mise à jour avec succès`})
            })
            }
        } else {
            if(userFound.bio !== bio || userFound.bio == ''){
                userFound.update({
                    avatar: `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`,
                    bio: bio
                })
            .then(function() {
                res.status(201).json({'message': `Bio et avatar mise à jour avec succès`})
            })
        }
    }
    })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err})
    })       

}

// CONDITION POUR SUPPRIMER UN COMPTE
exports.deleteUserProfil = (req, res) => {
    
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne ({
        where: { id: userId }
    })
    .then(function(userFound){
        const filename = userFound.avatar.split('/avatars/')[1]
        fs.unlinkSync(`avatars/${filename}`)
        deleteImg(userId)
        userFound.destroy()
        })    
        .then(function(){
            res.status(200).json({ 'message': `Le compte de l'utilisateur a bien été supprimé`})
        })
        .catch(function(err){
            res.status(409).json({ 'error': `Impossible de supprimer le compte`, err})
        })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err})
    })    
}

// FONCTION POUR RECUPERER TOUT LES UTILISATEURS DE GROUPOMANIA
exports.getAllUser = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound){
        if(userFound.isAdmin == 1){
            models.User.findAll({
                attributes: [ 'id', 'email', 'username', 'bio', 'isAdmin', 'avatar' ],
            })
            .then(function(allUser) {
                if(allUser) {
                    res.status(200).json(allUser)
                } else {
                    res.status(404).json({ 'error': 'Utilisateur non trouvé dans la BDD'})
                }
            })
            .catch(function(err){
                res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err})
            }) 
        } else {
            return res.status(401).json({ 'error': `Vous n'êtes pas administrateur`})
        }
    })
}

//FONCTION POUR SUPPRIMER UN UTILISATEUR PAR ADMINISTRATEUR
exports.deleteUserByAdmin = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne ({
        where: { id: req.params.id}
    })
    .then(function(userFound){
        const filename = userFound.avatar.split('/avatars/')[1]
        fs.unlinkSync(`avatars/${filename}`)
        deleteImg(userFound.id)
        userFound.destroy()
        })    
        .then(function(){
            res.status(200).json({ 'message': `Le compte de l'utilisateur a bien été supprimé`})
        })
        .catch(function(err){
            res.status(401).json({ 'error': `Impossible de supprimer le compte`, err})
        })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err})
    })    
}

//FONCTION POUR MODIFIER LE MDP 
exports.updatePassword = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);
    let password = req.body.password
    let newPassword = req.body.newpassword

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }
    if(newPassword == password){
        return res.status(400).json({ 'error': `Votre mot de passe est identique, veuillez le remplacer`});
    }
    if (!validator.isStrongPassword(newPassword)) {
        return res.status(400).json({ 'message': `Le format de votre nouveau mot de passe n'est pas valide` });
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound){
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            if(resBycrypt) {
                bcrypt.hash(newPassword, 5)
                .then(hash => {
                    userFound.update({
                        password: hash
                    }).then(function(){
                        res.status(201).json({'message': `Mot de passe mis à jour avec succès`})
                    }).catch(function(err){
                        res.status(400).json({ 'error': `Votre mot de passe est identitque, veuillez le changer`, err})
                    })
                })
            } else {
                return res.status(400).json({ 'error': `Mot de passe actuel renseigné non valide`});
            }
        })

    })
    .catch(function(err){
        return res.status(404).json({ 'error': `Impossible de trouver l'utilisateur dans la BDD`});
    })
}