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
const discord_rpc_1 = __importDefault(require("discord-rpc"));
const node_fetch_1 = __importDefault(require("node-fetch"));
module.exports = function () {
    const rpc = new discord_rpc_1.default.Client({ transport: "ipc" });
    rpc.on("ready", () => __awaiter(this, void 0, void 0, function* () {
        console.log("Rich Presence Running");
        yield Update();
        setInterval(Update, 10000);
    }));
    function Update() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.parse(yield (yield node_fetch_1.default(`https://thedfcollectionapi.herokuapp.com/${rpc.user.id}`, {
                method: "GET",
            })).json());
            if (data) {
                if (data.state) {
                    if (data.large) {
                        yield rpc.setActivity({
                            details: data.details,
                            state: data.state,
                            startTimestamp: data.lastonline,
                            largeImageKey: data.large,
                            largeImageText: data.details,
                        });
                    }
                    else {
                        yield rpc.setActivity({
                            details: data.details,
                            state: data.state,
                            startTimestamp: data.lastonline,
                            largeImageKey: "main",
                            largeImageText: "The DF Collection",
                        });
                    }
                }
                else {
                    if (data.large) {
                        yield rpc.setActivity({
                            details: data.details,
                            startTimestamp: data.lastonline,
                            largeImageKey: data.large,
                            largeImageText: data.details,
                        });
                    }
                    else {
                        yield rpc.setActivity({
                            details: data.details,
                            startTimestamp: data.lastonline,
                            largeImageKey: "main",
                            largeImageText: "The DF Collection",
                        });
                    }
                }
            }
        });
    }
    rpc.login({ clientId: "748730623102812210" });
};
