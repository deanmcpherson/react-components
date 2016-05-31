import React from "react";
import {Motion, spring} from 'react-motion';

export default class TargetedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opening: false,
      closing: false
    }
  }

  static propTypes = {
    target: React.PropTypes.element,
    open: React.PropTypes.bool,
  };
  static defaultProps = { open: false };

  getTargetCoordinates() {
    let target = this.props.target || global.document.body;
    let {bottom, top, left, right} = target.getBoundingClientRect();
    return {
      bottom, top, left, right
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      let targetCordinates = this.getTargetCoordinates();
      this.setState({
        opening: nextProps.open,
        closing: !nextProps.open,
        targetCoordinates
      })
    }
  }

  renderClosed() {
     return (
      <div style={{display: 'none'}}></div>
    );
  }

  renderOpening() {
    let initial = {}
     return (
      <Motion defaultStyle={this.state.targetCoordinates} style={{top: spring(10), left: spring(10), bottom: spring(10), right: spring(10)}}>
        {value => <div style={{backgroundColor: 'red'}}></div>}
      </Motion>
    );
  }

  render() {
    if (!this.props.open && !this.props.closing) return this.renderClosed();
    if (!this.props.open && this.props.closing) return this.renderClosing();
    if (this.props.open && !this.props.opening) return this.renderOpen();
    if (this.props.open && this.props.opening) return this.renderOpening();   
  }
}
