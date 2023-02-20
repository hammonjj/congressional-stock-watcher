import { Card, CardContent, Typography } from "@mui/material";
import { CARD_MIN_WIDTH } from "../Utilities/Constants";

const TradeRatioCard = (props) => {
    const {sales, purchases} = props;

    return (
        <Card sx={{ minWidth: CARD_MIN_WIDTH }}>
            <CardContent>
                <Typography sx={{ fontSize: 14}} gutterBottom>
                    Trade Type Ratio (Purchases/Sales)
                </Typography>
                <Typography variant="h5" component="div">
                    {purchases}/{sales}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TradeRatioCard;