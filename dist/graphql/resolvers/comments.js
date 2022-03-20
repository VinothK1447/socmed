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
const apollo_server_1 = require("apollo-server");
const checkAuth = require('../../utils/check-auth');
const Post = require('../../models/Post');
module.exports = {
    Mutation: {
        createComment: (parent, { postId, body }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { userName } = checkAuth(context);
            if (!body) {
                throw new apollo_server_1.UserInputError('Comment cannot be empty!');
            }
            const post = yield Post.findById(postId);
            if (post) {
                post.comments.unshift({
                    body,
                    userName,
                    createdAt: new Date().toISOString()
                });
                yield post.save();
                return post;
            }
            else {
                throw new apollo_server_1.UserInputError('Post not found!');
            }
        }),
        deleteComment: (parent, { postId, commentId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { userName } = checkAuth(context);
            if (!postId || !commentId) {
                throw new apollo_server_1.UserInputError('Post or comment cannot be empty!');
            }
            const post = yield Post.findById(postId);
            if (post) {
                const commentIdx = post.comments.findIndex((_comment) => _comment.id === commentId);
                if (commentIdx < 0) {
                    throw new apollo_server_1.UserInputError('Comment does not exist!');
                }
                if (post.comments[commentIdx].userName === userName) {
                    post.comments.splice(commentIdx, 1);
                    yield post.save();
                    return post;
                }
                else {
                    throw new apollo_server_1.AuthenticationError('User not allowed to delete this comment!');
                }
            }
            else {
                throw new apollo_server_1.UserInputError('Post not found!');
            }
        })
    }
};
//# sourceMappingURL=comments.js.map