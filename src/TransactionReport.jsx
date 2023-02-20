import { useEffect, useState } from "react";
import NumberOfTradesCard from "./Components/NumberOfTradesCard";
import RepsReportingCard from "./Components/RepsReportingCard";
import TradeRatioCard from "./Components/TradeRatioCard";
import TradeVolumeCard from "./Components/TradeVolumeCard";
import { parseTransactionReport } from "./Utilities/TransactionReportUtilities";

const TransactionReport = (props) => {
    const [transactionReportString, setTransactionReportString] = useState("");
    const [transactionReport, setTransactionReport] = useState([]);

    //setTransactionReportString(props.TransactionReport);

    useEffect(() => {
        getTransactionReportForDay();
    }, []);

    async function getTransactionReportForDay() 
    {
        if(props.transactionReport === "") {
            return;
        }

        console.log(`https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/${props.transactionReport}`);
        fetch(`https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/${props.transactionReport}`)
            .then((response) => response.json())
            .then((response) => {
                setTransactionReport(response);
            })
    }

    if (props.transactionReportString === "") {
        return (<div>No Report Selected</div>);
    }

    const parsedReport = parseTransactionReport(transactionReport);
    console.log(`numberOfTrades: ${parsedReport.transactions}`);
    console.log(`purchases: ${parsedReport.purchases}`);
    console.log(`sales: ${parsedReport.sales}`);
    console.log(`repsReporting: ${parsedReport.repsReporting}`);
    console.log(`repsCount: ${parsedReport.reps.length}`);

    /*
    {transactionReport.map((e) => (
                e.first_name
           ))}
    */
    return (
        <div>
            <NumberOfTradesCard numberOfTrades={parsedReport.transactions} />
            <TradeRatioCard sales={parsedReport.sales} purchases={parsedReport.purchases} />
            <RepsReportingCard numberOfReps={parsedReport.repsReporting} />
            <TradeVolumeCard />
            <br />
           
        </div>);
};

export default TransactionReport;
