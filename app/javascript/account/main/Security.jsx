import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import ColumnTitle from '../shared/ColumnTitle';

class Security extends React.Component {
  render() {
    return (
      <div className="security">
        <Row>
          <Col md={12}>
            <ColumnTitle title="账户安全" en="Security" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Security;
