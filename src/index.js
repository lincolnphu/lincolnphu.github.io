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
    }).then(function (json) {
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
    }.bind(this)).catch(function (err) {
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

  getInitialState: function getInitialState() {
    return {
      gradient: ''
    };
  },
  componentDidMount: function componentDidMount() {
    this.interval = setInterval(this.realColor, 1000);
  },
  componentWillMount: function componentWillMount() {
    clearInterval(this.interval);
  },
  realColor: function realColor() {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var gradient = getRandomInt(168, 211) + "," + getRandomInt(40, 213) + "," + getRandomInt(35, 214);
    this.setState({ gradient: gradient });
  },
  render: function render() {
    var imgUrl = this.props.image,
        styles;
    if (imgUrl == '') {
      styles = {
        backgroundImage: 'url(' + imgUrl + ')',
        width: '300',
        height: '300',
        backgroundColor: 'rgb(' + this.state.gradient + ')'
      };
    } else {
      styles = {
        backgroundImage: 'url(' + imgUrl + ')',
        width: '300',
        height: '300'
      };
    }
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { style: styles,
          className: 'demo-card-image mdl-card mdl-shadow--2dp' },
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
      ),
      React.createElement(
        'button',
        { className: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent' },
        '自我介绍'
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { id: 'demo-menu-lower-right',
            className: 'mdl-button mdl-js-button mdl-button--icon' },
          React.createElement(
            'i',
            { className: 'material-icons' },
            'more_vert'
          )
        ),
        React.createElement(
          'ul',
          { className: 'mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect',
            htmlFor: 'demo-menu-lower-right' },
          React.createElement(
            'li',
            { className: 'mdl-menu__item' },
            'Some Action'
          ),
          React.createElement(
            'li',
            { className: 'mdl-menu__item' },
            'Another Action'
          ),
          React.createElement(
            'li',
            { disabled: true, className: 'mdl-menu__item' },
            'Disabled Action'
          ),
          React.createElement(
            'li',
            { className: 'mdl-menu__item' },
            'Yet Another Action'
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

  getInitialState: function getInitialState() {
    return {
      gradient: ''
    };
  },
  componentDidMount: function componentDidMount() {
    this.interval = setInterval(this.realColor, 1000);
  },
  componentWillMount: function componentWillMount() {
    clearInterval(this.interval);
  },
  realColor: function realColor() {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var gradient = getRandomInt(168, 211) + "," + getRandomInt(40, 213) + "," + getRandomInt(35, 214);
    this.setState({ gradient: gradient });
  },
  render: function render() {
    var imgStyle;
    if (this.props.furl == '') {
      imgStyle = {
        height: '64px',
        width: '64px',
        backgroundColor: 'rgb(' + this.state.gradient + ')'
      };
    } else {
      imgStyle = {
        height: '64px',
        width: '64px'
      };
    }
    return React.createElement('img', { style: imgStyle, onMouseOver: this.props.onClick, src: this.props.furl });
  }
});

React.render(React.createElement(UserTrackBox, null), document.querySelector('#content'));
