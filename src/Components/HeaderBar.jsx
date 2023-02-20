import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import MenuItem from "@mui/material/MenuItem";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from "@mui/material/Select";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState, useEffect, useContext } from "react";
import ReportContext from '../ReportContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from Icon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
    },
  },
}));

export default function HeaderBar() {
    // eslint-disable-next-line no-unused-vars
    const [_, setCurrentReport] = useContext(ReportContext);
    const [transactionReports, setTransactionReports] = useState([]);

    useEffect(() => {
        getTransactionReports();
    }, []);

    async function getTransactionReports() {
    fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/filemap.xml")
        .then((response) => response.text())
        .then((response) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, "text/xml");
        const results = [].slice
            .call(xml.getElementsByTagName("Key"))
            .filter((key) => key.textContent.includes(".json"));
        setTransactionReports(results.map((file) => file.textContent));
        });
    }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Congressional Stock Watcher
          </Typography>
          <Search>
            <SearchIconWrapper>
              <CalendarMonthIcon />
            </SearchIconWrapper>
            <StyledSelect 
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => {
                    setCurrentReport(event.target.value);
                }}
                >
                <MenuItem key="first" value=""></MenuItem>
                {transactionReports.map((file) => (
                    <MenuItem
                        key={file}
                        value={file}
                    >
                        {file.replace("data/transaction_report_for_", "").replace(".json", "").replace(/_/g, "-")}
                    </MenuItem>
                ))}
            </StyledSelect>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}