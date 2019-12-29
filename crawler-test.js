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
        while (_) try {
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
var puppeteer = require('puppeteer');
var Book = /** @class */ (function () {
    function Book(coverImage, title, author, publisher, publicationYear, link) {
        this.coverImage = coverImage;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publicationYear = publicationYear;
        this.link = link;
    }
    ;
    return Book;
}());
var Crawler = /** @class */ (function () {
    function Crawler(targetSite) {
        console.log(targetSite);
        this.targetSite = targetSite;
    }
    Crawler.prototype.setPuppeteer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, puppeteer.launch({ headless: false })];
                    case 1:
                        _a.browser = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 2:
                        _b.page = _c.sent();
                        return [4 /*yield*/, this.page.setViewport({ width: 0, height: 0 })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Crawler.prototype.crawlItemTitledAs = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto(this.targetSite.search(title), { waitUntil: 'load', timeout: 0 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForSelector(this.targetSite.selector.ofItemWrap)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.$$(this.targetSite.selector.ofItemWrap)];
                    case 3:
                        items = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Crawler.prototype.crawlNewProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var length, i;
            return __generator(this, function (_a) {
                length = this.targetSite.newProductsLocation.length;
                for (i = 0; i < length; i++) {
                    this.crawlItemsInPageOf(this.targetSite.newProductsLocation[i]);
                }
                return [2 /*return*/];
            });
        });
    };
    Crawler.prototype.crawlItemsInPageOf = function (targetPage) {
        return __awaiter(this, void 0, void 0, function () {
            var items, _i, items_1, item, itemInformation, _a, _b, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.page.goto(targetPage, { waitUntil: 'load', timeout: 0 })];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, this.page.waitForSelector(this.targetSite.selector.ofItemWrap)];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, this.page.$$(this.targetSite.selector.ofItemWrap)];
                    case 3:
                        items = _e.sent();
                        _i = 0, items_1 = items;
                        _e.label = 4;
                    case 4:
                        if (!(_i < items_1.length)) return [3 /*break*/, 10];
                        item = items_1[_i];
                        itemInformation = {
                            title: "", author: "", coverImage: "", publisher: "", publicationYear: ""
                        };
                        _a = itemInformation;
                        return [4 /*yield*/, item.$eval(this.targetSite.selector.ofTitle, function (el) { return el.innerText; })];
                    case 5:
                        _a.title = _e.sent();
                        _b = itemInformation;
                        return [4 /*yield*/, item.$eval(this.targetSite.selector.ofAuthor, function (el) { return el.innerText; })];
                    case 6:
                        _b.author = _e.sent();
                        _c = itemInformation;
                        return [4 /*yield*/, item.$eval(this.targetSite.selector.ofCoverImage, function (el) { return el.getAttribute("src"); })];
                    case 7:
                        _c.coverImage = _e.sent();
                        return [4 /*yield*/, item.$$eval(this.targetSite.selector.ofPublisher, function (els) { return [els[0].innerText, els[1].innerText]; })];
                    case 8:
                        _d = _e.sent(), itemInformation.publisher = _d[0], itemInformation.publicationYear = _d[1];
                        console.log(itemInformation);
                        _e.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 4];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Crawler.prototype.saveItemsToDatabase = function () {
    };
    return Crawler;
}());
var Kyobo = /** @class */ (function () {
    function Kyobo() {
        this.baseUrl = 'https://kyobobook.co.kr/';
        this.newProductsLocation = ['https://kyobobook.co.kr/newproduct/newProductList.laf?mallGb=KOR'];
        this.searchUrl = "https://search.kyobobook.co.kr/web/search?vPstrKeyWord=";
        this.selector = {
            // li.detailli || 
            ofItemWrap: 'div.info_area',
            ofCoverImage: 'div.cover_wrap img',
            ofTitle: 'div.title',
            ofAuthor: 'span.author',
            ofPublisher: 'span.publication',
            ofPublicationYear: 'span.publication.text.trim()',
            ofLink: 'div.title a.href',
            ofNextPage: 'div.list_paging a.btn_next',
            ofPageList: 'div.list_paging li a'
        };
    }
    Kyobo.prototype.search = function (title) {
        return this.searchUrl + title;
    };
    return Kyobo;
}());
var kyobo = new Kyobo();
console.log(kyobo);
var kyoboCrawler = new Crawler(kyobo);
function a() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, kyoboCrawler.setPuppeteer()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, kyoboCrawler.crawlNewProducts()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
a();
