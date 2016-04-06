var SetIntervalMixin = {
		componentWillMount: function () {
				this.intervals = [];
		},
		setInterval: function () {
				this.intervals.push(setInterval.apply(null, arguments));
		},
		componentWillUnmount: function () {
				this.intervals.map(clearInterval);
		}
};

var Animation = React.createClass({
		displayName: "Animation",


		getInitialState: function () {
				return {
						tops: tops
				};
		},

		render: function () {
				var tracks = this.state.tops.toptracks.track;

				var data = Object.keys(tracks).map(function (key) {
						return tracks[key].playcount;
				});
				var margin = { top: 20, right: 20, bottom: 20, left: 20 },
				    width = 400 - margin.left - margin.right,
				    height = width - margin.top - margin.bottom;
				var gtransform = "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")";

				var colors = ['#4DB6AC', '#4DD0E1', '#4FC3F7', '#64B5F6', '#7986CB', '#81C784', '#90A4AE', '#9575CD', '#A1887F', '#AED581', '#BA68C8', '#DCE775', '#E0E0E0', '#E57373', '#F06292', '#FF8A65', '#FFB74D', '#FFD54F', '#FFF176'];

				var pie = d3.layout.pie().sort(null).startAngle(1.1 * Math.PI).endAngle(3.1 * Math.PI).value(function (d) {
						return d;
				});
				var paths = data.map(function (d, i) {
						var styles = {
								fill: colors[Math.floor(Math.random() * colors.length)],
								stroke: 'white',
								strokeWidth: "2px"
						};

						var d = pie(data)[i];
						return React.createElement(Path, { width: width, height: height, styles: styles, d: d });
				}.bind(this));
				return React.createElement(
						"svg",
						{ width: width + margin.left + margin.right,
								height: height + margin.top + margin.bottom },
						React.createElement(
								"g",
								{ transform: gtransform },
								paths
						)
				);
		}
});

var Path = React.createClass({
		displayName: "Path",

		getInitialState() {
				return {
						milliseconds: 0
				};
		},
		mixins: [SetIntervalMixin],
		componentWillReceiveProps: function (nextProps) {
				this.setState({ milliseconds: 0 });
		},

		componentDidMount: function () {
				this.setInterval(this.tick, 30);
		},

		tick: function (start) {
				this.setState({ milliseconds: this.state.milliseconds + 10 });
		},
		render: function () {

				var radius = Math.min(this.props.width, this.props.height) / 2;
				var easyeasy = d3.ease('back-out');

				var arc = d3.svg.arc().outerRadius(radius).innerRadius(radius - 20);
				var t = easyeasy(Math.min(1, this.state.milliseconds / 500));
				var i = d3.interpolate({ startAngle: 1.1 * Math.PI, endAngle: 1.1 * Math.PI }, this.props.d);
				return React.createElement("path", { style: this.props.styles, d: arc(i(t)) });
		}
});

var Guardin = React.createClass({
		displayName: "Guardin",

		render: function () {
				return React.createElement(
						"div",
						null,
						React.createElement(Animation, null),
						React.createElement(Animation, null),
						React.createElement(Animation, null),
						React.createElement(Animation, null)
				);
		}
});

ReactDOM.render(React.createElement(Guardin, null), document.getElementById('root'));
