import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';

@Component({
  selector: 'app-invite-page',
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.css']
})
export class InvitePageComponent implements OnInit {

    reference: string = "";
    constructor(
        private memberDataManager: AccountDataManagerService
    ) { }

    ngOnInit(): void {
        this.memberDataManager.getMemberSubject()
        .subscribe(
            (data) => {
                if(data != null)
                this.reference = data.reference;
            }
        )
    }

}
