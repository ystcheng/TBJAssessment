import React, { useEffect, useState, useRef } from "react";
import { Container  } from "reactstrap";
import { getAllLeagueDivision } from "../../api/divisionAPI";
import Main from "./Main";
import Team from "./Team";
import Player from "./Player";

const TeamIndex = () => {

  const [teamMapping, setTeamMapping] = useState({})
  const [pageState, setPageState] = useState({
    page: "main", data: { american: [], national: [] }  
  })

  const [dataState, setDataState] = useState(false)

  const prevPage = useRef("")

  useEffect(() => {
    if (prevPage.current !== pageState.page) {
      prevPage.current = pageState.page
      if (pageState.page === "main") {
        getAllLeagueDivision(['american', 'national']).then(data => {
          const teamMap = {}
          Object.keys(data).forEach(leagueName => {
            const divisions = data[leagueName]
            Object.keys(divisions).forEach(divisionName => {
              const teams = divisions[divisionName]
              teams.forEach(team => teamMap[team.id.toString()] = {
                division: divisionName,
                fullName: team.fullName,
                name: team.name,
                img: team.img 
              })
            })
          })
          setTeamMapping(teamMap)
          setPageState({ ...pageState, data })
          setDataState(true)
        })
      }
    }
  }, [pageState])

  // update pageData
  const updatePageState = (page, data) => {
    setDataState(false)
    if (page === "main") {
      setPageState({ ...pageState, page: "main" })
    } else {
      setPageState({ page, data })
    }
    setDataState(true)
  }

  // get the appropriate component
  const generateComponent = () => {
    if (pageState.page === "main") {
      return (
        <Main data={pageState.data} updatePageState={updatePageState} metaDataState={dataState} />
      )
    } else if (pageState.page === "team") {
      return (
        <Team data={pageState.data} updatePageState={updatePageState} metaDataState={dataState}  />
      )
    } else if (pageState.page === "player") {
      return (
        <Player data={pageState.data} updatePageState={updatePageState} teamMap={teamMapping} metaDataState={dataState} />
      )
    }
  }


  return(
    <Container>
      { generateComponent() } 
      {/* <DivisionComponent />
      <NewsComponent /> */}
    </Container>
  )
}

export default TeamIndex