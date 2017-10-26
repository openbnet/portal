/**
 * Created by istrauss on 8/4/2017.
 */

import moment from 'moment-timezone';

export class TradingviewPriceChartSymbolInfo {

    type = 'bitcoin';
    session = '24x7';
    exchange = 'Stellar';
    listed_exchange = 'Stellar';
    timezone = moment.tz.guess();
    minmov = 1;
    pricescale = 1000000;
    fractional = false;
    minmove2 = 0;
    has_intraday = true;
    has_seconds = false;
    has_daily = true;
    has_weekly_and_monthly = true;
    has_empty_bars = true;
    force_session_rebuild = false;
    has_no_volume = false;
    volume_precision = 7;
    data_status = 'streaming';
    expired = false;

    constructor(ticker) {
        this.ticker = ticker;
    }

    get name() {
        const splitTicker = this.ticker.split('_');
        return splitTicker[0] + '/' + splitTicker[2];
    }

    get full_name() {
        return this.name;
    }

    get description() {
        return this.full_name;
    }

    get assetPair() {
        const splitTicker = this.ticker.split('_');
        return {
            buying: {
                code: splitTicker[0],
                issuer: splitTicker[1]
            },
            selling: {
                code: splitTicker[2],
                issuer: splitTicker[3]
            }
        };
    }
}