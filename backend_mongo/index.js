const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AdminRoutes = require('./routes/AdminRoute');
const EmployeeRoutes = require('./routes/EmployeeRoute');
process.env.TZ = "Asia/Kolkata";
const {connectDB} = require('./config/database/connectDB');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

connectDB();

app.use("/api/admin",AdminRoutes);
app.use("/api/employee",EmployeeRoutes);

app.listen(port,()=>console.log(`App listening on port ${port}`));