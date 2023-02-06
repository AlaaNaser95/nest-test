import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => {
    return {
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRY },
    };
});