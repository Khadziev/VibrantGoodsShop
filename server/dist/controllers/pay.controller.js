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
exports.createPayment = exports.getAllPayments = void 0;
const Pay_model_1 = __importDefault(require("../model/Pay.model"));
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield Pay_model_1.default.find();
        res.json(payments);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unexpected error' });
        }
    }
});
exports.getAllPayments = getAllPayments;
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, description, street, houseNumber, apartmentNumber, city, zip } = req.body;
        const newPayment = new Pay_model_1.default({ amount, description, street, houseNumber, apartmentNumber, city, zip });
        const savedPayment = yield newPayment.save();
        res.status(201).json(savedPayment);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unexpected error' });
        }
    }
});
exports.createPayment = createPayment;
