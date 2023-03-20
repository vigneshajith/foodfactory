import { verify } from "jsonwebtoken";
import { UNAUTH_REQ } from "../constance/http_status";

export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    if (!token) return res.status(UNAUTH_REQ).send();

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!);
        req.user = decodedUser
    } catch (error) {
        res.status(UNAUTH_REQ).send();
    }
    return next();
}