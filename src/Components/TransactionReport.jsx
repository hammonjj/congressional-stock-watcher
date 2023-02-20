import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import NumberOfTradesCard from "./NumberOfTradesCard";
import RepsReportingCard from "./RepsReportingCard";
import TradeRatioCard from "./TradeRatioCard";
import TradeVolumeCard from "./TradeVolumeCard";
import TradeBreakdownCard from "./TradeBreakdownCard"
import { parseTransactionReport } from "../Utilities/TransactionReportUtilities";

const TransactionReport = (props) => {
    const [transactionReport, setTransactionReport] = useState([]);
    const parsedReport = parseTransactionReport(transactionReport);

    useEffect(() => {
        getTransactionReportForDay();

        async function getTransactionReportForDay() 
        {
            if(props.transactionReport === "") {
                return;
            }

            fetch(`https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/${props.transactionReport}`)
                .then((response) => response.json())
                .then((response) => {
                    setTransactionReport(response);
                });
        }
    }, [props.transactionReport]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <NumberOfTradesCard numberOfTrades={parsedReport.transactions} />
            </Grid>
            <Grid item xs={6}>
                <TradeRatioCard sales={parsedReport.sales} purchases={parsedReport.purchases} />
            </Grid>
            <Grid item xs={6}>
                <RepsReportingCard numberOfReps={parsedReport.repsReporting} />
            </Grid>
            <Grid item xs={6}>
                <TradeVolumeCard />
            </Grid>
            {
                parsedReport.reps.map(rep => (
                    <Grid item xs={6} key={rep.name}>
                        <TradeBreakdownCard rep={rep} key={rep} />
                    </Grid>
                ))
            }
        </Grid>);
};

export default TransactionReport;
