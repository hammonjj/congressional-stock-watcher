import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import TransactionReport from "./TransactionReport";

const SearchParams = () => {
  const [transactionReport, setTransactionReport] = useState("");
  const [transactionReports, setTransactionReports] = useState([]);

  useEffect(() => {
    getTransactionReports();
  }, []);

  async function getTransactionReports() {
    fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/filemap.xml")
      .then((response) => response.text())
      .then((response) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, "text/xml");
        const results = [].slice
          .call(xml.getElementsByTagName("Key"))
          .filter((key) => key.textContent.includes(".json"));
        setTransactionReports(results.map((file) => file.textContent));
      });
  }

  return (
    <div className="search-params">
      <FormControl
        size="medium">
        <InputLabel>Transaction Report</InputLabel>
        <Select
          labelId="transactionReport"
          id="transactionReport"
          value=""
          label="Transaction Report"
          onChange={(e) => {
            setTransactionReport(e.target.value);
          }}>
            <MenuItem key="first" value="empty"></MenuItem>
            {transactionReports.map((file) => (
              <MenuItem
                key={file}
                value={file}>
                  {file.replace("data/transaction_report_for_", "").replace(".json", "").replace(/_/g, "-")}
                </MenuItem>
            ))}
        </Select>
      </FormControl>
      {transactionReport !== "empty" ? (<TransactionReport transactionReport={transactionReport}></TransactionReport>) : null}
    </div>
  );
};

export default SearchParams;
