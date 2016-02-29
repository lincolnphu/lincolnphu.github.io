'use strict';

var UserTrackBox = React.createClass({
  displayName: 'UserTrackBox',

  getInitialState: function getInitialState() {
    return {
      data: [],
      limitNumber: '',
      album: '',
      image: '',
      url: '',
      name: '',
      artist: ''
    };
  },
  loadMusicFromServer: function loadMusicFromServer() {
    var user = 'lincolnphu',
        api = '6510c6b46fd1c71571bc40ee7037e1a9',
        limitNumber = 49,
        windowSize = window.innerWidth;
    if (windowSize > 1465) {
      limitNumber = 98;
    } else if (windowSize == 1440) {
      limitNumber = 84;
    } else if (windowSize > 800 && windowSize < 1280) {
      limitNumber = 84;
    } else {
      limitNumber = 49;
    }
    var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + user + '&api_key=' + api + '&format=json&limit=' + limitNumber + '';
    fetch(url).then(function (response) {
      return response.json();
    }).then((function (json) {
      var data = json.recenttracks.track,
          listening = data[0],
          image = listening.image[3]["#text"],
          album = listening.album["#text"],
          name = listening.name,
          artist = listening.artist["#text"],
          url = listening.url;
      if (this.isMounted()) {
        this.setState({
          data: data,
          limitNumber: limitNumber,
          album: album,
          image: image,
          url: url,
          name: name,
          artist: artist
        });
      }
    }).bind(this))['catch'](function (err) {
      console.log('parsing failed', err);
    });
  },
  componentDidMount: function componentDidMount() {
    this.loadMusicFromServer();
    setInterval(this.loadMusicFromServer, 60000);
  },
  handleChange: function handleChange(i) {
    this.setState({
      artist: this.state.data[i].artist["#text"],
      name: this.state.data[i].name,
      url: this.state.data[i].url,
      album: this.state.data[i]["#text"],
      image: this.state.data[i].image[3]["#text"]
    });
  },
  offLine: function offLine() {
    return React.createElement(
      'div',
      { className: 'LastFmlist' },
      React.createElement(TrackList, {
        onClick: this.handleChange,
        data: this.state.data }),
      React.createElement(ListenTrack, { image: this.state.image,
        name: this.state.name,
        artist: this.state.artist,
        url: this.state.url,
        album: this.state.album })
    );
  },
  Online: function Online() {
    var tipsDiv = React.createElement(
      'div',
      { ref: 'tips', id: 'tt1', className: 'icon material-icons' },
      'add'
    ),
        musicarray = this.state.data;
    musicarray.splice(-1, 1);
    return React.createElement(
      'div',
      { className: 'LastFmlist' },
      React.createElement(TrackList, {
        onClick: this.handleChange,
        data: musicarray }),
      React.createElement(ListenTrack, {
        image: this.state.image,
        name: this.state.name,
        artist: this.state.artist,
        url: this.state.url,
        album: this.state.album })
    );
  },
  render: function render() {
    var wrap;
    if (this.state.data.length === this.state.limitNumber) {
      return wrap = this.offLine();
    } else if (this.state.data.length > this.state.limitNumber) return wrap = this.Online();
    return React.createElement(
      'div',
      null,
      wrap
    );
  }
});
var ListenTrack = React.createClass({
  displayName: 'ListenTrack',

  render: function render() {
    if (this.props.image === "") {
      var newimg = 'http://img2-ak.lst.fm/i/u/174s/e04ce91798e34c36b21a85a9fab01b40.jpg';
      this.props.image = newimg;
    }
    var imgUrl = this.props.image,
        styles = {
      backgroundImage: 'url(' + imgUrl + ')',
      width: '300',
      height: '300'
    };
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { style: styles,
          className: 'demo-card-image  mdl-card mdl-shadow--2dp' },
        React.createElement('div', { className: 'mdl-card__title mdl-card--expand' }),
        React.createElement(
          'div',
          { className: 'mdl-card__actions' },
          React.createElement(
            'span',
            { className: 'demo-card-image__filename' },
            React.createElement(
              'p',
              null,
              '专辑名:',
              this.props.album,
              ' ',
              React.createElement('hr', null),
              '歌曲名:',
              this.props.name,
              ' ',
              React.createElement('hr', null),
              '音乐人:',
              this.props.artist
            )
          )
        )
      )
    );
  }
});

function TrackList(props) {
  var divStyle = {
    float: 'right',
    position: 'relative',
    margin: '0',
    bottom: '0',
    width: '448px'
  };
  return React.createElement(
    'div',
    { style: divStyle, className: 'userTrackBox' },
    props.data.map(function (result, i) {
      var _furl = result.image[1]["#text"],
          _fartist = result.artist["#text"],
          _fname = result.name,
          _fhref = result.url;

      if (_furl === "") {
        var newimg = 'http://img2-ak.lst.fm/i/u/174s/e04ce91798e34c36b21a85a9fab01b40.jpg';
        _furl = newimg;
      }
      return React.createElement(Track, {
        fartist: _fartist,
        fhref: _fhref,
        fname: _fname,
        furl: _furl,
        key: i,
        onClick: props.onClick.bind(this, i, props) });
    })
  );
}
var Track = React.createClass({
  displayName: 'Track',

  render: function render() {
    var imgStyle = {
      height: '64px',
      width: '64px'
    };
    return React.createElement('img', { style: imgStyle, onMouseOver: this.props.onClick, src: this.props.furl });
  }
});



React.render(React.createElement(UserTrackBox, null), document.querySelector('#content'));