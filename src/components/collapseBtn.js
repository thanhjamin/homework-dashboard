import React from 'react';
import { Collapse, Button } from 'reactstrap';

export default class CollapseBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
    this.setState({ arrow: 'fa fa-sort-up'});
  }

  render() {
    let content = this.props.content
    return (
      <div className='description-box'>
        <i className={this.state.collapse ? 'fa fa-sort-up' : 'fa fa-sort-down'} aria-hidden="true" onClick={ ()=> this.toggle() }></i>
        <Collapse isOpen={this.state.collapse}>
          <div className='content-box'>
            <p>
              {content}
            </p>
          </div>
        </Collapse>
      </div>
    );
  }
}