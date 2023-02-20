import { Card, CardContent, Typography } from "@mui/material";
import { CARD_MIN_WIDTH } from "../Utilities/Constants";

const RepsReportingCard = (props) => {
    return (
        
        <Card sx={{ minWidth: CARD_MIN_WIDTH }}>
            <CardContent>
                <Typography sx={{ fontSize: 14}} gutterBottom>
                    Representatives Reporting
                </Typography>
                <Typography variant="h5" component="div">
                    {props.numberOfReps}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RepsReportingCard