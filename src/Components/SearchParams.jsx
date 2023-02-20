import Grid from '@mui/material/Grid';
import { useContext } from "react";
import TransactionReport from "./TransactionReport";
import HeaderBar from "./HeaderBar";
import ReportContext from '../ReportContext';

const SearchParams = () => {
  let [currentReport] = useContext(ReportContext);

  if(!currentReport) {
    currentReport = "data/transaction_report_for_02_15_2023.json";
  }

  return (
    <div>
      <HeaderBar />
      <br />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          {currentReport ? (<TransactionReport transactionReport={currentReport}></TransactionReport>) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchParams;
