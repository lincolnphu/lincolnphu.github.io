var FetchImg = React.createClass({
  displayName: 'FetchImg',

  getInitialState: function () {
    return {
      name: 'lincolnphu',
      url: 'https://ws.audioscrobbler.com/2.0/?method=',
      api: '6510c6b46fd1c71571bc40ee7037e1a9',
      fetchnumber: '20',
      tracks: [],
      page: 1
    };
  },
  componentDidMount: function () {
    this.fetchData();
    window.addEventListener('scroll', this.refresh);
  },
  componentWillMount: function () {
    window.removeEventListener('scroll', this.refresh);
  },
  fetchData: function () {
    var { name, url, api, fetchnumber, page } = this.state;
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
  pushData: function () {},
  refresh: function (e) {
    if (window.innerHeight + window.scrollY == document.body.offsetHeight) {
      var { name, url, api, tracks, fetchnumber, page } = this.state;
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
  render: function () {
    var { tracks } = this.state;
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

  render: function () {
    var { tracks } = this.props;
    var examples = tracks.map(function (d, i) {
      var name = d.artist.name;
      var image = d.image["1"]["#text"];
      if (image === '') {
        image = 'http://cdns2.freepik.com/free-photo/_318-10795.jpg';
      }
      console.log(image);
      return React.createElement(
        'div',
        { className: 'col-12', key: i },
        React.createElement('img', { src: image, width: '64', height: '64' })
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
