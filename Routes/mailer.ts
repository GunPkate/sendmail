import express, { Router, Request, Response } from "express";
import { sendEmail } from "../function/sendmail";

const router: Router = express.Router();
router.post("/mail", async (req: Request, res: Response) => {
  try {
    const emails: Array<string> = [
      "gundash1@hotmail.com",
      "edvisory.test.mail@gmail.com",
      "pu.gun_st@tni.ac.th",
      "gundash1@gmail.com",
    ];

    if (emails.length != 0) {
      const info = await sendEmail(req.body, emails);

      res.json({
        department_name: req.body,
        email_count: emails.length,
        email: emails,
        info: info,
      });
    } else {
      return "invalid Email";
    }
  } catch (error) {
    res.status(500);
  }
});
export default router;
