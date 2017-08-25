import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Expand from '../expand/expand.js'
import './tab.css';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      collapse: false
    };
  }

  static defaultProps = {
    submissionData: []
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  formatDate(date) {
    const cleanDate = new Date(date);
    const month = cleanDate.toLocaleString("en-us", { month: "long" });
    const resultDate = `${month.toString()} ${cleanDate.getDate()}, ${cleanDate.getFullYear()}`;
    
    return resultDate;
  }

  render() {
    let item = this.props.assignmentsData;
    let assignmentTabContent = '';
    let submissionTabContent = '';
    if(item) {
      let dueDate = this.formatDate(item.due_at)
      assignmentTabContent = (
        <div>
          <div className="assignment-header">
            <h4>{item.title}</h4>
            <span>due {dueDate}</span>
          </div>
          <p>{item.description}</p> 
        </div>
      )
    }

    if(this.props.submissionData.length) {
      let submissionData = this.props.submissionData

      submissionTabContent = submissionData.map((item, id) => {
        let fullName = `${item.creator.first_name} ${item.creator.last_name}`
        let imageSrc = item.creator.avatars.large;
        let submittedAt = this.formatDate(item.submitted_at);
        let content = item.content;
        return (
          <div className='submission-container' key={id}>
            <img src={imageSrc}/>
            <div>
              <h4>{fullName}</h4>
              <p>turned in {submittedAt}</p>
              <Expand content={content} />
            </div>
          </div>
        )
      })
    }

    //clean up tab component 
    
    return (
      <div className='content-wrapper'>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Assignments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Submissions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                {assignmentTabContent}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                {submissionTabContent}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}