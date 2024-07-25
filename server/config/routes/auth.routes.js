const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const router = new Router()


