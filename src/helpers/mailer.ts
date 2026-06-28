import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email , emailType , userId}: any) => {
    try {
        //create hashed token
        const hashedToken = await bcryptjs.hash(userId.toString() , 10);

        if (emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000,
            });
        }
        else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
              forgotPasswordToken: hashedToken,
              forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_USER!,
            pass: process.env.MAILTRAP_PASS!,
          },
        });


        // console.log(process.env.MAILTRAP_USER!);
        // console.log(process.env.MAILTRAP_PASS!);

        const mailOptions = {
            from: 'noreply@example.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN!}/verifyemail?token=${hashedToken}">here</a> to
            ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link bellow in your browser: 
            <br> ${process.env.DOMAIN!}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        console.log("Mail sent: " , mailresponse);
        return mailresponse;
    } catch (error: any) {
        console.error("Mail Error: " , error)
        throw error;
    }
}
