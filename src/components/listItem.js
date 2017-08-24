import React from 'react';
import { ListGroupItem } from 'reactstrap';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.hoverEvent = this.hoverEvent.bind(this);

    this.state = { 
      hover_flag: false
    };
  }

  static defaultProps = {
    isSelected: false
  }

  hoverEvent() {
    this.setState({ hover_flag: !this.state.hover_flag });
  }

  formatDate(date) {
    const cleanDate = new Date(date);
    const month = cleanDate.toLocaleString("en-us", { month: "long" });
    const resultDate = `${month.toString()} ${cleanDate.getDate()}, ${cleanDate.getFullYear()}`;
    
    return resultDate;
  }

  render() {
    let assignmentsData = this.props.assignmentsData;
    let dueDate = this.formatDate(assignmentsData.due_at);
    let liStyle = { background: '#fff' };
    if (this.props.isSelected || this.state.hover_flag) {
      liStyle['background'] = '#dddddd'       
    }
    return ( 
      <ListGroupItem 
        onClick={this.props.onClick}
        onMouseEnter={this.hoverEvent}
        onMouseLeave={this.hoverEvent}
        style={liStyle}>{assignmentsData.title} <br/ > due {dueDate}
      </ListGroupItem> 
    )
  }
}
