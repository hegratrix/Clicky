import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import firebase from 'firebase'

let counter = 0

function createData(name, highScore, numGames) {
  counter += 1
  return { id: counter, name, highScore, numGames }
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'highScore', numeric: true, disablePadding: false, label: 'High Score' },
  { id: 'numGames', numeric: true, disablePadding: false, label: 'Games Played' },
]

class LeaderBoardHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy } = this.props

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                style={{ 'borderBottomColor': 'black', 'borderBottomWidth': 1, 'borderBottomStyle': 'solid' }}
                key={row.id}
                align={row.numeric ? 'left' : 'left'}
                paddingleft={row.disablePadding ? 24 : 'none'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

LeaderBoardHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  title: {
    marginRight: 'auto',
    marginLeft: 'auto',
    textDecoration: 'underline'
  },
});

let LeaderBoardToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            LeaderBoard
          </Typography>
      </div>
    </Toolbar>
  );
};

LeaderBoardToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

LeaderBoardToolbar = withStyles(toolbarStyles)(LeaderBoardToolbar);

const styles = theme => ({
  root: {
    width: '65%',
    height: '100%',
    marginTop: theme.spacing.unit * 1,
    borderColor: 'black',
    borderWidth: 4,
    borderStyle: 'solid',
    backgroundColor: '#ffbdad',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    minHeight: 490,
  },
  table: {
    textAlign: 'center'
  },
  image: {
    width: '30%',
    height: 421,
    marginTop: theme.spacing.unit * 1,
    borderColor: 'black',
    borderWidth: 4,
    borderStyle: 'solid'
  },
  cell: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    textAlign: 'left'
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class LeaderBoard extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'highScore',
    data: [],
    page: 0,
    rowsPerPage: 5,
  };

componentDidMount = () => {
    firebase.database().ref('users').once('child_added')
    .then(r => r.val())
    .then(user => {
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                let scores = user[key].scores ? user[key].scores : []
                let data = this.state.data
                data.push(createData(user[key].name, Math.max(...scores), scores.length))
                this.setState({ data: data })
            }
        }
    })
}

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className={classes.container}>
      <img className={classes.image} src='https://mk0annaeverywhek1p02.kinstacdn.com/wp-content/uploads/2017/06/IMG_7952-2-1200x1600.jpg' alt='flamingo'></img>
      <Paper className={classes.root}>
        <LeaderBoardToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <LeaderBoardHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      key={n.id}
                    >
                      <TableCell className={classes.cell} component="th" scope="row" padding="24">
                        {n.name}
                      </TableCell>
                      <TableCell className={classes.cell}>{n.highScore}</TableCell>
                      <TableCell className={classes.cell}>{n.numGames}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell style={{ 'border': 'none'}} colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
      </div>
    )
  }
}

LeaderBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeaderBoard);
