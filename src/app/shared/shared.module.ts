import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PodcastComponent } from './podcast/podcast.component';
import { DetailPodcastComponent } from './detail-podcast/detail-podcast.component';

@NgModule({
    declarations: [
        HeaderComponent,
        DetailPodcastComponent,
        PodcastComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule

    ],
    exports: [
        HeaderComponent,
        DetailPodcastComponent,
        PodcastComponent
    ],
    entryComponents: [PodcastComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class SharedModule { }