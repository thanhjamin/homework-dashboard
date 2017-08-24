import React from 'react';
import { ListGroup } from 'reactstrap';
import Tab from './tab.js';
import ListItem from './listItem.js'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedItem: -1
    };
  }

  handleClick(assignmentId, index) {
    const self = this;
    self.setState({ selectedItem: index })
  }

  render() {
    let self = this;
    let assignmentsData = this.props.assignmentsData;
    let submissionsData = this.props.submissionsData;
    console.log(assignmentsData)
    console.log(submissionsData)
    let assignmentListItem = assignmentsData.map((item, id) => {
      let isSelected = this.state.selectedItem === id
      return ( 
        <ListItem 
          key={id} onClick={() => this.handleClick(item.id, id)} 
          assignmentsData={assignmentsData[id]}
          isSelected={isSelected}>
        </ListItem> 
      )
    })

    let activeContent = () => {
      let index = self.state.selectedItem;
      if(self.state.selectedItem > -1) {
        let assignmentId = assignmentsData[index].id;
        return (<Tab assignmentsData={assignmentsData[index]} submissionData={submissionsData[assignmentId]} />)  
      } else {
        return (<Tab />)
      }
    }
    return (
      <div className="App-Wrapper">
        <ListGroup>
          <h2>Assignments</h2>
          {assignmentListItem}
        </ListGroup>
        {activeContent()}
      </div>
    );
  }
}
