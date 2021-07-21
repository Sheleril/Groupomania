const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

router.post('/:id/comment', commentCtrl.createComment); // ROUTE POUR CREE UN COMMENTAIRE
router.get('/mycomment', commentCtrl.listCommentsUser); // ROUTE POUR TROUVER TOUT LES COMMENTAIRES DE L'UTILISATEUR
router.get('/:id/allcomments', commentCtrl.getAllComments); // ROUTE POUR RECUPERER TOUT LES COMMENTAIRES
router.delete('/mycomment/:id/delete', commentCtrl.deleteOneComment); // ROUTE POUR SUPPRIMER UN COMMENTAIRE

module.exports = router;