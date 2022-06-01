import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.services';
import { Observable } from 'rxjs';

@Injectable()
export class AngularFirestoreStub {
    collection(someString) {
        // return mock collection;
    }
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
  ],
  providers: [{provide: AngularFirestore, useClass: AngularFirestoreStub}, 
    
  FormBuilder]
})
export class CommonServiceModuleStubModule { }
