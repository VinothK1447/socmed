"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    body: String,
    userName: String,
    createdAt: String,
    comments: [
        {
            body: String,
            userName: String,
            createdAt: String
        }
    ],
    likes: [
        {
            userName: String,
            createdAt: String
        }
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    }
});
module.exports = (0, mongoose_1.model)('Post', postSchema);
//# sourceMappingURL=Post.js.map