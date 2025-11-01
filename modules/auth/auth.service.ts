import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface VerifyJwtResult {
  data: JwtPayload | null;
  message: string;
  is_authorized: boolean;
}

export class AuthService {
    private secret_key: string;

    constructor(){
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables");
        }
        this.secret_key = process.env.SECRET_KEY;
    };

    async encryptString(string:string) {
        return await bcrypt.hash(string, 10);
    };

    async compareStrings(stored:string,checking: string) {
        return await bcrypt.compare(checking, stored)
    };

    async generateJwtToken(data: { email: string, name: string; id: string}){
        const token = jwt.sign(
            data,
            this.secret_key,
            { expiresIn: "7d" }
        );
        return token
    };

    async verifyJwtToken(token: string): Promise<VerifyJwtResult> {
        try {
            if (!token) throw new Error("No token provided");

            const decoded = jwt.verify(token, this.secret_key);
            console.log("decoded",decoded)
            const data = typeof decoded === "object" ? (decoded as JwtPayload) : null;

            return { data, message: "Success", is_authorized: true };
        } catch (err: any) {
            return { data: null, message: err.message || "Invalid token", is_authorized: false };
        }
    }
};