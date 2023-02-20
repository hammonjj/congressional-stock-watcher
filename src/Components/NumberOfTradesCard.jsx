import { Card, CardContent, Typography } from "@mui/material";
import { CARD_MIN_WIDTH } from "../Utilities/Constants";

const NumberOfTradesCard = (props) => {
    return(
        <Card sx={{ minWidth: CARD_MIN_WIDTH }}>
            <CardContent>
                <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
                    Number of Transactions 
                </Typography>
                <Typography variant="h5" component="div">
                    {props.numberOfTrades}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default NumberOfTradesCard;