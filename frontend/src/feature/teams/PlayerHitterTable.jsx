import React from "react";
import Table from "../table/Table";
import './style.css'

const PlayerHitterTable = (props) => {

  const teamFormatter = (cell, row) => {
    return (
      <div>
        <img src={ row.teamImg } className="division-team-logo" alt="" />
        { cell }
      </div>
    )
  }

  const columnGenerate = () => {
    const columns = [
      { dataField: 'id', text: 'id', hidden: true},
      { dataField: 'year', text: 'Year', hidden: false },
      { 
        dataField: 'team', 
        text: 'Team', 
        hidden: false,
        formatter: teamFormatter,
        headerStyle: { width: "3in" }
      },
      { 
        dataField: 'gamesPlayed', 
        text: 'G', 
        hidden: false,
      },
      { 
        dataField: 'plateAppearances', 
        text: 'PA', 
        hidden: false,
      },
      { dataField: 'atBats', text: 'AB', hidden: false },
      { dataField: 'runs', text: 'R', hidden: false },
      { dataField: 'hits', text: 'H', hidden: false },
      { dataField: 'doubles', text: '2B', hidden: false },
      { dataField: 'triples', text: '3B', hidden: false },
      { dataField: 'homeRuns', text: 'HR', hidden: false },
      { dataField: 'rbi', text: 'RBI', hidden: false },
      { dataField: 'stolenBases', text: 'SB', hidden: false },
      { dataField: 'walks', text: 'BB', hidden: false },
      { dataField: 'strikeOuts', text: 'SO', hidden: false },
      { dataField: 'obp', text: 'OBP', hidden: false },
      { dataField: 'slg', text: 'SLG', hidden: false },
      { dataField: 'ops', text: 'OPS', hidden: false },
    ]

    return columns
  }

  return (
    <div>
      <Table 
        id={props.playerID}
        data={props.data}
        columns={columnGenerate()}
      />
    </div>
  )
}

export default PlayerHitterTable