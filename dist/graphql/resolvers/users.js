"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const Utils_1 = require("./../../utils/Utils");
function generateToken(user) {
    return jwt.sign({
        id: user.id,
        userName: user.userName,
        email: user.email
    }, SECRET_KEY, { expiresIn: '1h' });
}
module.exports = {
    Mutation: {
        register(parent, { registerInput: { userName, email, password, confirmPassword } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const isValid = Utils_1.Utils.validateRegisterFields({ userName, email, password, confirmPassword });
                if (Object.keys(isValid).length) {
                    throw new UserInputError('Mandatory fields missing!', { errors: Object.assign({}, isValid) });
                }
                const user = yield User.findOne({ userName: userName });
                if (user) {
                    throw new UserInputError('User already exist!', {
                        errors: {
                            userName: 'User name already taken, try another!'
                        }
                    });
                }
                password = yield bcrypt.hash(password, 12);
                const newUser = new User({
                    email,
                    userName,
                    password,
                    createdAt: new Date().toISOString()
                });
                const res = yield newUser.save();
                const token = generateToken(res);
                return Object.assign(Object.assign({}, res._doc), { id: res._id, token });
            });
        },
        login(parent, { userName, password }) {
            return __awaiter(this, void 0, void 0, function* () {
                const isValid = Utils_1.Utils.validateLoginInput(userName, password);
                if (!Object.keys(isValid).length) {
                    const user = yield User.findOne({ userName });
                    if (!user) {
                        throw new UserInputError('Invalid login', {
                            errors: {
                                login: 'Invalid login attempt!'
                            }
                        });
                    }
                    const match = yield bcrypt.compare(password, user.password);
                    if (!match) {
                        throw new UserInputError('Invalid credentials entered', {
                            errors: {
                                invalid: 'Invalid credentials entered!'
                            }
                        });
                    }
                    const token = generateToken(user);
                    return Object.assign(Object.assign({}, user._doc), { id: user._id, token });
                }
                else {
                    throw new UserInputError('Mandatory fields missing!', { errors: Object.assign({}, isValid) });
                }
            });
        }
    }
};
//# sourceMappingURL=users.js.map