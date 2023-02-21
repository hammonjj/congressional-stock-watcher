import { Card, CardContent, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#DCDCDC",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TickerTradeCard = (props) => {
  if (props.data.size == 0) {
    return (
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.tradeType} By Ticker
          </Typography>
          <Typography variant="h5" component="div">
            No Data (Blank Disclosure Filed)
          </Typography>
        </CardContent>
      </Card>
    );
  }

  let tradeTotal = 0;
  [...props.data].map((entry) => {
    tradeTotal += entry[1];
  });

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {props.tradeType} By Ticker
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Ticker</StyledTableCell>
                <StyledTableCell align="left">Occurences</StyledTableCell>
                <StyledTableCell align="left">% Of Total Trades</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...props.data].map((entry) => (
                <TableRow key={entry[0]}>
                  <TableCell align="left">{entry[0]}</TableCell>
                  <TableCell align="left">{entry[1]}</TableCell>
                  <TableCell align="left">{((entry[1] / tradeTotal) * 100).toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" color="textSecondary" component="p" paddingTop={2}>
          NOTE: Trades without a ticker (ex. Treasury Bonds) are not included
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TickerTradeCard;
