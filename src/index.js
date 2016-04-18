'use strict';

var FetchImg = React.createClass({
  displayName: 'FetchImg',

  getInitialState: function getInitialState() {
    return {
      name: 'lincolnphu',
      url: 'https://ws.audioscrobbler.com/2.0/?method=',
      api: '6510c6b46fd1c71571bc40ee7037e1a9',
      fetchnumber: '20',
      tracks: [],
      page: 1
    };
  },
  componentDidMount: function componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.refresh);
  },
  componentWillMount: function componentWillMount() {
    window.removeEventListener('scroll', this.refresh);
  },
  fetchData: function fetchData() {
    var _state = this.state;
    var name = _state.name;
    var url = _state.url;
    var api = _state.api;
    var fetchnumber = _state.fetchnumber;
    var page = _state.page;

    var fetchUrl = url + 'user.getrecenttracks' + '&user=' + name + '&api_key=' + api + '&format=json&limit=' + fetchnumber;
    fetch(fetchUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      var tracks = json.recenttracks.track;
      this.setState({
        tracks: tracks
      });
    }.bind(this));
  },
  pushData: function pushData() {},
  refresh: function refresh(e) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      var _state2 = this.state;
      var name = _state2.name;
      var url = _state2.url;
      var api = _state2.api;
      var tracks = _state2.tracks;
      var fetchnumber = _state2.fetchnumber;
      var page = _state2.page;

      var page = this.state.page + 1;
      var fetchUrl = url + 'user.getrecenttracks' + '&user=' + name + '&api_key=' + api + '&format=json&limit=3' + '&page=' + page;
      fetch(fetchUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        var newf = json.recenttracks.track;
        var newtracks = tracks.concat(newf);
        this.setState({
          tracks: newtracks,
          page: page
        });
      }.bind(this));
    }
  },
  render: function render() {
    var tracks = this.state.tracks;

    var topTrack = tracks;
    return React.createElement(
      'div',
      { className: 'grd' },
      React.createElement(Info, { tracks: tracks }),
      React.createElement('div', { onScroll: this.refresh })
    );
  }
});

var Info = React.createClass({
  displayName: 'Info',

  render: function render() {
    var tracks = this.props.tracks;

    console.log("总数 :" + tracks.length);
    var examples = tracks.map(function (d, i) {
      var name = d.artist["#text"];
      var image = d.image["1"]["#text"];
      if (image === '') {
        image = 'http://cdns2.freepik.com/free-photo/_318-10795.jpg';
      }
      return React.createElement(
        'div',
        { className: 'col-12', key: i },
        React.createElement('img', { src: image, width: '64', height: '64' }),
        React.createElement(
          'p',
          null,
          d.name
        ),
        React.createElement(
          'h3',
          null,
          name
        )
      );
    });
    return React.createElement(
      'div',
      { className: 'grd-row' },
      examples
    );
  }
});

React.render(React.createElement(FetchImg, null), document.getElementById('root'));

