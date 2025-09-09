import express from 'express'
import { getUserById,getUsers } from '../controllers/userController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router=express.Router();

//User mangement Router
router.get("/",protect,adminOnly,getUsers);//get user(Admin only)
router.get("/:id",protect,getUserById);//get user by id
// router.delete("/:id",protect,adminOnly,deleteUser);//get user by id


export default router;