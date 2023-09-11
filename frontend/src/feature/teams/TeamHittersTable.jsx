import React from "react";
import Table from "../table/Table";
import './style.css'

const TeamHittersTable = (props) => {

  const playerFormatter = (cell, row) => {
    return (
      <div>
        <img src={ row.img } alt="" />
        { cell }
      </div>
    )
  }

  const jerseyNumberFormatter = (cell, row) => {
    // return (
    //   <span className="header-text-secondary">{ cell }</span>
    // )

    return cell
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
          type: "hitting",
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
      { 
        dataField: 'jerseyNumber', 
        text: '#', 
        hidden: false,
        formatter: jerseyNumberFormatter
      },
      { 
        dataField: 'lastFirstName', 
        text: 'Player', 
        hidden: false,
        formatter: playerFormatter, headerStyle: {width: "3in"}
      },
      { dataField: 'age', text: 'Age', hidden: false },
      { dataField: 'batSide', text: 'B', hidden: false },
      { dataField: 'throwSide', text: 'T', hidden: false },
      { dataField: 'plateAppearance', text: 'PA', hidden: false },
      { dataField: 'hits', text: 'H', hidden: false },
      { dataField: 'doubles', text: '2B', hidden: false },
      { dataField: 'triples', text: '3B', hidden: false },
      { dataField: 'homeRuns', text: 'HR', hidden: false },
      { dataField: 'stolenBases', text: 'SB', hidden: false },
      { dataField: 'strikeOutPerct', text: 'SO%', hidden: false },
      { dataField: 'walkPerct', text: 'BB%', hidden: false },
      { dataField: 'battingAvg', text: 'AVG', hidden: false },
      { dataField: 'onBasePerct', text: 'OBP', hidden: false },
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

export default TeamHittersTable