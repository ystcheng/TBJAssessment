import React from "react";
import { Container } from "reactstrap";
import NewsComponent from "./News";
import DivisionComponent from "./Division";

const Main = (props) => {
  return(
    <Container>
      <DivisionComponent data={props.data} updatePageState={props.updatePageState} dataState={props.metaDataState} />
      <NewsComponent />
    </Container>
  )
}

export default Main