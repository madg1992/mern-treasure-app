const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        // hashed password will be saved to the DB
        password: {
            type: String,
            required: true
        },
        // about: {
        //     type: String,
        //     trim: true
        // },
        salt: String,
        // Admin vs Regular User
        // New regular users will get a default 0
        role: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        }
    },
    // automatically generates an "Update At" and "Created At" time stamos
    { timestamps: true }
);