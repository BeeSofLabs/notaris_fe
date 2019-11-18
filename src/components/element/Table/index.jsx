import {
  Table,
} from 'react-bootstrap'
import PropTypes from 'prop-types'

const TableComp = ({ columns, children }) => (
  <Table responsive>
    <thead>
      <tr>
        {
          columns.map(column => (
            <th key={column}>{column}</th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </Table>
)

TableComp.propTypes = {
  children: PropTypes.any,
  columns: PropTypes.any,
}

export default TableComp
