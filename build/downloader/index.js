"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YtdlMp3Error = exports.FormatConverter = exports.Downloader = void 0;
var Downloader_1 = require("./Downloader");
Object.defineProperty(exports, "Downloader", { enumerable: true, get: function () { return Downloader_1.Downloader; } });
var FormatConverter_1 = require("./FormatConverter");
Object.defineProperty(exports, "FormatConverter", { enumerable: true, get: function () { return FormatConverter_1.FormatConverter; } });
__exportStar(require("./SongTagsSearch"), exports);
var utils_1 = require("./utils");
Object.defineProperty(exports, "YtdlMp3Error", { enumerable: true, get: function () { return utils_1.YtdlMp3Error; } });
