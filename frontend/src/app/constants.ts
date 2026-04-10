export const NIFTY_50_SYMBOLS = [
    // NIFTY 50 Core
    "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ICICIBANK.NS", "BHARTIARTL.NS",
    "SBIN.NS", "INFY.NS", "ITC.NS", "HINDUNILVR.NS", "LT.NS",
    "BAJFINANCE.NS", "HCLTECH.NS", "MARUTI.NS", "SUNPHARMA.NS", "TATAMOTORS.NS",
    "M&M.NS", "TATASTEEL.NS", "POWERGRID.NS", "NTPC.NS", "TITAN.NS",
    "ULTRACEMCO.NS", "BAJAJFINSV.NS", "ONGC.NS", "KOTAKBANK.NS", "ASIANPAINT.NS",
    "ADANIENT.NS", "ADANIPORTS.NS", "COALINDIA.NS", "HDFCLIFE.NS", "BAJAJ-AUTO.NS",
    "SBILIFE.NS", "GRASIM.NS", "TECHM.NS", "WIPRO.NS", "HINDALCO.NS",
    "EICHERMOT.NS", "DIVISLAB.NS", "DRREDDY.NS", "BRITANNIA.NS", "TATACONSUM.NS",
    "APOLLOHOSP.NS", "INDUSINDBK.NS", "CIPLA.NS", "HEROMOTOCO.NS", "UPL.NS",

    // Nifty NEXT 50 & Critical Sectors Expansion (75+ Total)
    "DLF.NS", "GODREJPROP.NS", "OBEROIRLTY.NS", "MACROTECH.NS", // Real Estate
    "HAL.NS", "BEL.NS", "BDL.NS", "MAZDOCK.NS", // Defense & Aerospace
    "ZOMATO.NS", "PAYTM.NS", "NYKAA.NS", "DELHIVERY.NS", // New Age Tech
    "TVSMOTOR.NS", "ASHOKLEY.NS", "BOSCHLTD.NS", // Auto Ancillary
    "DMART.NS", "TRENT.NS", "VBL.NS", "PAGEIND.NS", // Retail & Consumer
    "AWL.NS", "PATANJALI.NS", // FMCG Extra
    "IRCTC.NS", "RVNL.NS", "IRFC.NS", "CONCOR.NS", // Railways
    "LICI.NS", "MUTHOOTFIN.NS", "CHOLAFIN.NS" // Additional Financial
];

export const SECTOR_CLASSIFICATION: Record<string, string> = {
    // IT
    "TCS.NS": "IT Services", "INFY.NS": "IT Services", "HCLTECH.NS": "IT Services",
    "TECHM.NS": "IT Services", "WIPRO.NS": "IT Services",

    // Financial Services
    "HDFCBANK.NS": "Financial Services", "ICICIBANK.NS": "Financial Services",
    "SBIN.NS": "Financial Services", "BAJFINANCE.NS": "Financial Services",
    "BAJAJFINSV.NS": "Financial Services", "KOTAKBANK.NS": "Financial Services",
    "HDFCLIFE.NS": "Financial Services", "SBILIFE.NS": "Financial Services",
    "INDUSINDBK.NS": "Financial Services", "LICI.NS": "Financial Services",
    "MUTHOOTFIN.NS": "Financial Services", "CHOLAFIN.NS": "Financial Services",

    // Energy & Power
    "RELIANCE.NS": "Energy & Oil", "ONGC.NS": "Energy & Oil",
    "POWERGRID.NS": "Power & Energy", "NTPC.NS": "Power & Energy",

    // Auto
    "MARUTI.NS": "Automobile", "TATAMOTORS.NS": "Automobile", "M&M.NS": "Automobile",
    "BAJAJ-AUTO.NS": "Automobile", "EICHERMOT.NS": "Automobile",
    "HEROMOTOCO.NS": "Automobile", "TVSMOTOR.NS": "Automobile", "ASHOKLEY.NS": "Automobile",
    "BOSCHLTD.NS": "Auto Ancillary",

    // FMCG & Consumer
    "ITC.NS": "FMCG", "HINDUNILVR.NS": "FMCG", "BRITANNIA.NS": "FMCG", "TATACONSUM.NS": "FMCG",
    "AWL.NS": "FMCG", "PATANJALI.NS": "FMCG",
    "TITAN.NS": "Consumer Durables", "ASIANPAINT.NS": "Consumer Durables",
    "DMART.NS": "Retail & Consumer", "TRENT.NS": "Retail & Consumer",
    "VBL.NS": "Retail & Consumer", "PAGEIND.NS": "Retail & Consumer",

    // Construction, Infra, Real Estate
    "LT.NS": "Construction & Engineering", "ULTRACEMCO.NS": "Construction & Engineering",
    "GRASIM.NS": "Construction & Engineering", "ADANIPORTS.NS": "Infrastructure",
    "DLF.NS": "Real Estate", "GODREJPROP.NS": "Real Estate",
    "OBEROIRLTY.NS": "Real Estate", "MACROTECH.NS": "Real Estate",

    // Metals & Mining
    "TATASTEEL.NS": "Metals & Mining", "ADANIENT.NS": "Metals & Mining",
    "COALINDIA.NS": "Metals & Mining", "HINDALCO.NS": "Metals & Mining",

    // Healthcare
    "SUNPHARMA.NS": "Healthcare & Pharma", "DIVISLAB.NS": "Healthcare & Pharma",
    "DRREDDY.NS": "Healthcare & Pharma", "APOLLOHOSP.NS": "Healthcare & Pharma",
    "CIPLA.NS": "Healthcare & Pharma",

    // Telecommunication
    "BHARTIARTL.NS": "Telecommunication",

    // Chemicals
    "UPL.NS": "Chemicals",

    // Defense
    "HAL.NS": "Defense & Aerospace", "BEL.NS": "Defense & Aerospace",
    "BDL.NS": "Defense & Aerospace", "MAZDOCK.NS": "Defense & Aerospace",

    // New Age Tech
    "ZOMATO.NS": "New Age Tech", "PAYTM.NS": "New Age Tech",
    "NYKAA.NS": "New Age Tech", "DELHIVERY.NS": "New Age Tech",

    // Railways
    "IRCTC.NS": "Railways", "RVNL.NS": "Railways", "IRFC.NS": "Railways", "CONCOR.NS": "Railways"
};
