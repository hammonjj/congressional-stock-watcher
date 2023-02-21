import { Card, CardContent, Typography } from "@mui/material";

const TransactionReportHeaderCard = (props) => {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    <div style={{textAlign: "center"}}>Transaction Report for {props.date}</div>
                </Typography>
            </CardContent>
        </Card>)
}

export default TransactionReportHeaderCard;