import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SearchBarModule } from '../../components/search-bar/Search-bar.module';
import { SliderBarModule } from '../../components/sliders/Sliders.module';
import { BlocTitleModule } from '../../components/bloc-title/BlocTitle.module';
import { CategorieModule } from '../../components/categorie/Categorie.module';
import { HeaderModule } from '../../components/header/header.module';
import { PromoItemModule } from '../../components/promo-item/promoItem.module';
import { PopCategorieModule } from '../../components/pop-categorie/popCategorie.module';
import { PopProductsModule } from '../../components/pop-product/popProducts.module';
import { PushBannerModule } from '../../components/push-banner/pushBanner.module';
import { PushTwoBannerModule } from '../../components/pushTwo-banner/pushTwoBanner.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { PopMenu } from '../../components/popmenu/popmenu.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SearchBarModule,
    SliderBarModule,
    BlocTitleModule,
    CategorieModule,
    HeaderModule,
    PromoItemModule,
    PopCategorieModule,
    PopProductsModule,
    PushBannerModule,
    LoaderModule,
    PushTwoBannerModule,
    PopMenu,
  ],
})
export class HomePageModule {}
