import { Card, CardContent, Typography } from "@mui/material";
import NumbersIcon from '@mui/icons-material/Numbers';

const NumberOfTradesCard = (props) => {
    return(
        <Card sx={{ minWidth: 375 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14}} gutterBottom>
                    Number of Transactions <NumbersIcon/>
                </Typography>
                <Typography variant="h5" component="div">
                    {props.numberOfTrades}
                    
                </Typography>
            </CardContent>
        </Card>
    );
}

export default NumberOfTradesCard;