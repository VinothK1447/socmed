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
const Post = require('./../../models/Post');
const checkAuth = require('../../utils/check-auth');
module.exports = {
    Query: {
        getPosts() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const posts = yield Post.find().sort({ createdAt: -1 });
                    return posts;
                }
                catch (error) {
                    throw new Error('Error');
                }
            });
        },
        getPost(parent, { postId }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const post = yield Post.findById(postId);
                    if (post) {
                        return post;
                    }
                    else {
                        throw new Error('Post not found!');
                    }
                }
                catch (err) {
                    throw new Error(err);
                }
            });
        }
    },
    Mutation: {
        createPost(parent, { body }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = checkAuth(context);
                const newPost = new Post({
                    body,
                    user: user.id,
                    userName: user.userName,
                    createdAt: new Date().toISOString()
                });
                const post = yield newPost.save();
                return post;
            });
        },
        deletePost(parent, { postId }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = checkAuth(context);
                    const post = yield Post.findById(postId);
                    if (post && post.userName === user.userName) {
                        yield post.delete();
                        return 'Post deleted successfully!';
                    }
                    else {
                        throw new Error('Deleting post not allowed!');
                    }
                }
                catch (error) {
                    throw new Error('Error deleting post!');
                }
            });
        }
    }
};
//# sourceMappingURL=posts.js.map