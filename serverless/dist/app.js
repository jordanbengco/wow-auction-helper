"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const BodyParser = __importStar(require("body-parser"));
const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.get('/api/test', (request, response) => {
    response.send({ msg: 'asd' });
});
app.listen(3000, () => console.log('ready on port 3000'));
//# sourceMappingURL=app.js.map