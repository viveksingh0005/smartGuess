const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

const authMiddleware=require(
    "../middleware/authMiddleware"
);// Your existing auth middleware



router.post('/create',           authMiddleware.authUser, gameController.createRoom);
router.post('/join',             authMiddleware.authUser, gameController.joinRoom);
router.get('/',                  authMiddleware.authUser, gameController.getQuestionBank);

router.get('/:roomId',           authMiddleware.authUser, gameController.getGameState);

module.exports = router;