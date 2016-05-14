import { Component,enableProdMode,OnInit} from '@angular/core';
declare var d3 ;




enableProdMode()




@Component({
  selector:'my-app',
  template:`
  <svg [attr.width]="width + margin.left + margin.right"
  [attr.height]="height + margin.top + margin.bottom">
  <g [attr.transform]="'translate(' + margin.left + ',' + margin.top + ')'" >
    <path class="line" [attr.d]="linedata" ></path>
      <circle  *ngFor="let item of filterStyle" [attr.r]="item.r" [attr.cx]="item.cx"
      [attr.cy]="item.cy" [attr.fill]="item.fill"></circle>
    <g class="x axis"   [attr.transform]="'translate(' + 0 + ',' + height + ')'" >
    <g class="tick" *ngFor=" let item of xScale" [attr.transform]="item.xdata"  style="opacity: 1">
      <line x2="0" y2="6"/>
        <text dy=".71em" y="9" x="0" style="text-anchor: middle;">{{item.xd}}</text>
      </g>
    <path class="domain" d="M0,6V0H530V6"></path>
      </g>
    <g class="y axis">
  <g class="tick" *ngFor="let item of yScale" [attr.transform]="item.ydata" style="opacity: 1;" >
        <line x2="-6" y2="0"></line>
        <text dy=".32em" x="-9" y="0" style="text-anchor: end;">{{item.yd}}</text>
  </g>
  <path class="domain" d="M-6,0H0V210H-6"></path>
  </g>
  </g>
  </svg>
  `,
  styles:[`
  body { font: 12px Arial;}

  path {
    stroke: steelblue;
    stroke-width: 2;
    fill: none;
}

.axis path,
.axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
  `]
})

export class filterChart implements OnInit {
    public  margin = {top:30,right:20,bottom:30,left:50};
    public  width = 600 - this.margin.left - this.margin.right;
    public  height = 270 - this.margin.top - this.margin.bottom;
    public  parseDate = d3.timeParse("%d-%b-%y");
    public  x = d3.scaleTime().range([0,this.width]);
    public  y = d3.scaleLinear().range([this.height,0]);
    public  valueline = d3.line().x(d =>this.x(d.date)).y(d=>this.y(d.close));
    public  url = 'https://raw.githubusercontent.com/lincolnphu/React-W3school-Example.github.io/master/data.csv'
    public  info;
    public  linedata;
    public  xScale;
    public  yScale;
    public  filterStyle;
    ngOnInit() {
    this.getDatas();
    }
    getDatas() {
        let {parseDate,x,y,valueline,height,width} = this;
        d3.csv(this.url,data=>{
          data.forEach(d=>{
            d.date = parseDate(d.date)
            d.close = +d.close
          })
        x.domain(d3.extent(data, d =>d.date))
        y.domain([0, d3.max(data, d =>d.close)])
        this.linedata = valueline(data)

        this.xScale = x.ticks(5).map(x.tickFormat(5, '%b %d')).map((d, n) => {
          return {
            xdata: 'translate(' + (6 + n * 7) * (width / 36) + ',' + 0 + ')',
            xd: d
          }
        })

        this.yScale = y.ticks(6).map((d, i) => {
          return {
            ydata: 'translate(' + 0 + ',' + ((height / 636.36) * (636.36 - d)) + ')',
            yd: d
          }
        })

              this.filterStyle = data.map(d => {
        if (d.close < 400) {
          return {
            fill: 'red',
            r: '3.5',
            cx: x(d.date),
            cy: y(d.close)
          }
        } else {
          return {
            fill: null,
            r: null,
            cx: null,
            cy: null
          }
        }
      })

        })

    }


}
