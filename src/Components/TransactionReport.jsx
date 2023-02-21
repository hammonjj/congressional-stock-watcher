import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import NumberOfTradesCard from "./NumberOfTradesCard";
import RepsReportingCard from "./RepsReportingCard";
import TradeRatioCard from "./TradeRatioCard";
import DataSourceCard from "./DataSourceCard";
import TradeBreakdownCard from "./TradeBreakdownCard"
import { parseTransactionReport } from "../Utilities/TransactionReportUtilities";
import TransactionReportHeaderCard from "./TransactionReportHeaderCard";
import TickerTradeCard from "./TickerTradeCard";

const TransactionReport = (props) => {
    const [transactionReport, setTransactionReport] = useState([]);
    const parsedReport = parseTransactionReport(transactionReport);
    const dataSourceUrl = `https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/${props.transactionReport}`;

    useEffect(() => {
        getTransactionReportForDay();

        async function getTransactionReportForDay() 
        {
            if(props.transactionReport === "") {
                return;
            }

            fetch(dataSourceUrl)
                .then((response) => response.json())
                .then((response) => {
                    setTransactionReport(response);
                });
        }
    }, [dataSourceUrl, props.transactionReport]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TransactionReportHeaderCard 
                    date={props.transactionReport.replace(
                        "data/transaction_report_for_", "").replace(".json", "").replace(/_/g, "/")} />
            </Grid>
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
                <DataSourceCard dataSourceUrl={dataSourceUrl} />
            </Grid>
            {
                parsedReport.reps.map(rep => (
                    <Grid item xs={6} key={rep.name}>
                        <TradeBreakdownCard rep={rep} key={rep} />
                    </Grid>
                ))
            }
            <Grid item xs={12}>
                <TickerTradeCard 
                    tradeType="Purchases" 
                    data={parsedReport.tickerPurchases} 
                    tradeTotal={parsedReport.purchases} />
            </Grid>
            <Grid item xs={12}>
                <TickerTradeCard 
                    tradeType="Sales" 
                    data={parsedReport.tickerSales} 
                    tradeTotal={parsedReport.sales} />
            </Grid>
        </Grid>);
};

export default TransactionReport;
