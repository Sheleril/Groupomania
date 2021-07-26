//APPEL DES DEPENDANCES
const models = require('../models');
const jwtUtils  = require('../utils/jwt.utils');
const fs = require('fs');

// CREATION DE LIMITE POUR TITRE, CONTENU ET MESSAGES
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 2; 
const ITEMS_LIMIT = 50;

// CONDITION POUR CREE UN MESSAGE
exports.createMessage = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    let title = req.body.title;
    let content = req.body.content;

    if(title == '' || content == '') {  
        if(req.file != undefined) {
            let fileUrl =  `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
            let imageName = fileUrl.split('/images/')[1];
            fs.unlinkSync(`images/${imageName}`);
        }
        return res.status(400).json({ 'error': "Paramètres manquants"});
    }
    if(title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
        return res.status(400).json({ 'error': 'Paramètres invalides (Voir Titre ou contenu)'});
    }
    if(req.file == undefined){
        return res.status(400).json({ 'error': "Paramètres manquants"});
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound){
            models.Message.create({
                title: title, 
                content: content,
                likes: 0,
                UserId: userFound.id,
                attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                username: userFound.username,
            })
            .then(function(){
                return res.status(201).json('Message crée avec succcès')
            })
            .catch(function(err){
                res.status(400).json({ 'error': 'Impossible de crée le message', err})
            })
    })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err})
    })
}

// CONDITION POUR RECUPERER TOUT LES MESSAGES
exports.getAllMessages = (req, res) => {
    
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;

    if(limit > ITEMS_LIMIT) {
        limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['createdAt' , 'DESC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null, 
        limit: (!isNaN(limit)) ? limit : null, 
        offset: (!isNaN(offset)) ? offset : null,
    })
    .then(function(messages) {
        if(messages) {
            res.status(200).json(messages);
        } else {
            res.status(404).json({ 'message': `Les messages n'ont pas été trouvés`});
        }
    })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer les messages`, err});
    })
}

// CONDITION POUR RECUPERER LES MESSAGES D'UN UTILISATEUR PARTICULIER
exports.listMessageUser = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne ({
        where: { id: userId }
    })
    .then(function(userFound) {
        models.Message.findAll({
            where: { userId: userFound.id }
        })
        .then(function(allMessagesUser) {
            if(!allMessagesUser.length == 0) {
                res.status(200).json(allMessagesUser);
            } else {
                res.status(404).json({ 'error': `Aucun message n'a été trouvés`});
            }
        })
        .catch(function(err){
            res.status(500).json({ 'error': 'Impossible de vérifier les messages dans la BDD', err});
        })
    })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err})
    })
}

// CONDITION POUR MODIFIER SON MESSAGE
exports.updateMessageUser = (req, res) => {

   let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    let title = req.body.title;
    let content = req.body.content;

    if(title == '' || content == '') {
        return res.status(400).json({ 'error': "Paramètres manquants"});
    }
    if(title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
        return res.status(400).json({ 'error': 'Paramètres invalides (Voir Titre ou contenu)'});
    }

    models.User.findOne ({
        where: { id: userId }
    })
    .then(function(userFound){
        models.Message.findOne({
            where: {
                userId: userFound.id,
                id: req.params.id
            }
        })
        .then(function(messageFound){
            if (messageFound != null){
                messageFound.update({
                    title: title ,
                    content: content
                })
                .then(function(updateMessage){
                    res.status(201).json({ 'message': `Message modifié avec succès`, updateMessage})
                })
                .catch(function(err){
                    res.status(400).json({ 'error': 'Message non modifiable', err})
                })
            } else {
                return res.status(404).json({ 'error': 'Message non trouver'})
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': `Impossible de trouver vos messages`, err})
        })
    })
    .catch(function(err){
        return res.status(500).json({ 'error': `Impossible de trouver l'utilisateur`, err})
    })
}

// CONDITION POUR RECUPERER UN MESSAGE PARTICULIER
exports.getOneMessageFromUserId = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne ({
        where: { id: userId }
    })
    .then(function(){
        models.Message.findOne({
            where: { 
                id: req.params.id
            }
        })
        .then(function(messageFound){
            if(messageFound !==  null){
                res.status(201).json(messageFound)
            } else {
                res.status(404).json({ 'error': 'Message introuvable'})
            }
        })
        .catch(function(err) {
            res.status(500).json({'error': 'Impossible de rechercher le message', err});
        })
    })
    .catch(function(err) {
        res.status(500).json({'error': `Impossible de récupérer l'utilisateur dans la BDD`, err});
    })
}

// CONDITION POUR SUPPRIMER UN MESSAGE
exports.deleteOneMessage = (req, res) =>  {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne ({
        where: { id: userId }
    })
    .then(function(userFound){
        // SI ADMINISTRATEUR ALORS SUPPRIME LE MESSAGE QUE TU VEUX
        if(userFound.isAdmin == 1) {
            models.Message.findOne({
                where: { 
                    id: req.params.id
                }
            })
            .then(function(messageFound){
                const filename = messageFound.attachment.split('/images/')[1];
                fs.unlinkSync(`images/${filename}`)
                messageFound.destroy({
                    where: {
                        id: messageFound.id
                    }
                })
                .then(function(){
                    res.status(201).json({ 'message': `Message supprimé avec succès !`})
                })
                .catch(function(err){
                    res.status(404).json({ 'error': `Supression impossible`})
                })
            })
            .catch(function(err){
                res.status(500).json({'error': `Aucun message n'est à supprimer`, err});
            })
        } else {
            //SI PAS ADMINISTRATEUR, FAIT EN FONCTION DE L'ID DE L'UTILISATEUR
        models.Message.findOne({
            where: { 
                userId: userFound.id,
                id: req.params.id
            }
        })
        .then(function(messageFound){
            const filename = messageFound.attachment.split('/images/')[1];
            fs.unlinkSync(`images/${filename}`)
            messageFound.destroy({
                where: {
                    id: messageFound.id
                }
            })
            .then(function(){
                res.status(201).json({ 'message': `Message supprimé avec succès !`})
            })
            .catch(function(err){
                res.status(404).json({ 'error': `Supression impossible`})
            })
        })
        .catch(function(err){
            res.status(500).json({'error': `Aucun message n'est à supprimer`, err});
        })
    }
    })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err});
    })
}
