import React from "react";
import Table from "../table/Table";
import './style.css'

const PlayerPitcherTable = (props) => {

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
        dataField: 'gamesPitched', 
        text: 'G', 
        hidden: false,
      },
      { 
        dataField: 'inningsPitched', 
        text: 'IP', 
        hidden: false,
      },
      { 
        dataField: 'wins', 
        text: 'W', 
        hidden: false,
      },
      { 
        dataField: 'losses', 
        text: 'L', 
        hidden: false,
      },
      { 
        dataField: 'saves', 
        text: 'SV', 
        hidden: false,
      },
      { 
        dataField: 'era', 
        text: 'ERA', 
        hidden: false,
      },
      { 
        dataField: 'whip', 
        text: 'WHIP', 
        hidden: false,
      },
      { 
        dataField: 'hits', 
        text: 'H', 
        hidden: false,
      },
      { 
        dataField: 'runs', 
        text: 'R', 
        hidden: false,
      },
      { 
        dataField: 'strikeOuts', 
        text: 'SO', 
        hidden: false,
      },
      { 
        dataField: 'walks', 
        text: 'BB', 
        hidden: false,
      },
      { 
        dataField: 'homeRunsPerNine', 
        text: 'HR/9', 
        hidden: false,
      },
      { 
        dataField: 'ops', 
        text: 'OPS', 
        hidden: false,
      },
    ]

    return columns
  }

  return (
    <div className="player-table__layout-style">
      <Table 
        id={props.playerID}
        data={props.data}
        columns={columnGenerate()}
      />
    </div>
  )
}

export default PlayerPitcherTable