import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Yaatoo } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

//************ Import pages *************/
import { ListPage } from '../pages/list/list';
//************** End pages ***************/

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategorieProvider } from '../providers/categorie/categorie';
import { ProductProvider } from '../providers/product/product';
import { LoginProvider } from '../providers/login/login';
import { RegistrationProvider } from '../providers/registration/registration';
import { SliderProvider } from '../providers/slider/slider';
import { PopularproductProvider } from '../providers/popularproduct/popularproduct';
import { PopularcategorieProvider } from '../providers/popularcategorie/popularcategorie';
import { PromobanertopProvider } from '../providers/promobanertop/promobanertop';
import { Promo2banertopProvider } from '../providers/promo2banertop/promo2banertop';
import { WeekdealsProvider } from '../providers/weekdeals/weekdeals';
import { SerchboxProvider } from '../providers/serchbox/serchbox';
import { AddtocartProvider } from '../providers/addtocart/addtocart';
import { CartproductsProvider } from '../providers/cartproducts/cartproducts';
import { GetordersProvider } from '../providers/getorders/getorders';
import { CartprodsProvider } from '../providers/cartprods/cartprods';
import { GetcartproductProvider } from '../providers/getcartproduct/getcartproduct';
import { UpdateproductProvider } from '../providers/updateproduct/updateproduct';
import { RemoveproductProvider } from '../providers/removeproduct/removeproduct';
import { DeliveryaddressProvider } from '../providers/deliveryaddress/deliveryaddress';
import { DeliverydateProvider } from '../providers/deliverydate/deliverydate';
import { ConfirmorderProvider } from '../providers/confirmorder/confirmorder';
import { UpdatecartProvider } from '../providers/updatecart/updatecart';
import { GetshopProvider } from '../providers/getshop/getshop';
import { GetcarrierProvider } from '../providers/getcarrier/getcarrier';
import { DiscountProvider } from '../providers/discount/discount';
import { GetcategoryproductProvider } from '../providers/getcategoryproduct/getcategoryproduct';
import { OmProvider } from '../providers/om/om';
import { PopmenuProvider } from '../providers/popmenu/popmenu';
import { OmconfirmationProvider } from '../providers/omconfirmation/omconfirmation';
import { ShopdeliveryProvider } from '../providers/shopdelivery/shopdelivery';
import { GetPromotionProductProvider } from '../providers/get-promotion-product/get-promotion-product';
import { GetShopSlidersProvider } from '../providers/get-shop-sliders/get-shop-sliders';
import { GetSpecialShopProvider } from '../providers/get-special-shop/get-special-shop';
import { GetShopInProductsProvider } from '../providers/get-shop-in-products/get-shop-in-products';
import { GetAppVersionProvider } from '../providers/get-app-version/get-app-version';
import { PaymentPageProvider } from '../providers/payment-page/payment-page';
import { RecommandProdProvider } from '../providers/recommand-prod/recommand-prod';
import { FidelityProvider } from '../providers/fidelity/fidelity';
import { GetmanufacturersProvider } from '../providers/getmanufacturers/getmanufacturers';
import { GetSingleProductProvider } from '../providers/get-single-product/get-single-product';

// import { BaggedProvider } from '../providers/bagged/bagged';
// import { SQLite } from '@ionic-native/sqlite';
import { VerifProductProvider } from '../providers/verif-product/verif-product';
import { DeeplinkproviderProvider } from '../providers/deeplinkprovider/deeplinkprovider';
import { SearchshopinshopProvider } from '../providers/searchshopinshop/searchshopinshop';

@NgModule({
  declarations: [
    Yaatoo,
    // HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    IonicModule.forRoot(Yaatoo, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      links: [
        { component: 'ProductPage', name: 'ProductPage', segment: 'ProductPage/:id_product' },
        { component: 'CategoriePage', name: 'CategoriePage', segment: 'ProductPage/:id_category' }
      ]
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Yaatoo,
    // HomePage,
    ListPage,
  ],
  providers: [
    // SQLite,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CategorieProvider,
    ProductProvider,
    LoginProvider,
    NativeStorage,
    SpeechRecognition,
    RegistrationProvider,
    SliderProvider,
    PopularproductProvider,
    PopularcategorieProvider,
    PromobanertopProvider,
    Promo2banertopProvider,
    WeekdealsProvider,
    SerchboxProvider,
    AddtocartProvider,
    CartproductsProvider,
    GetordersProvider,
    CartprodsProvider,
    GetcartproductProvider,
    UpdateproductProvider,
    RemoveproductProvider,
    DeliveryaddressProvider,
    DeliverydateProvider,
    ConfirmorderProvider,
    UpdatecartProvider,
    GetshopProvider,
    GetcarrierProvider,
    DiscountProvider,
    Network,
    GetcategoryproductProvider,
    OmProvider,
    PopmenuProvider,
    InAppBrowser,
    OmconfirmationProvider,
    SocialSharing,
    // AppVersion,
    ShopdeliveryProvider,
    ScreenOrientation,
    GetPromotionProductProvider,
    GetShopSlidersProvider,
    GetSpecialShopProvider,
    GetShopInProductsProvider,
    GetAppVersionProvider,
    PaymentPageProvider,
    RecommandProdProvider,
    FidelityProvider,
    GetmanufacturersProvider,
    VerifProductProvider,
    DeeplinkproviderProvider,
    GetSingleProductProvider,
    SearchshopinshopProvider,
    SearchshopinshopProvider,
  ]
})
export class AppModule { }
