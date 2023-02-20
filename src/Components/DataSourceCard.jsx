import { Card, CardContent, Typography } from "@mui/material";
import { CARD_MIN_WIDTH } from "../Utilities/Constants";

const DataSourceCard = (props) => {
    return (
        <Card sx={{ minWidth: CARD_MIN_WIDTH }}>
            <CardContent>
                <Typography sx={{ fontSize: 14}} gutterBottom>
                    Source (External Link)
                </Typography>
                <Typography variant="h5" component="div">
                    <a href={props.dataSourceUrl} target="_blank" rel="noreferrer">JSON Data Source</a>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default DataSourceCard;