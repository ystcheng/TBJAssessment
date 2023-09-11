import React from "react";
import { Container, Spinner } from "reactstrap";

const LoadingScreen = (props) => {
  return (
    <Container>
      <Spinner className={props.className}>
        Loading Data...
      </Spinner>
    </Container>
  )
}

export default LoadingScreen
