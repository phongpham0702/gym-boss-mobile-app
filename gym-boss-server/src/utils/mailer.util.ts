import nodemailer from "nodemailer";


export class Mailer{
    private transporter:object;
    constructor() {
 
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "smartwalletmailer11042022@gmail.com",
              pass: "iurx gixl rngc dhfh",
            },
        })

        console.log(typeof(this.transporter));
    }

    public SendMail(receiverEmail,content){
        
    }
}
