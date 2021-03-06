var Radium = require('radium');
var React = require('react');
var color = require('color');


class Button extends React.Component {
  static propTypes = {
    kind: React.PropTypes.oneOf(['primary', 'warning']).isRequired
  };

  render() {
    // Radium extends the style attribute to accept an array. It will merge
    // the styles in order. We use this feature here to apply the primary
    // or warning styles depending on the value of the `kind` prop. Since its
    // all just JavaScript, you can use whatever logic you want to decide which
    // styles are applied (props, state, context, etc).
    return (
      <button
        style={[
          styles.base,
          styles[this.props.kind]
        ]}>
        {this.props.children}
      </button>
    );
  }
}

// You can create your style objects dynamically or share them for
// every instance of the component.


var styles={
    base: {
      padding: "0.5em 0.75em",
      border: "0px",
      cursor: "pointer",
      fontSize: "0.75rem",
      fontWeight: 700,
    },
    primary: {
      backgroundColor: "#0074D9",
      color: "#ffffff",
      ":hover": {
        backgroundColor: color("#0074d9").lighten(0.2).hexString()
      }
    },
    warning: {
      backgroundColor: "#F5A623",
      color: "#ffffff",
      ":hover": {
        backgroundColor: color("#F5A623").darken(0.2).hexString()
      }
    },
    disabled: {
      opacity: .4,
      cursor: "not-allowed"
    }
  };

Button = Radium(Button);


 module.exports = Button;
