import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriePage } from './categorie';
import { SearchBarModule } from '../../components/search-bar/Search-bar.module';
import { FilterModule } from '../../components/filter/filter.module';
import { CategorieItemsModule } from '../../components/categori-items/CategorieItem.module';
import { CategoryItemsModule } from '../../components/category-item/Category-Item.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { MenuCartModule } from '../../components/menu-cart/menu-cart.module';
import { HeaderModule } from '../../components/header/header.module';
import { ManufacModule } from '../../components/manufac-items/manufac.module';

@NgModule({
  declarations: [
    CategoriePage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriePage),
    SearchBarModule,
    FilterModule,
    CategorieItemsModule,
    MenuCartModule,
    HeaderModule,
    LoaderModule,
    CategoryItemsModule,
    ManufacModule,
  ],
})
export class CategoriePageModule {}
