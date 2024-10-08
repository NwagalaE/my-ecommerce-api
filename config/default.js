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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const portNum = process.env.PORT;
// const dburi: string = process.env.DATABASE_URL!;
const dburi = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kdjhkem.mongodb.net/?retryWrites=true&w=majority`;
// const PUBLICKEY: string = process.env.PUBLICKEY!;
const PUBLICKEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqRftPYVTMgDuUNojeaLV
wBLsLOmHOeP8aUTt2sFI2AeC6XcXZqk8yOhRMWphyXVMSxW1OBlwczVInEub5L5w
RXdUayhFj/7ZfOE+3qSWpIue4qYEeNPbnpRlqy1QouZAbYD3gQFKbl/vMKsxAmHS
WgumYAh069G86BvJxiW86yul78ymt2uNDM7kWUOzK4MckQeM8P0gGm7M8iQ87LIA
GPyII3PLB1TaWT/5sSGPrIPXupooE1FerLL1rSQTi0fQ5evVLeLAM6sGfRJxf2x8
ylFM6bTqUemvc6MyD5YEBt1iyPdJdinJg72YCqsudJUfRuMwVbGkh9bB+z72pZUv
DNDEkpRSBZBuRotli+mIVKxwhGUtmzw5sEe60xS7+sZsKx4uQmrr2rq02jMeKMb8
CluJsr/uTqyIpOGwRATuiA5/Xp4fSPOmgQpQ7lfCwzPev6Tz1xAHn8Nin4qM3dxN
cClq01cTP0U0yRa5weCatXIAma0Om/Kjte4vJIfEmEllMP6aE3V5qeUOUyLaeoD4
ImJXRYBkIVnIozwQtSRS6Q87GiMaaspD/mEEWO+M87V9gaSeEdTufaJbCVZ3y8Wx
ppJwdY4jMI+0SV7pzns9TE0V8ruXD8QNssMjHPsd41dIQJqJqMsEuL2G1tINiVmd
tEqGft2vW/T5Y4tvaAT/gjECAwEAAQ==
-----END PUBLIC KEY-----`;
// const PRIVATEKEY: string = process.env.PRIVATEKEY!;
const PRIVATEKEY = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;
exports.default = {
    port: portNum,
    dbUri: dburi,
    saltWorkFactor: 10,
    accessTokenTtl: "15d",
    refreshTokenTtl: "1y",
    publicKey: PUBLICKEY,
    privateKey: PRIVATEKEY,
    bucketName: String(process.env.AWS_S3_BUCKET),
    defaultRegion: String(process.env.DEFAULT_REGION),
    defaultFilesACL: String(process.env.DEFAULT_FILES_ACL),
};
