import { Card, CardContent, Typography } from "@mui/material";

const TradeVolumeCard = (props) => {
    return (
        <Card sx={{ minWidth: 375 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14}} gutterBottom>
                    Total Trade Volume
                </Typography>
                <Typography variant="h5" component="div">
                    Placeholder: $300,000
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TradeVolumeCard;