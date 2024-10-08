"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = require("../errors/handleZodError");
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    // set default values
    let statusCode = 500;
    let message = 'Something went wrong!';
    // create errorsource array of object
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];
    //check te error provider
    if (err instanceof zod_1.ZodError) {
        const simplified = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplified === null || simplified === void 0 ? void 0 : simplified.statusCode;
        message = simplified === null || simplified === void 0 ? void 0 : simplified.message;
        errorSources = simplified === null || simplified === void 0 ? void 0 : simplified.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplified = (0, handleValidationError_1.default)(err);
        statusCode = simplified === null || simplified === void 0 ? void 0 : simplified.statusCode;
        message = simplified === null || simplified === void 0 ? void 0 : simplified.message;
        errorSources = simplified === null || simplified === void 0 ? void 0 : simplified.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplified = (0, handleCastError_1.default)(err);
        statusCode = simplified === null || simplified === void 0 ? void 0 : simplified.statusCode;
        message = simplified === null || simplified === void 0 ? void 0 : simplified.message;
        errorSources = simplified === null || simplified === void 0 ? void 0 : simplified.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplified = (0, handleDuplicateError_1.default)(err);
        statusCode = simplified === null || simplified === void 0 ? void 0 : simplified.statusCode;
        message = simplified === null || simplified === void 0 ? void 0 : simplified.message;
        errorSources = simplified === null || simplified === void 0 ? void 0 : simplified.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    //ultimate return
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
