import { Router, Request, Response } from 'express';
import { sayHello, sayBye } from '../controllers/auth.controller';

const router = Router();


router.post("/login", (req:Request,res:Response)=>{
    const saludo = sayHello();
    res.send(saludo)
    
})
router.post("/register", (req:Request,res:Response)=>{
    const chau= sayBye();
    res.send(chau)
    
})


module.exports = router;



