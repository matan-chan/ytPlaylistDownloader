"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConverter = void 0;
var child_process_1 = __importDefault(require("child_process"));
var fs_1 = __importDefault(require("fs"));
var ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
var utils_1 = require("./utils");
var FormatConverter = /** @class */ (function () {
    function FormatConverter() {
        if (!ffmpeg_static_1.default) {
            throw new utils_1.YtdlMp3Error("Failed to resolve ffmpeg binary");
        }
        this.ffmpegBinary = ffmpeg_static_1.default;
    }
    FormatConverter.prototype.videoToAudio = function (videoData, outputFile) {
        if (fs_1.default.existsSync(outputFile)) {
            return false;
        }
        child_process_1.default.execSync("".concat(this.ffmpegBinary, " -loglevel 24 -i pipe:0 -vn -sn -c:a mp3 -ab 192k ").concat(outputFile), {
            input: videoData,
        });
        return true;
    };
    return FormatConverter;
}());
exports.FormatConverter = FormatConverter;
