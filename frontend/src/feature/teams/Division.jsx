import React, { useEffect, useState } from "react";
import DivisionTable from "./DivisionTable";
import { Col, Container, Row, Spinner } from "reactstrap";
import { getDivision } from "../../api/divisionAPI";
import LoadingScreen from "../loadingScreen/loadingScreen";

const DivisionComponent = (props) => {

  const renderDivisionsFromLeague = (obj) => {
    const layout = Object.keys(obj).map(key => {
      return (
        <Row className="division-table__layout-style"> 
          <DivisionTable 
            divisionName={key} 
            data={obj[key]} 
            updatePageState={props.updatePageState} 
            dataState={props.dataState} 
          />
        </Row>
      )
    })

    return (
      <Col>{ layout }</Col>
    )
  }

  return (
    <Row className="division__layout-style">
      <h4>Teams</h4>
      <Row>
        { !props.dataState && <LoadingScreen className="loading-style__preset" /> }
        { props.dataState && renderDivisionsFromLeague(props.data.american) }
        { props.dataState && renderDivisionsFromLeague(props.data.national) }
      </Row>
    </Row>
  )
}

export default DivisionComponent