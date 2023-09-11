import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import overlayFactory from "react-bootstrap-table2-overlay";
import './style.css'

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="custom-table__preset-style">
        <BootstrapTable
          key={this.props.id}
          keyField="id"
          data={this.props.data}
          columns={this.props.columns}
          hover
          striped
          bordered={false}
          classes="rounded overflow-hidden"
          headerClasses="header-class-color"
          condensed={true}
          // rowStyle={{fontWeight: "bold"}}
          rowEvents={this.props.rowEvents}
        />
      </div>
    )
  }
}

export default Table