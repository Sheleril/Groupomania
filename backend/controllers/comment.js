//APPEL DES DEPENDANCES
const models = require('../models');
const jwtUtils  = require('../utils/jwt.utils');


//CREE UN COMMENTAIRE
exports.createComment = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    let content = req.body.content;

    if(content == '') {
       return res.status(400).json({ 'error': 'Paramètres invalides / Voir contenu'});
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound){
        models.Message.findOne({
            where: { id: req.params.id }
        })
        .then(function(messageFound){
            models.Comment.create({
                userId: userFound.id,
                messageId: messageFound.id,
                content: content,
                username: userFound.username
            })
            .then(function(){
                return res.status(201).json({ 'message': `Le commentaire a bien été crée`})
            })
            .catch(function(err){
                res.status(400).json({ 'error' : `Impossible de crée le commentaire`, err})
            })
        })
        .catch(function(err){
            res.status(404).json({ 'error' : `Impossible de trouver le message`, err})
        })
    })
    .catch(function(err){
        res.status(500).json({ 'error' : `Impossible de trouver l'utilisateur`, err})
    })
}

// CONDITION POUR RECUPERER LES COMMENTAIRES D'UN UTILISATEUR PARTICULIER
exports.listCommentsUser = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne ({
        where: { id: userId }
    })
    .then(function(userFound) {
        models.Comment.findAll({
            where: { userId: userFound.id }
        })
        .then(function(allCommentsUser) {
            if(!allCommentsUser.length == 0) {
                res.status(200).json(allCommentsUser);
            } else {
                res.status(404).json({ 'error': `Aucun commentaire n'a été trouvés`});
            }
        })
        .catch(function(err){
            res.status(500).json({ 'error': 'Impossible de vérifier les commentaires dans la BDD', err});
        })
    })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err})
    })
}

// CONDITION POUR SUPPRIMER UN COMMENTAIRE
exports.deleteOneComment = (req, res) =>  {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne ({
        where: { id: userId }
    })
    .then(function(userFound){
        // SI ADMINISTRATEUR ALORS SUPPRIME LE COMMENTAIRE QUE TU VEUX
        if(userFound.isAdmin == 1){
            models.Comment.findOne({
                where: { 
                    id: req.params.id
                }
            })
            .then(function(commentFound){
                commentFound.destroy({
                    where: {
                        id: commentFound.id
                    }
                })
                .then(function(){
                    res.status(201).json({ 'message': `Commentaire supprimé avec succès !`})
                })
                .catch(function(err){
                    res.status(404).json({ 'error': `Supression impossible`})
                })
            })
            .catch(function(err){
                res.status(500).json({'error': `Aucun commentaire n'est à supprimer`, err});
            })   
        } else {
            //SI PAS ADMINISTRATEUR, FAIT EN FONCTION DE L'ID DE L'UTILISATEUR
        models.Comment.findOne({
            where: { 
                userId: userFound.id,
                id: req.params.id
            }
        })
        .then(function(commentFound){
            commentFound.destroy({
                where: {
                    id: commentFound.id
                }
            })
            .then(function(){
                res.status(201).json({ 'message': `Commentaire supprimé avec succès !`})
            })
            .catch(function(err){
                res.status(404).json({ 'error': `Supression impossible`})
            })
        })
        .catch(function(err){
            res.status(500).json({'error': `Aucun commentaire n'est à supprimer`, err});
        })
        }
    })
    .catch(function(err){
        res.status(500).json({ 'error': `Impossible de récupérer l'utilisateur dans la BDD`, err});
    })
}

// CONDITION POUR RECUPERER TOUT LES COMMENTAIRES
exports.getAllComments = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(){
        models.Message.findOne({
            where: { id: req.params.id }
        })
        .then(function(messageFound){
            models.Comment.findAll({
                where: { messageId: messageFound.id }
            })
            .then(function(commentFound){
                if(!commentFound.length == 0){
                    res.status(201).json(commentFound)
                } else {
                    res.status(404).json({ 'message' : `Aucun commentaire pour ce message`})
                }
            })
            .catch(function(err){
                res.status(500).json({ 'error' : `Impossible de trouver le message ciblé`, err})
            })
        })
        .catch(function(err){
            res.status(500).json({ 'error' : `Impossible de trouver le message`, err})
        })
    })
    .catch(function(err){
        res.status(500).json({ 'error' : `Impossible de trouver l'utilisateur`, err})
    })
}
