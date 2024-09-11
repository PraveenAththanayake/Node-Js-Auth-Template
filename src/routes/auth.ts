import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from "../controllers/auth";
import { registerValidation } from "../middleware/register_validation";
import { loginValidation } from "../middleware/login_validations";

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);

export default router;
