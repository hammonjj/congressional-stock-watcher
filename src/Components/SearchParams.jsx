import Grid from '@mui/material/Grid';
import { useContext } from "react";
import TransactionReport from "./TransactionReport";
import HeaderBar from "./HeaderBar";
import ReportContext from '../ReportContext';

const SearchParams = () => {
  const [currentReport] = useContext(ReportContext);

  return (
    <div>
      <HeaderBar />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {currentReport ? (<TransactionReport transactionReport={currentReport}></TransactionReport>) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchParams;
