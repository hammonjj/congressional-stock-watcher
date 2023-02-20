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

    for(const repTransactions of transactionReport) {

        let children = countChildren(repTransactions.transactions);
        ret.transactionCount += children.transactionCount;
        ret.purchase += children.purchase;
        ret.sale += children.sale;

        ret.reps.push({
            name: repTransactions.name,
            transactionCount: children.transactionCount,
            purchase: children.purchase,
            sales: children.sales
        });

        ret.repsReporting++;
    }

    return ret;
}

function countChildren(repTransactions = []) {
    const ret = {
        transactionCount: 0,
        purchase: 0,
        sale: 0,
    }

    for(const transaction of repTransactions) {
        if(transaction.transaction_type == "purchase") {
            ret.purchase++;
        }
        else if(transaction.transaction_type == "sale_partial") {
            ret.sale++;
        }
        else if(transaction.transaction_type == "sale_full") {
            ret.sale++;
        }
        ret.transactionCount++;
    }

    return ret;
}