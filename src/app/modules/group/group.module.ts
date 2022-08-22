import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {GroupHomeComponent} from "./components/group-home/group-home.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../common-modules/shared.module";
import { CreateJoinModalComponent } from './components/create-join-modal/create-join-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";

const routes = [
    {
        path: '',
        component: GroupHomeComponent
    }
]
@NgModule({
    declarations: [
        GroupHomeComponent,
        CreateJoinModalComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        AngularMultiSelectModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        RouterModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents:[
        CreateJoinModalComponent,
    ]
})
export class GroupModule {

}
