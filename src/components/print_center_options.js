import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class PrintCenterOptions extends Component {

constructor(props) {
  super(props);
  this.state = {
    deliverTo: '',
    instructions : '',
    options: [],
    color: [],
    fileNames: [],
    redirect: false
  };
  this.handleRadioChange = this.handleRadioChange.bind(this);
  this.handlePrintChange = this.handlePrintChange.bind(this);
  this.handleColorChange = this.handleColorChange.bind(this);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount() {
   axios.get('https://demo3662581.mockable.io/documents').then(res => {
    const fileNames = res.data.documents.filename;
    this.setState({fileNames})
  });
}

handleRadioChange(event) {
  this.setState({
    deliverTo : event.target.value
  });
}

handleCancel() {
  axios.delete('https://demo3662581.mockable.io/print_jobs');
}

handlePrintChange(event) {
  const element = event.target;
  if(element.checked) {
    this.state.options.push(element);
  }
}

handleColorChange(event) {
  const element = event.target;
  if(element.checked) {
    this.state.color.push(element);
  }
}


handleTextAreaChange(event) {
  this.setState({
    instructions : event.target.value
  });
}

handleSubmit(e) {
  e.preventDefault();
  var tableData = [];
  this.state.options.forEach(option =>
    {
      var inputVal = document.getElementsByClassName(`${option.name}-inputValue`)[0],
          colorVal = document.getElementsByClassName(`${option.name}-color`)[0],
          inputInnerValue = inputVal.value,
          colorValue = colorVal.checked,
          printOption = {

        filename: option.name,
        color: colorValue,
        notes: inputInnerValue

      }
      return (tableData.push(printOption));
    }
  )
  const data = {
    deliverTo : this.state.deliverTo,
    instructions: this.state.instructions,
    documents: {
      document: tableData
    }
  }
  axios.put('https://demo3662581.mockable.io/print_jobs', data).then(function(response){
        console.log('saved successfully');
  });

  this.setState({
    redirect: true
  })

  }

isCheckedPrint(fileName) {
  if (this.state.options.indexOf(fileName) > -1) {true} else {false}
}

isCheckedColor(fileName) {
  if (this.state.color.indexOf(fileName) > -1) {true} else {false}
}

handleDisabled(fileName) {

  const fileExtensionValue = fileName.split('.').pop();
  if(fileExtensionValue === 'zip') {
    return true;
  } else {
    return false;
  }
}


render() {
  if (this.state.redirect === true) {
  return <Redirect to='/success' />
}
    return (
      <form onSubmit={this.handleSubmit}>
      <div>
      <h1>Print Center Options</h1>
      <p>In order for the print center to best serve you, please fill in the information below.</p>
      <div>
      <h3>Deliver to</h3>
      <div>
      <label>
      <input className="radioButton" type="radio" value="owner" checked={this.state.deliverTo==="owner"} onChange={this.handleRadioChange} />
      Meeting Owner
      </label>
      </div>
      <div>
      <label>
      <input className="radioButton" type="radio" value="room" checked={this.state.deliverTo==="room"} onChange={this.handleRadioChange} />
      Meeting Room
      </label>
      </div>
      </div>
      <div>
      <textarea className="textArea" placeholder="If you have any specific instructions please enter here" value={this.state.instructions} onChange={this.handleTextAreaChange} cols={100} rows={3} />
      </div>
      <table className="table table-bordered">
      <thead className="table-header">
      <tr>
      <th>File</th>
      <th>Print</th>
      <th>Color</th>
      <th>Notes</th>
      </tr>
      </thead>
      <tbody>
      {this.state.fileNames.map(fileName =>
        <tr key={fileName} disabled={this.handleDisabled(fileName)}>
        <td>{fileName}<sup className={`disabled-${this.handleDisabled(fileName)}`}>*</sup></td>
        <td><input disabled={this.handleDisabled(fileName)} type="checkbox" value={fileName} name={fileName} checked={this.isCheckedPrint(fileName)} onChange={this.handlePrintChange} /></td>
        <td><input className={`${fileName}-color`} disabled={this.handleDisabled(fileName)} type="checkbox" value={fileName} name={fileName} checked={this.isCheckedColor(fileName)} onChange={this.handleColorChange} /></td>
        <td><input disabled={this.handleDisabled(fileName)} className={`${fileName}-inputValue`} type="text" placeholder="Notes" /></td>
        </tr>
      )}
      </tbody>
      </table>
      <div className="row">
      <div className="col-md-6">
      <p><sup>*</sup>File is not compatible with Print Center</p>
      </div>
      <div className="col-md-6 text-xs-right">
      <button type="submit" className="btn btn-custom">Submit</button>
      <Link to="/" className="btn btn-custom" onClick={this.handleCancel}>Cancel</Link>
      </div>
      </div>

      </div>
      </form>
    );
  }
}

export default PrintCenterOptions;
