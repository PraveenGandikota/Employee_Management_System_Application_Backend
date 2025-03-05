import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import { adminRouter } from "./Routes/AdminRoute.js";
// import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();  

const app = express();

// app.post("/auth/adminlogin", (req, res) => {
//     res.json({ message: "Login Successful" });
//   });

app.use(cors({
    origin: 'https://employee-management-system-aplication.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use(express.static('Public'));
// app.use(express.urlencoded({ extended: true }));

// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if (token) {
//         Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {  
//             if (err) return res.json({ Status: false, Error: "Wrong Token" });
//             req.id = decoded.id;
//             req.role = decoded.role;
//             next();
//         });
//     } else {
//         return res.json({ Status: false, Error: "Not authenticated" });
//     }
// };

// app.get('/verify', verifyUser, (req, res) => {
//     return res.json({ Status: true, role: req.role, id: req.id });
// });

//const PORT = process.env.PORT || 3000; 

app.listen(5000, () => {
    // console.log(`Server is running on port ${PORT}`);
    console.log(`Server is running on port 5000`);
});
