import React from 'react';
import { Collapse } from 'reactstrap';
import './expand.css';

export default class Expand extends React.Component {
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