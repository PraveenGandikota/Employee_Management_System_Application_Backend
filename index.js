// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv"; 
// import { adminRouter } from "./Routes/AdminRoute.js";
// import Jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";

// dotenv.config();  

// const app = express();

// app.use(cors({
//     origin: 'https://employee-management-system-aplication.netlify.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());
// app.use('/auth', adminRouter);
// app.use(express.static('Public'));

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

// const PORT = process.env.PORT || 5000; 

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import { adminRouter } from "./Routes/AdminRoute.js";
// import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();  

const app = express();

// ✅ Fixing CORS (Correct Netlify URL)
app.use(cors({
    origin: 'https://employee-management-system-aplication.netlify.app', // ✅ Fixed URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// ✅ Set CORS Headers Manually
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'https://employee-management-system-aplication.netlify.app');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// ✅ Handle Preflight Requests
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", 'https://employee-management-system-aplication.netlify.app');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

app.use(express.json());
app.use(cookieParser());
app.use("/auth", adminRouter);
app.use(express.static("Public"));

// // ✅ Token Verification Middleware
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

// // ✅ Verify Endpoint
// // app.get("/verify", verifyUser, (req, res) => {
// //     return res.json({ Status: true, role: req.role, id: req.id });
// // });

// app.get("/", (req, res) => {
//     res.send("Employee Management System Backend is Running!");
// });

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
