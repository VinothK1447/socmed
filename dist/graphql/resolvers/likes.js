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
const checkAuth = require('../../utils/check-auth');
const Post = require('../../models/Post');
module.exports = {
    Mutation: {
        likePost: (parent, { postId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { userName } = checkAuth(context);
            const post = yield Post.findById(postId);
            if (post) {
                if (post.likes.find((like) => like.userName === userName)) {
                    post.likes = post.likes.filter((like) => like.userName !== userName);
                }
                else {
                    post.likes.push({
                        userName,
                        createdAt: new Date().toISOString()
                    });
                }
                yield post.save();
                return post;
            }
            else {
                throw new Error('Post not found!');
            }
        })
    }
};
//# sourceMappingURL=likes.js.map