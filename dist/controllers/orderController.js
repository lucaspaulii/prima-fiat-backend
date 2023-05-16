var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { invalidInput } from "../errors/invalid-error.js";
import { orderSchema } from "../schemas/orderSchema.js";
import { orderServices } from "../services/orderServices.js";
function post(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var inputOrder, error, errors, newDate, order, orderPosted, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputOrder = req.body;
                    error = orderSchema.validate(inputOrder, {
                        abortEarly: false
                    }).error;
                    if (error) {
                        errors = error.details.map(function (detail) { return detail.message; });
                        return [2 /*return*/, res.status(422).send(errors)];
                    }
                    newDate = inputOrder.deliveryDate + ":00+00:00";
                    order = __assign(__assign({}, inputOrder), { deliveryDate: newDate, orderNumber: Number(inputOrder.orderNumber) });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderServices.post(order)];
                case 2:
                    orderPosted = _a.sent();
                    return [2 /*return*/, res.status(200).send(orderPosted)];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.status(400).send(error_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function get(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var orders, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, orderServices.get()];
                case 1:
                    orders = _a.sent();
                    return [2 /*return*/, res.status(200).send(orders)];
                case 2:
                    error_2 = _a.sent();
                    if (error_2.name === "NotFoundError") {
                        return [2 /*return*/, res.status(404).send(error_2)];
                    }
                    return [2 /*return*/, res.status(400).send(error_2)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getByOrderId(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var orderId, order, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderId = req.params.orderId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (orderId.toString().length > 12) {
                        throw invalidInput();
                    }
                    return [4 /*yield*/, orderServices.getByOrderId(Number(orderId))];
                case 2:
                    order = _a.sent();
                    return [2 /*return*/, res.status(200).send(order)];
                case 3:
                    error_3 = _a.sent();
                    if (error_3.name === "NotFoundError") {
                        return [2 /*return*/, res.status(404).send(error_3)];
                    }
                    if (error_3.name === "InvalidInputError") {
                        return [2 /*return*/, res.status(422).send(error_3)];
                    }
                    return [2 /*return*/, res.status(400).send(error_3)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function delayAndCreateNew(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, date, newDate, newOrder, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    date = req.query.newDate;
                    console.log(id);
                    console.log(date);
                    if (!id || !date) {
                        return [2 /*return*/, res.status(400).send("date or id invalid")];
                    }
                    newDate = date + ":00+00:00";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderServices.delayOrder(Number(id), newDate)];
                case 2:
                    newOrder = _a.sent();
                    return [2 /*return*/, res.status(200).send(newOrder)];
                case 3:
                    error_4 = _a.sent();
                    if (error_4.name === "NotFoundError") {
                        return [2 /*return*/, res.status(404).send(error_4)];
                    }
                    return [2 /*return*/, res.status(400).send(error_4)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deliver(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderServices.deliverOrder(Number(id))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.status(200)];
                case 3:
                    error_5 = _a.sent();
                    if (error_5.name === "NotFoundError") {
                        return [2 /*return*/, res.status(404).send(error_5)];
                    }
                    return [2 /*return*/, res.status(400).send(error_5)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export var orderController = {
    post: post,
    get: get,
    getByOrderId: getByOrderId,
    delayAndCreateNew: delayAndCreateNew,
    deliver: deliver
};
