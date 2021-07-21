//APPEL DES DEPENDANCES
const models = require('../models');
const jwtUtils  = require('../utils/jwt.utils');
const { model } = require('../config/dbconnect');

const like = 1;
const unlike = -1;

exports.likeMessage = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.Message.findOne({
        where: { id: req.params.id}
    })
    .then(function(messageFound){
        models.Like.findOne({
            where: {
                messageId: messageFound.id,
                userId: userId
            }
        })
        .then(function(likeFound){
            if(!likeFound){
                models.Like.create({
                    messageId: req.params.id,
                    userId: userId
                })
                .then(function(){
                    messageFound.update({
                        likes : messageFound.likes + like
                    })
                    .then(function(){
                        res.status(201).json({ 'message': `J'aime ce message`})
                    })
                    .catch(function(err){
                        res.status(400).json({ 'error': 'Impossible de mettre à jour le like', err})
                    })
                })
                .catch(function(err){
                    res.status(500).json({ 'error': 'Impossible de créer le like', err})
                })
            } else {
                likeFound.destroy()
                .then(function(){
                    messageFound.update({
                        likes : messageFound.likes + unlike
                    })
                    .then(function(){
                        res.status(201).json({ 'message': "Je n'aime plus ce message"})
                    })
                    .catch(function(err){
                        res.status(500).json({ 'error': "Impossible de mettre à jour le like" , err})
                    })
                })
                .catch(function(err) {
                    res.status(500).json({'error' : 'Impossible de ne plus aimer le message', err})
                })
            }
        })
        .catch(function(err){
            res.status(404).json({ 'error': 'Impossible de trouver un like', err})
        })
    })
    .catch(function(err){
        res.status(404).json({ 'error': 'Impossible de trouver le message', err})
    })
}

exports.listLikeByUser = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
        return res.status(401).json({ 'error': 'Token non trouvé'})
    }

    models.Message.findOne ({
        where: { id: req.params.id }
    })
    .then(function(messageFound) {
        models.Like.findAll({
            where: { 
                userId: userId,
                messageId: messageFound.id,
             }
        })
        .then(function(likeFound) {
            return res.status(201).json(likeFound)
        })
        .catch(function(err){
            res.status(404).json({ 'error': 'Aucun like trouvé pour ce message', err});
        })
    })
    .catch(function(err){
        res.status(500).json({ 'error': `Message introuvable`, err})
    })
}