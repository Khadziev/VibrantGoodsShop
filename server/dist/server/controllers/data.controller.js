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
exports.getSimilarData = exports.getDiscountedData = exports.getDataById = exports.updateData = exports.deleteData = exports.addData = exports.getAllData = void 0;
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
const getDiscountedData = (req, res) => {
    Data_model_1.default.find({ discount: { $gt: 0 } })
        .then((data) => {
        res.json(data);
    })
        .catch((error) => {
        console.error('Ошибка при поиске данных со скидкой:', error);
        res.status(500).json({ error: error.message });
    });
};
exports.getDiscountedData = getDiscountedData;
const getDataById = (req, res) => {
    const { id } = req.params;
    Data_model_1.default.findById(id)
        .then((data) => {
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).json({ error: 'Данные не найдены' });
        }
    })
        .catch((error) => {
        res.status(500).json({ error: 'Произошла ошибка' });
    });
};
exports.getDataById = getDataById;
const addData = (req, res) => {
    const _a = req.body, { name } = _a, otherData = __rest(_a, ["name"]);
    const newData = new Data_model_1.default(Object.assign({ name }, otherData));
    newData
        .save()
        .then(() => {
        res.json({ message: 'Данные успешно добавлены' });
    })
        .catch((error) => {
        res.status(500).json({ error: 'Произошла ошибка' });
    });
};
exports.addData = addData;
const deleteData = (req, res) => {
    const { id } = req.params;
    Data_model_1.default.findByIdAndDelete(id)
        .then(() => {
        res.json({ message: 'Данные успешно удалены' });
    })
        .catch((error) => {
        res.status(500).json({ error: 'Произошла ошибка' });
    });
};
exports.deleteData = deleteData;
const updateData = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    Data_model_1.default.findByIdAndUpdate(id, updatedData)
        .then(() => {
        res.json({ message: 'Данные успешно обновлены' });
    })
        .catch((error) => {
        res.status(500).json({ error: 'Произошла ошибка' });
    });
};
exports.updateData = updateData;
const getSimilarData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Data_model_1.default.findById(id);
    if (!data) {
        return res.status(404).json({ error: 'Данные не найдены' });
    }
    const similarData = yield Data_model_1.default.find({ category: data.category, _id: { $ne: id } }).limit(10);
    res.json(similarData);
});
exports.getSimilarData = getSimilarData;
