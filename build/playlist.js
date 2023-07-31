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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPlaylistSize = exports.scrollThroughPlaylist = exports.getAllVideosOnPlaylist = exports.getAllVideosUrls = void 0;
var utils_1 = require("./utils");
var data_1 = require("./data");
var webPage;
function getAllVideosUrls(page) {
    return __awaiter(this, void 0, void 0, function () {
        var videos, videosUrls;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    webPage = page;
                    return [4 /*yield*/, page.goto(data_1.playlistUrl)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getAllVideosOnPlaylist()];
                case 2:
                    videos = _a.sent();
                    return [4 /*yield*/, Promise.all(videos.map(function (video) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, webPage.evaluate(function (ss) { return ss.href; }, video)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 3:
                    videosUrls = _a.sent();
                    return [2 /*return*/, videosUrls];
            }
        });
    });
}
exports.getAllVideosUrls = getAllVideosUrls;
function getAllVideosOnPlaylist() {
    return __awaiter(this, void 0, void 0, function () {
        var playlistLength, videos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, extractPlaylistSize()];
                case 1:
                    playlistLength = _a.sent();
                    return [4 /*yield*/, scrollThroughPlaylist(playlistLength)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, webPage.$$("a.compact-media-item-image")];
                case 3:
                    videos = _a.sent();
                    console.log("".concat(videos.length, "/").concat(playlistLength, " videos where loaded from this playlist\n"));
                    return [2 /*return*/, videos];
            }
        });
    });
}
exports.getAllVideosOnPlaylist = getAllVideosOnPlaylist;
function scrollThroughPlaylist(playlistLength) {
    return __awaiter(this, void 0, void 0, function () {
        var videosLoadedSoFar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!1) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, utils_1.scroll)(webPage)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, webPage.$$("a.compact-media-item-image")];
                case 2:
                    videosLoadedSoFar = _a.sent();
                    if (videosLoadedSoFar.length == playlistLength) {
                        return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 0];
                case 3: return [4 /*yield*/, (0, utils_1.delay)(2000)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.scrollThroughPlaylist = scrollThroughPlaylist;
function extractPlaylistSize() {
    return __awaiter(this, void 0, void 0, function () {
        var playlistLengthContainer, playlistLengthAndWords, playlistLength;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, webPage.$("span.amsterdam-playlist-stat span.yt-core-attributed-string")];
                case 1:
                    playlistLengthContainer = _a.sent();
                    return [4 /*yield*/, webPage.evaluate(function (el) { return el.textContent; }, playlistLengthContainer)];
                case 2:
                    playlistLengthAndWords = _a.sent();
                    playlistLength = Number(playlistLengthAndWords.match(/\d+/)[0]);
                    return [2 /*return*/, playlistLength];
            }
        });
    });
}
exports.extractPlaylistSize = extractPlaylistSize;
