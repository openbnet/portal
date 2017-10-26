/**
 * Created by istrauss on 9/18/2017.
 */

import {UPDATE_ASSET_PAIR} from '../../../exchange-action-types';
import {detailActionTypes} from '../detail-action-types';
import {isNewAssetPair} from './helpers';

const {UPDATE_MY_ASSET_PAIR} = detailActionTypes;

export function myAssetPair(state, action, rootState) {
    switch (action.type) {
        case UPDATE_MY_ASSET_PAIR:
            return {
                selling: action.payload.selling || {},
                buying: action.payload.buying || {}
            };
        case UPDATE_ASSET_PAIR:
            if (!action.payload) {
                return undefined;
            }

            return isNewAssetPair(action.payload, rootState.exchange.assetPair) ? undefined : state;
        default:
            return state;
    }
}