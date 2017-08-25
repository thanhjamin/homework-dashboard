import React, { Component } from 'react';
import './App.css';
import List from './components/list/list.js';
import axios from 'axios';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      appData: {},
      submissionsData: {}
    };
  }

  componentDidMount() {
    const self = this;
    const url = 'https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d'
    axios.get(url)
      .then(function (response) {
        self.setState({ appData: response.data })
        self.fetchSubmissionData()
      })
      .catch(function (error) {
        console.log(error);
      });  
  }

  fetchSubmissionData() {
    const appData = this.state.appData
    const self = this;
    let submissions = {};
    appData.map((item) => {
      let assignmentId = item.id
      let url = `https://api.edmodo.com/assignment_submissions?assignment_id=${assignmentId}&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d`;
      axios.get(url)
        .then(function (response) {
          submissions[assignmentId] = response.data
          self.setState({ submissionsData: submissions })
        })
        .catch(function (error) {
          console.log(error);
        }); 
    })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const assignmentObj = this.state.appData;
    const submissionObj = this.state.submissionsData;
    if(!assignmentObj.length) {
      return (
        <div className="App">
          <h2>Loading...</h2>
        </div>
      )
    }
    return (
      <div>
        <List assignmentsData={assignmentObj} submissionsData={submissionObj} />
      </div>
    );
  }
}

export default App;
