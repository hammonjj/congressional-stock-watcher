import { Card, CardContent, Typography } from "@mui/material";

const RepsReportingCard = (props) => {
    return (
        
        <Card sx={{ minWidth: 375 }}>
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