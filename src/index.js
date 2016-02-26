'use strict';

var UserTrackBox = React.createClass({
    displayName: 'UserTrackBox',

    loadMusicFromServer: function loadMusicFromServer() {
        var user = 'lincolnphu';
        var api = '6510c6b46fd1c71571bc40ee7037e1a9';
        var limitNumber = 49;
        var windowSize = window.innerWidth;

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
            var data = json.recenttracks.track;
            var listening = data[0];
            var image = listening.image[2]["#text"];
            var album = listening.album["#text"];
            var name = listening.name;
            var artist = listening.artist["#text"];
            var url = listening.url;
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
    componentDidMount: function componentDidMount() {
        this.loadMusicFromServer();
        setInterval(this.loadMusicFromServer, 60000);
    },

    shouldComponentUpdate: function shouldComponentUpdate() {
        return true;
    },
    offLine: function offLine() {

        return React.createElement(
            'div',
            { className: 'LastFmlist' },
            React.createElement(TrackList, { data: this.state.data }),
            React.createElement(ListenTrack, { image: this.state.image, name: this.state.name, artist: this.state.artist, url: this.state.url, album: this.state.album }),
            React.createElement(
                'h2',
                null,
                '不好意识，我不在哦'
            )
        );
    },
    Online: function Online() {
        var musicarray = this.state.data;
        musicarray.splice(-1, 1);
        return React.createElement(
            'div',
            { className: 'LastFmlist' },
            React.createElement(TrackList, { data: musicarray }),
            React.createElement(ListenTrack, { image: this.state.image, name: this.state.name, artist: this.state.artist, url: this.state.url, album: this.state.album }),
            React.createElement(
                'h2',
                null,
                '我现在，在线哦！'
            )
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
        return React.createElement(
            'div',
            null,
            React.createElement('img', { src: this.props.image }),
            React.createElement(
                'p',
                null,
                '专辑名:',
                this.props.album
            ),
            React.createElement(
                'h2',
                null,
                '歌曲名:',
                this.props.name
            ),
            React.createElement(
                'h1',
                null,
                '音乐人:',
                this.props.artist
            )
        );
    }
});

var TrackList = React.createClass({
    displayName: 'TrackList',

    render: function render() {
        var trackNodes = this.props.data.map(function (result, index) {
            var _furl = result.image[1]["#text"];
            var _fartist = result.artist["#text"];
            var _fname = result.name;
            var _fhref = result.url;

            if (_furl === "") {
                var newimg = 'http://img2-ak.lst.fm/i/u/174s/e04ce91798e34c36b21a85a9fab01b40.jpg';
                _furl = newimg;
            }

            return React.createElement(Track, {
                fartist: _fartist,
                fhref: _fhref,
                fname: _fname,
                furl: _furl,
                key: index });
        });
        return React.createElement(
            'ul',
            { style: divStyle, className: 'userTrackBox' },
            trackNodes
        );
    }
});

var Track = React.createClass({
    displayName: 'Track',

    render: function render() {
        var hide;
        hide = React.createElement('img', { style: imgStyle, className: 'list', src: this.props.furl });
        return React.createElement(
            'a',
            { ref: 'tips', href: this.props.fhref },
            hide
        );
    }
});
var imgStyle = {
    height: '64px',
    width: '64px'
};
var divStyle = {
    float: 'right',
    position: 'relative',
    margin: '0',
    top: '0',
    bottom: '0',
    width: '448px'
};
React.render(React.createElement(
    'div',
    null,
    React.createElement(UserTrackBox, null)
), document.getElementById('content'));