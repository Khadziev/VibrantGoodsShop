"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addData = exports.getAllData = void 0;
const Data_model_1 = __importDefault(require("../model/Data.model"));
const getAllData = (req, res) => {
    Data_model_1.default.find()
        .then((data) => {
        res.json(data);
    })
        .catch((error) => {
        res.status(500).json({ error: 'Произошла ошибка' });
    });
};
exports.getAllData = getAllData;
const addData = (req, res) => {
    const _a = req.body, { title } = _a, otherData = __rest(_a, ["title"]);
    const newData = new Data_model_1.default(Object.assign({ title }, otherData));
    newData.save()
        .then(() => {
        res.json({ message: 'Данные успешно добавлены' });
    })
        .catch((error) => {
        res.status(500).json({ error: 'Произошла ошибка' });
    });
};
exports.addData = addData;
