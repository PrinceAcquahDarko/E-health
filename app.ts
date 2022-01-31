import {app} from './server'
import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const URL = process.env.URL!
const PORT = process.env.PORT || 3000


mongoose.connect(URL)
    .then(data => console.log('we connected'))
    .catch(e => console.log(e))


app.listen(PORT, () => console.log('we listening!!'))