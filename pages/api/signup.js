// Import necessary modules
import connectDb from "../../middleware/mongoose";
import User from "../../models/user";
import CryptoJS from 'crypto-js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

const email1 = process.env.EMAIL
const pass = process.env.EMAIL_PASS;

const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })

        }
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email1,
                pass,
            },
        });

        const mailOptions = {
            from: "harshtiwari.up2004@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN_URI}/verifyemail?token=${hashedToken}">here</a>to ${emailType === 'VERIFY' ? "Verify your email" : "Reset your password"} or copy and paste the url in browser </br> ${process.env.DOMAIN_URI}/verifyemail?token=${hashedToken}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
} 

const handler = async (req, res) => {
    await connectDb();
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ error: "Email already exists. Please choose another email." });
            }

            // Hash the password securely using CryptoJS
            const hashedPassword = CryptoJS.SHA256(password).toString();

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            // Send email to user
            await sendEmail({ email, emailType: 'VERIFY', userId: newUser._id });

            return res.status(200).json({ success: "Account created successfully. Check your email for verification instructions." });
        } catch (error) {
            console.error('Error during signup:', error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(400).json({ error: "Bad request" });
    }
}

export default handler;
