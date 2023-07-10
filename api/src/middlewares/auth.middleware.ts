import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import userService from "../services/user.service";
import dotenv from "dotenv";
dotenv.config();

// Estenda a interface Request para adicionar a propriedade userId
interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.sendStatus(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.sendStatus(401);
    }

    const secret: Secret = process.env.SECRET_JWT || ""; // Forneça um valor padrão ou altere o tipo para o tipo de segredo apropriado

    if (!secret) {
      return res.status(500).send({ message: "JWT secret is not defined" });
    }

    jwt.verify(token, secret, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invalid!" });
      }

      if (!decoded || typeof decoded !== "object" || !decoded.id) {
        return res.status(401).send({ message: "Invalid token!" });
      }

      const user = await userService.findByIdService(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Invalid token!" });
      }

      req.userId = user.id;

      return next();
    });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
