"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
core_1.enableProdMode();
var filterChart = (function () {
    function filterChart() {
        var _this = this;
        this.margin = { top: 30, right: 20, bottom: 30, left: 50 };
        this.width = 600 - this.margin.left - this.margin.right;
        this.height = 270 - this.margin.top - this.margin.bottom;
        this.parseDate = d3.timeParse("%d-%b-%y");
        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);
        this.valueline = d3.line().x(function (d) { return _this.x(d.date); }).y(function (d) { return _this.y(d.close); });
        this.url = 'https://raw.githubusercontent.com/lincolnphu/React-W3school-Example.github.io/master/data.csv';
    }
    filterChart.prototype.ngOnInit = function () {
        this.getDatas();
    };
    filterChart.prototype.getDatas = function () {
        var _this = this;
        var _a = this, parseDate = _a.parseDate, x = _a.x, y = _a.y, valueline = _a.valueline, height = _a.height, width = _a.width;
        d3.csv(this.url, function (data) {
            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.close = +d.close;
            });
            x.domain(d3.extent(data, function (d) { return d.date; }));
            y.domain([0, d3.max(data, function (d) { return d.close; })]);
            _this.linedata = valueline(data);
            _this.xScale = x.ticks(5).map(x.tickFormat(5, '%b %d')).map(function (d, n) {
                return {
                    xdata: 'translate(' + (6 + n * 7) * (width / 36) + ',' + 0 + ')',
                    xd: d
                };
            });
            _this.yScale = y.ticks(6).map(function (d, i) {
                return {
                    ydata: 'translate(' + 0 + ',' + ((height / 636.36) * (636.36 - d)) + ')',
                    yd: d
                };
            });
            _this.filterStyle = data.map(function (d) {
                if (d.close < 400) {
                    return {
                        fill: 'red',
                        r: '3.5',
                        cx: x(d.date),
                        cy: y(d.close)
                    };
                }
                else {
                    return {
                        fill: null,
                        r: null,
                        cx: null,
                        cy: null
                    };
                }
            });
        });
    };
    filterChart = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <svg [attr.width]=\"width + margin.left + margin.right\"\n  [attr.height]=\"height + margin.top + margin.bottom\">\n  <g [attr.transform]=\"'translate(' + margin.left + ',' + margin.top + ')'\" >\n    <path class=\"line\" [attr.d]=\"linedata\" ></path>\n      <circle  *ngFor=\"let item of filterStyle\" [attr.r]=\"item.r\" [attr.cx]=\"item.cx\"\n      [attr.cy]=\"item.cy\" [attr.fill]=\"item.fill\"></circle>\n    <g class=\"x axis\"   [attr.transform]=\"'translate(' + 0 + ',' + height + ')'\" >\n    <g class=\"tick\" *ngFor=\" let item of xScale\" [attr.transform]=\"item.xdata\"  style=\"opacity: 1\">\n      <line x2=\"0\" y2=\"6\"/>\n        <text dy=\".71em\" y=\"9\" x=\"0\" style=\"text-anchor: middle;\">{{item.xd}}</text>\n      </g>\n    <path class=\"domain\" d=\"M0,6V0H530V6\"></path>\n      </g>\n    <g class=\"y axis\">\n  <g class=\"tick\" *ngFor=\"let item of yScale\" [attr.transform]=\"item.ydata\" style=\"opacity: 1;\" >\n        <line x2=\"-6\" y2=\"0\"></line>\n        <text dy=\".32em\" x=\"-9\" y=\"0\" style=\"text-anchor: end;\">{{item.yd}}</text>\n  </g>\n  <path class=\"domain\" d=\"M-6,0H0V210H-6\"></path>\n  </g>\n  </g>\n  </svg>\n  ",
            styles: ["\n  body { font: 12px Arial;}\n\n  path {\n    stroke: steelblue;\n    stroke-width: 2;\n    fill: none;\n}\n\n.axis path,\n.axis line {\n    fill: none;\n    stroke: grey;\n    stroke-width: 1;\n    shape-rendering: crispEdges;\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], filterChart);
    return filterChart;
}());
exports.filterChart = filterChart;
//# sourceMappingURL=app.component.js.map