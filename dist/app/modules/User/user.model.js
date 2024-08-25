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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_constant_1 = require("./user.constant");
const config_1 = __importDefault(require("../../config"));
exports.userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    passwordChangedAt: { type: Date },
    role: {
        type: String,
        enum: ['superAdmin', 'admin', 'user'],
    },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
    status: {
        type: String,
        enum: user_constant_1.userStatus,
        default: 'in-progress',
    },
    pImage: { type: String },
    membership: {
        type: String,
        enum: user_constant_1.memberShipStatus,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
/* middlewares */
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        /* hashing the password before save to db */
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// filter out deleted docs
exports.userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.userSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
/* set empty sting after saving the password */
exports.userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
/* create the static method */
exports.userSchema.statics.isUserExistsByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email }).select('+password');
    });
};
exports.userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
exports.userSchema.statics.isJWTIssuedBeforePasswordChange = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
        return passwordChangedTime > jwtIssuedTimestamp;
    });
};
/* declare the model */
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
