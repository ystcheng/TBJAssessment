import React from "react";
import Table from "../../table/Table";
import '../style.css'

const LeaderboardTable = (props) => {
  const columnGenerate = () => {
    const columns = [
      { dataField: 'id', text: '', hidden: true },
      { dataField: 'rank', text: 'Rank', hidden: false, headerStyle: { width: "5%" } },
      { dataField: 'name', text: 'Name', hidden: false, formatter: playerFormatter, headerStyle: { width: "20%" } },
      { dataField: 'teamName', text: 'Team', hidden: false, formatter: teamFormatter, headerStyle: { width: "30%" } },
      { dataField: 'value', text: props.tableType, hidden: false, headerStyle: { width: "8%" }},
    ]

    return columns
  }

  const teamFormatter = (cell, row) => {
    return (
      <div>
        <img src={`https://www.mlbstatic.com/team-logos/${row.teamID}.svg`} className="table-team-logo" alt="" />
        { cell }
      </div>
    )
  }

  const playerFormatter = (cell, row) => {
    return (
      <div>
        <img src={`https://content.mlb.com/images/headshots/current/60x60/${row.id}.png`} alt="" />
        { cell }
      </div>
    )
  }

  return (
    <Table
      id={`${props.tableType}-table`}
      data={props.data}
      columns={columnGenerate()}
    />
  )
}

export default LeaderboardTable