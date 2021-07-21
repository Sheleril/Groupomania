const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const multer = require('../middleware/multer-config');

router.post('/new', multer, messageCtrl.createMessage); // CREE le message
router.get('/', messageCtrl.getAllMessages); // ROUTE POUR RECUPERER TOUT LES MESSAGES
router.get('/myMessage', messageCtrl.listMessageUser); // ROUTE POUR TROUVER TOUT LES MESSAGES DE L'UTILISATEUR
router.get('/myMessage/:id', messageCtrl.getOneMessageFromUserId); //ROUTE POUR RECUPERER UN MESSAGE D'UN UTILISATEUR PRECISEMENT
router.put('/myMessage/:id/update', messageCtrl.updateMessageUser); // ROUTE POUR METTRE A JOUR UN MESSAGE D'UN UTILISATEUR
router.delete('/myMessage/:id/delete', messageCtrl.deleteOneMessage); // ROUTE POUR SUPPRIMER UN MESSAGE

module.exports = router;