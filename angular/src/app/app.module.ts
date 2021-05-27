import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { PlayerComponent } from './player/player.component';
import { ItemComponent } from './item/item.component';
import { HomeComponent } from './home/home.component';
import { PlayerinfoComponent } from './playerinfo/playerinfo.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { ClanComponent } from './clan/clan.component';
import { IteminfoComponent } from './iteminfo/iteminfo.component';
import { InformationComponent } from './information/information.component';
import { ClaninfoComponent } from './claninfo/claninfo.component';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';




@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ItemComponent,
    PlayerinfoComponent,
    ExchangeComponent,
    ClanComponent,
    IteminfoComponent,
    InformationComponent,
    ClaninfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    RouterModule.forRoot([
      {path: "player", component:PlayerComponent},
      {path: "item", component:ItemComponent},
      {path: "info", component:InformationComponent},
      {path: "exchange", component:ExchangeComponent},
      {path: "clan", component:ClanComponent},
      {path: "**", component:HomeComponent}
    ], {useHash: true})
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('229121307249-lpklj8gnlhev8ekut94la7u071shar1b.apps.googleusercontent.com')
          }
        ]
    } as SocialAuthServiceConfig,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
