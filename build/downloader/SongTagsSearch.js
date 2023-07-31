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
exports.SongTagsSearch = void 0;
var utils_1 = require("./utils");
var axios_1 = __importDefault(require("axios"));
var SongTagsSearch = /** @class */ (function () {
    function SongTagsSearch(videoDetails) {
        this.searchTerm = (0, utils_1.removeParenthesizedText)(videoDetails.title);
        this.url = new URL("https://itunes.apple.com/search?");
        this.url.searchParams.set("media", "music");
        this.url.searchParams.set("term", this.searchTerm);
    }
    SongTagsSearch.prototype.search = function (verify) {
        if (verify === void 0) { verify = false; }
        return __awaiter(this, void 0, void 0, function () {
            var searchResults, result, _a, artworkUrl, albumArt;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fetchResults()];
                    case 1:
                        searchResults = _b.sent();
                        if (!verify) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getVerifiedResult(searchResults)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = searchResults[0];
                        _b.label = 4;
                    case 4:
                        result = _a;
                        artworkUrl = result.artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");
                        return [4 /*yield*/, this.fetchAlbumArt(artworkUrl)];
                    case 5:
                        albumArt = _b.sent();
                        return [2 /*return*/, {
                                title: result.trackName,
                                artist: result.artistName,
                                image: {
                                    mime: "image/png",
                                    type: {
                                        id: 3,
                                        name: "front cover",
                                    },
                                    description: "Album Art",
                                    imageBuffer: albumArt,
                                },
                            }];
                }
            });
        });
    };
    SongTagsSearch.prototype.fetchResults = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(this.url.href).catch(function (error) {
                            var _a;
                            if ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) {
                                throw new utils_1.YtdlMp3Error("Call to iTunes API returned status code ".concat(error.response.status));
                            }
                            throw new utils_1.YtdlMp3Error("Call to iTunes API failed and did not return a status");
                        })];
                    case 1:
                        response = _a.sent();
                        if (response.data.resultCount === 0) {
                            throw new utils_1.YtdlMp3Error("Call to iTunes API did not return any results");
                        }
                        return [2 /*return*/, response.data.results];
                }
            });
        });
    };
    SongTagsSearch.prototype.getVerifiedResult = function (searchResults) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, searchResults_1, result, validResponses, userSelection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, searchResults_1 = searchResults;
                        _a.label = 1;
                    case 1:
                        if (!(_i < searchResults_1.length)) return [3 /*break*/, 7];
                        result = searchResults_1[_i];
                        console.log("The following tags were extracted from iTunes:");
                        console.log("Title: " + result.trackName);
                        console.log("Artist: " + result.artistName);
                        validResponses = ["Y", "YES", "N", "NO"];
                        return [4 /*yield*/, (0, utils_1.userInput)("Please verify (Y/N): ")];
                    case 2:
                        userSelection = (_a.sent()).toUpperCase();
                        _a.label = 3;
                    case 3:
                        if (!!validResponses.includes(userSelection)) return [3 /*break*/, 5];
                        console.error("Invalid selection, try again!");
                        return [4 /*yield*/, (0, utils_1.userInput)("Please verify (Y/N): ")];
                    case 4:
                        userSelection = (_a.sent()).toUpperCase();
                        return [3 /*break*/, 3];
                    case 5:
                        if (userSelection === "Y" || userSelection === "YES") {
                            return [2 /*return*/, result];
                        }
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: throw new utils_1.YtdlMp3Error("End of results");
                }
            });
        });
    };
    SongTagsSearch.prototype.fetchAlbumArt = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1.default
                        .get(url, { responseType: "arraybuffer" })
                        .then(function (response) { return Buffer.from(response.data, "binary"); })
                        .catch(function () {
                        throw new utils_1.YtdlMp3Error("Failed to fetch album art from endpoint: " + url);
                    })];
            });
        });
    };
    return SongTagsSearch;
}());
exports.SongTagsSearch = SongTagsSearch;
