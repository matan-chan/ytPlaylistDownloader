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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Downloader = void 0;
var utils_1 = require("./utils");
var FormatConverter_1 = require("./FormatConverter");
var SongTagsSearch_1 = require("./SongTagsSearch");
var node_id3_1 = __importDefault(require("node-id3"));
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var path_1 = __importDefault(require("path"));
var os_1 = __importDefault(require("os"));
var fs = require("fs");
var Downloader = exports.Downloader = /** @class */ (function () {
    function Downloader(_a) {
        var outputDirWithTag = _a.outputDirWithTag, outputDirNoTag = _a.outputDirNoTag;
        this.outputDirWithTag = outputDirWithTag !== null && outputDirWithTag !== void 0 ? outputDirWithTag : Downloader.defaultDownloadsDir;
        this.outputDirNoTag = outputDirNoTag !== null && outputDirNoTag !== void 0 ? outputDirNoTag : Downloader.defaultDownloadsDir;
    }
    Downloader.prototype.downloadSong = function (url, videoTitle) {
        return __awaiter(this, void 0, void 0, function () {
            var videoInfo, formatConverter, videoData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ytdl_core_1.default
                            .getInfo(url, { requestOptions: { backoff: { inc: 10000, max: 10000 } } })
                            .catch(function (error) {
                            throw new utils_1.YtdlMp3Error("Failed to fetch info for video with URL: ".concat(url));
                        })];
                    case 1:
                        videoInfo = _a.sent();
                        formatConverter = new FormatConverter_1.FormatConverter();
                        return [4 /*yield*/, this.downloadVideo(videoInfo)];
                    case 2:
                        videoData = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.downloadWithMetadata(formatConverter, videoData, videoInfo)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, this.downloadWithoutMetadata(videoTitle, formatConverter, videoData)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Downloader.prototype.downloadWithMetadata = function (formatConverter, videoData, videoInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var songTagsSearch, songTags, outputFile, doesntExistAlready;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        songTagsSearch = new SongTagsSearch_1.SongTagsSearch(videoInfo.videoDetails);
                        return [4 /*yield*/, songTagsSearch.search()];
                    case 1:
                        songTags = _a.sent();
                        outputFile = this.getDownloadPathWithTag(videoInfo.videoDetails.title);
                        doesntExistAlready = formatConverter.videoToAudio(videoData, outputFile);
                        if (doesntExistAlready) {
                            node_id3_1.default.write(songTags, outputFile);
                        }
                        return [2 /*return*/, "Success"];
                }
            });
        });
    };
    Downloader.prototype.downloadWithoutMetadata = function (videoTitle, formatConverter, videoData) {
        var outputFile = this.getDownloadPathWithoutTag(videoTitle);
        formatConverter.videoToAudio(videoData, outputFile);
        fs.renameSync(outputFile, "musicWithoutMetadata/" + videoTitle + ".mp3");
        return "SuccessNoMetadata";
    };
    Downloader.prototype.downloadVideo = function (videoInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var buffers, stream;
            return __generator(this, function (_a) {
                buffers = [];
                stream = ytdl_core_1.default.downloadFromInfo(videoInfo, {
                    quality: "highestaudio",
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        stream.on("data", function (chunk) {
                            buffers.push(chunk);
                        });
                        stream.on("end", function () {
                            resolve(Buffer.concat(buffers));
                        });
                        stream.on("error", function (err) {
                            reject(err);
                        });
                    })];
            });
        });
    };
    Downloader.prototype.getDownloadPathWithoutTag = function (videoTitle) {
        var baseFileName = this.getBaseFileName(videoTitle);
        return path_1.default.join(this.outputDirNoTag, baseFileName + ".mp3");
    };
    Downloader.prototype.getDownloadPathWithTag = function (videoTitle) {
        var baseFileName = this.getBaseFileName(videoTitle);
        return path_1.default.join(this.outputDirWithTag, baseFileName + ".mp3");
    };
    Downloader.prototype.getBaseFileName = function (videoTitle) {
        var baseFileName = (0, utils_1.removeParenthesizedText)(videoTitle)
            .replace(/\s*[([.*?[)\]$%^&#@!\- ]\s*/g, "_")
            .toLowerCase();
        return baseFileName;
    };
    Downloader.defaultDownloadsDir = path_1.default.join(os_1.default.homedir(), "Downloads");
    return Downloader;
}());
