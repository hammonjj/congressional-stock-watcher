import { Card, CardContent, Typography } from "@mui/material";

const TradeRatioCard = (props) => {
    const {sales, purchases} = props;

    return (
        <Card sx={{ minWidth: 375 }}>
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