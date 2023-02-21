export function parseTransactionReport(transactionReport = []) {
    const parsedReport = {
        transactions: 0,
        purchases: 0,
        sales: 0,
        repsReporting: 0,

        reps: []
    }

    let transactions = countTransactions(transactionReport);
    parsedReport.transactions = transactions.transactionCount;
    parsedReport.purchases = transactions.purchase;
    parsedReport.sales = transactions.sale;
    parsedReport.repsReporting = transactions.repsReporting;
    parsedReport.reps = transactions.reps;
    parsedReport.ticker = transactions.ticker;

    parsedReport.tickerSales = transactions.tickerSales;
    parsedReport.tickerPurchases = transactions.tickerPurchases;
    return parsedReport;
}

function countTransactions(transactionReport = []) {
    const ret = {
        transactionCount: 0,
        purchase: 0,
        sale: 0,
        repsReporting: 0,

        reps: [],
    }

    let tickerSales = new Map();
    let tickerPurchases = new Map();
    for(const repTransactions of transactionReport) {

        let children = countChildren(repTransactions.transactions);
        ret.transactionCount += children.transactionCount;
        ret.purchase += children.purchase;
        ret.sale += children.sale;

        ret.reps.push({
            name: repTransactions.name,
            district: repTransactions.district,
            transactionCount: children.transactionCount,
            purchase: children.purchase,
            sales: children.sale
        });

        ret.repsReporting++;

        for(const [tickerString, count] of children.tickerPurchases) {
            if(tickerPurchases.has(tickerString)) {
                tickerPurchases.set(tickerString, count + tickerPurchases.get(tickerString.ticker));
            }
            else {
                tickerPurchases.set(tickerString, count);
            }
        }

        for(const [tickerString, count] of children.tickerSales) {
            if(tickerSales.has(tickerString)) {
                tickerSales.set(tickerString, count + tickerSales.get(tickerString.ticker));
            }
            else {
                tickerSales.set(tickerString, count);
            }
        }
    }

    ret.tickerPurchases = tickerPurchases;
    ret.tickerSales = tickerSales;
    return ret;
}

function countChildren(repTransactions = []) {
    const ret = {
        transactionCount: 0,
        purchase: 0,
        sale: 0,
    }

    let tickerPurchases = new Map();
    let tickerSales = new Map();
    for(const transaction of repTransactions) {
        ret.transactionCount++;

        if(transaction.transaction_type == "purchase") {
            ret.purchase++;

            if(transaction.ticker === "--") {
                continue;
            }

            if(tickerPurchases.has(transaction.ticker)) {
                tickerPurchases.set(transaction.ticker, 1 + tickerPurchases.get(transaction.ticker));
            }
            else {
                tickerPurchases.set(transaction.ticker, 1);
            }
        }
        else if(transaction.transaction_type == "sale_partial" || transaction.transaction_type == "sale_full") {
            ret.sale++;

            if(transaction.ticker === "--") {
                continue;
            }

            if(tickerSales.has(transaction.ticker)) {
                tickerSales.set(transaction.ticker, 1 + tickerSales.get(transaction.ticker));
            }
            else {
                tickerSales.set(transaction.ticker, 1);
            }
        }
        

        /*
        if(ticker.has(transaction.ticker)) {
            ticker.set(transaction.ticker, 1 + ticker.get(transaction.ticker));
        }
        else {
            ticker.set(transaction.ticker, 1);
        }
        */
    }

    ret.tickerPurchases = tickerPurchases;
    ret.tickerSales = tickerSales;
    return ret;
}