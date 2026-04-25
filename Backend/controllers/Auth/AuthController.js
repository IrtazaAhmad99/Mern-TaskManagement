const bcrypt = require("bcryptjs")
const User = require("../../models/users.js")
const { sendOtpEmail } = require("../../utils/sendEmail.js")
const { generateToken } = require("../../utils/generateToken.js")
const jwt = require("jsonwebtoken");

const AuthController = {

    async signup(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const userExists = await User.findOne({ email: email.toLowerCase() });

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = Date.now() + 10 * 60 * 1000;

            if (userExists) {
                if (userExists.isVerified) {
                    return res.status(400).json({ message: "Email already registered" });
                }
                userExists.otp = otp;
                userExists.otpExpiry = otpExpiry;
                await userExists.save();

                await sendOtpEmail(userExists.email, userExists.name, otp);

                return res.status(200).json({
                    message: "Account already exists but not verified. New OTP sent to email.",
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role: "user",
                isVerified: false,
                otp,
                otpExpiry,
            });

            try {
                await sendOtpEmail(newUser.email, newUser.name, otp);
            } catch (emailError) {
                await User.findByIdAndDelete(newUser._id);
                console.error("Email send failed:", emailError);
                return res.status(500).json({ message: "Failed to send OTP email. Please try again." });
            }

            return res.status(201).json({
                message: "Registration successful. OTP sent to your email.",
                email: newUser.email,
            });
        } catch (error) {
            console.error("Register error:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                return res.status(400).json({ message: "Email and OTP are required" });
            }

            const user = await User.findOne({ email: email.toLowerCase() });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.isVerified) {
                return res.status(400).json({ message: "User already verified" });
            }


            if (user.otp !== otp) {
                return res.status(400).json({ message: "Invalid OTP" });
            }


            if (user.otpExpiry < Date.now()) {
                return res.status(400).json({ message: "OTP expired please resend OTP" });
            }

            user.isVerified = true;
            user.otp = null;
            user.otpExpiry = null;

            await user.save();

            return res.status(200).json({
                message: "Email verified successfully. You can now login.",
            });

        } catch (error) {
            console.error("OTP Verify Error:", error);
            return res.status(500).json({ message: error.message });
        }
    },

    async resendOTP(req, res) {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();

         
            await sendOtpEmail(user.email, user.name, otp);

            user.otp = otp;
            user.otpExpires = Date.now() + 10 * 60 * 1000;

            await user.save();

            return res.status(200).json({
                message: "OTP resent successfully",
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }


            if (!user.isVerified) {
                return res.status(400).json({ message: "Please verify your email first" });
            }


            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = generateToken(user)

            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });

        } catch (error) {
            console.error("Login Error:", error);
            return res.status(500).json({ message: error.message });
        }
    }
}
module.exports = AuthController