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
exports.DownloadHub = void 0;
var Downloader_1 = require("./downloader/Downloader");
var data_1 = require("./data");
var ytdl = require("ytdl-core");
var DownloadHub = /** @class */ (function () {
    function DownloadHub(videosUrls) {
        this.success = 0;
        this.successNoMetadata = 0;
        this.failed = 0;
        this.videosUrls = videosUrls;
    }
    DownloadHub.prototype.downloadVideos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.videosUrls.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.attemptToDownloadVideo(this.videosUrls[this.videosUrls.length - i - 1])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DownloadHub.prototype.attemptToDownloadVideo = function (downloadUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.downloadVideo(downloadUrl)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.logHub("Failed", downloadUrl);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DownloadHub.prototype.downloadVideo = function (downloadUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var videoTitle, downloadState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVideoTitle(downloadUrl)];
                    case 1:
                        videoTitle = _a.sent();
                        return [4 /*yield*/, this.downloaderWrapper(downloadUrl, videoTitle)];
                    case 2:
                        downloadState = _a.sent();
                        this.logHub(downloadState, videoTitle);
                        return [2 /*return*/];
                }
            });
        });
    };
    DownloadHub.prototype.downloaderWrapper = function (downloadUrl, videoTitle) {
        return __awaiter(this, void 0, void 0, function () {
            var downloader, withMetadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Downloader_1.Downloader(data_1.downloaderOptions)];
                    case 1:
                        downloader = _a.sent();
                        return [4 /*yield*/, downloader.downloadSong(downloadUrl, videoTitle)];
                    case 2:
                        withMetadata = _a.sent();
                        return [2 /*return*/, withMetadata];
                }
            });
        });
    };
    DownloadHub.prototype.getVideoTitle = function (downloadUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var videoId, videoInfo, videoTitle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        videoId = ytdl.getURLVideoID(downloadUrl);
                        return [4 /*yield*/, ytdl.getInfo(videoId)];
                    case 1:
                        videoInfo = _a.sent();
                        videoTitle = this.removeIlligalFileCaracters(videoInfo.videoDetails.title);
                        return [2 /*return*/, videoTitle];
                }
            });
        });
    };
    DownloadHub.prototype.logHub = function (downloadState, videoTitle) {
        this.clearLastLog();
        switch (downloadState) {
            case "Failed":
                this.failed++;
                this.logFailedDownload(videoTitle);
                break;
            case "Success":
                this.logSuccessWithMetadataDownload(videoTitle);
                this.success++;
                break;
            case "SuccessNoMetadata":
                this.logSuccessWithoutMetadataDownload(videoTitle);
                this.successNoMetadata++;
                break;
        }
        this.clearLastLog();
        var sum = this.failed + this.success + this.successNoMetadata;
        process.stdout.write("".concat(sum, "/").concat(this.videosUrls.length, " videos where downloaded success with metadata: ").concat(this.success, " without: ").concat(this.successNoMetadata, " failed: ").concat(this.failed));
    };
    DownloadHub.prototype.logSuccessWithMetadataDownload = function (videoTitle) {
        this.clearLastLog();
        console.log("\u001b[" + 42 + "m" + "".concat(videoTitle, " download Completed") + "\u001b[0m");
    };
    DownloadHub.prototype.logSuccessWithoutMetadataDownload = function (videoTitle) {
        this.clearLastLog();
        console.log("\u001b[" + 43 + "m" + "".concat(videoTitle, " download Completed") + "\u001b[0m");
    };
    DownloadHub.prototype.logFailedDownload = function (downloadUrl) {
        this.clearLastLog();
        console.log("\u001b[" + 41 + "m" + "faild to download ".concat(downloadUrl) + "\u001b[0m");
    };
    DownloadHub.prototype.clearLastLog = function () {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
    };
    DownloadHub.prototype.removeIlligalFileCaracters = function (videoTiltle) {
        videoTiltle = videoTiltle.replace(/[/\\?%*:|"<>]/g, "");
        return videoTiltle;
    };
    return DownloadHub;
}());
exports.DownloadHub = DownloadHub;
