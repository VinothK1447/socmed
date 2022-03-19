"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: String,
    password: String,
    email: String,
    createdAt: String
});
module.exports = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.js.map