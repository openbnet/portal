/**
 * Created by istrauss on 5/8/2017.
 */

import {inject} from 'aurelia-framework'
import {StellarServer, AppStore, ValidationManager} from 'global-resources';
import {AppActionCreators} from '../../../../../app-action-creators';
import {TrustService} from 'app-resources';

@inject(StellarServer, AppStore, ValidationManager, AppActionCreators, TrustService)
export class OfferModal {

    loading = 0;
    alertConfig = {
        type: 'info',
        dismissible: false,
        message: 'Acquiring an asset on the stellar network implies a trust in the asset issuer because the issuer is responsible for backing the asset. In other words,' +
            ' if you buy a BTC asset on the network, the BTC asset is only valuable if the issuer can be counted on to redeem your asset with real BTC.<br>' +
            '<p>Because of this, stellar requires you to explicitly declare that you trust an asset/issuer. This declaration of trust is done by setting a trust limit.' +
            ' Your asset balance cannot be greater than your trust limit.</p>' +
            '<p>To learn more about stellar assets and trust see the <a href="https://www.stellar.org/developers/guides/concepts/assets.html" target="_blank">Stellar Asset Concept Documentation</a>.</p>'
    };

    constructor(stellarServer, appStore, validationManager, appActionCreators, trustService) {
        this.stellarServer = stellarServer;
        this.appStore = appStore;
        this.validationManager = validationManager;
        this.appActionCreators = appActionCreators;
        this.trustService = trustService;
    }

    activate(params) {
        this.modalVM = params.modalVM;
        this.code = params.passedInfo.code;
        this.issuer = params.passedInfo.issuer;

        const balance = this.trustService.balance(this.code, this.issuer);
        this.limit = balance ? balance.limit : 0;
    }

    async modifyLimit() {
        if (!this.validationManager.validate()) {
            return;
        }

        this.modalVM.dismissible = false;
        this.loading++;

        this.modalVM.close([
            this.stellarServer.sdk.Operation.changeTrust({
                asset: this.code === this.nativeAssetCode ?
                    this.stellarServer.sdk.Asset.native() :
                    new this.stellarServer.sdk.Asset(this.code, this.issuer),
                limit: this.newLimit
            })
        ]);
    }

    cancel() {
        this.modalVM.dismiss();
    }
}
