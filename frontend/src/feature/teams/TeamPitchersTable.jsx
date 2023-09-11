import React from "react";
import Table from "../table/Table";
import './style.css'

const TeamPitchersTable = (props) => {

  const playerFormatter = (cell, row) => {
    return (
      <div>
        <img src={ row.img } alt="" className="team-player-log" />
        { cell }
      </div>
    )
  }

  const rowEvents = () => {
    return {
      onClick: (e, row, rowIndex) => {
        const info = {
          id: row.id,
          batSide: row.batSide,
          throwSide: row.throwSide,
          name: row.firstLastName,
          position: row.position,
          height: row.height,
          weight: row.weight,
          draftedYear: row.draftedYear,
          type: "pitching",
          age: row.age
        }

        const completeData = { player: info, teamData: props.teamData }
        props.updatePageState("player", completeData)
      }
    }
  }
  
  const columnGenerate = () => {
    const columns = [
      { dataField: 'id', text: 'id', hidden: true},
      { dataField: 'position', text: 'Pos', hidden: false },
      { dataField: 'jerseyNumber', text: '#', hidden: false },
      { 
        dataField: 'lastFirstName', 
        text: 'Player', 
        hidden: false,
        formatter: playerFormatter, headerStyle: {width: "5in"}
      },
      { dataField: 'age', text: 'Age', hidden: false },
      { dataField: 'throwSide', text: 'T', hidden: false },
      { dataField: 'inningsPitched', text: 'IP', hidden: false },
      { dataField: 'era', text: 'ERA', hidden: false },
      { dataField: 'strikeOuts', text: 'SO', hidden: false },
      { dataField: 'walk', text: 'BB', hidden: false },
      { dataField: 'strikeOutPerct', text: 'SO%', hidden: false },
      { dataField: 'walkPerct', text: 'BB%', hidden: false },
      { dataField: 'homerunsPerNine', text: 'HR/9', hidden: false },
      { dataField: 'onBasePlusSlugging', text: 'OPS', hidden: false },
    ]

    return columns
  }

  return (
    <div className="team-table__style">
      <Table 
        id={props.teamData.id}
        data={props.data}
        columns={columnGenerate()}
        rowEvents={rowEvents()}
      />
    </div>
  )
}

export default TeamPitchersTable