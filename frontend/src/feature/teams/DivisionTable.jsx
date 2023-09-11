import React from "react";
import Table from "../table/Table";
import { Link } from "react-router-dom";
import './style.css'

class DivisionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }


  nameFormatter = (cell, row) => {
    const completeData = {...row, division: this.props.divisionName}
    return (
      <div>
        <img src={ row.img } className="division-team-logo" alt="" />
        {/* <Link to="/home/team" state={completeData} style={{ textDecoration: "none" }}> */}
          { cell }
        {/* </Link> */}
      </div>
    )
  }

  rowEvents = () => {
    return {
      onClick: (e, row, rowIndex) => {
        const completeData = { ...row, division: this.props.divisionName }
        this.props.updatePageState("team", completeData)
      }
    }
  }

  columnGenerate = () => {
    const columns = [
      { dataField: 'id', text: 'Id', hidden: true },
      { 
        dataField: 'name', 
        text: this.props.divisionName, 
        formatter: this.nameFormatter,
        headerStyle: { width: "2.5in" }
      },
      { dataField: 'wins', text: 'W' },
      { dataField: 'losses', text: 'L' },
      { dataField: 'pct', text: 'Pct' },
      { dataField: 'gb', text: 'GB' },
      { dataField: 'lastTen', text: 'L10' },
      { dataField: 'diff', text: 'DIFF' },
    ]

    return columns
  }

  render() {
    const columns = this.columnGenerate()
    return (
      <Table 
        id={this.props.divisionName}
        data={this.props.data}
        columns={columns}
        rowEvents={this.rowEvents()}
        loading={!this.props.dataState}
      />
    )
  }
}

export default DivisionTable