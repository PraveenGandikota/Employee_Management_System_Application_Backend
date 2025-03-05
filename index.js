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
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();  

const app = express();

// ✅ Fix: Improved CORS Configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// ✅ Fix: Handle Preflight Requests Properly
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://employee-management-system-aplication.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Preflight request response
    }
    next();
});

app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use(express.static('Public'));

// ✅ Authentication Middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {  
            if (err) return res.json({ Status: false, Error: "Wrong Token" });
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        return res.json({ Status: false, Error: "Not authenticated" });
    }
};

// ✅ Route to Verify User
app.get('/verify', verifyUser, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
