const express = require('express');

const {
    addUser,
    allUsers,
    getUserById,
    getUserByQuery,
    updateUserBySIC,
    deleteUserBySIC,
    login 
} = require('./../controllers/user.controller.js');

const logger = require('./../middleware/logger.middleware.js');

const userRouter = express.Router();

userRouter.get('/', logger, allUsers);
userRouter.get('/search/:data', getUserByQuery); 
userRouter.get('/:id', getUserById);     
userRouter.post('/', addUser);
userRouter.put('/sic/:sic', updateUserBySIC); 
userRouter.delete('/sic/:sic', deleteUserBySIC);
userRouter.post('/login', login); 

module.exports = userRouter;
