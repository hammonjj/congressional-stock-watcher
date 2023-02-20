import { Card, CardContent, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { TRADE_BREAKDOWN_PIE_CHAR_LABELS } from "../Utilities/Constants"

ChartJS.register(ArcElement, Tooltip, Legend);

const TradeBreakdownCard = (props) => {
    const data = {
        labels: TRADE_BREAKDOWN_PIE_CHAR_LABELS,
        datasets: [
            {
                label: "Transactions",
                data: [props.rep.purchase, props.rep.sales],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)"
                ],
                borderWidth: 3
            }
        ]
    }

    const cardStyle = {
        display: 'block',
        transitionDuration: '0.3s',
        height: '37.5vw'
    }

    return (
        <Card style={cardStyle}>
            <CardContent>
                <Typography sx={{ fontSize: 14}} gutterBottom>
                    Buy/Sell Breakdown
                </Typography>
                <Typography variant="h5" component="div">
                    {props.rep.name.replace("Hon. ", "")} ({props.rep.district})
                </Typography>
                <Pie data={data} />
            </CardContent>
        </Card>
    );
}

export default TradeBreakdownCard;