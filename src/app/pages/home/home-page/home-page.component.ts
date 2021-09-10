import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit {
    isAuth: boolean = false;

    constructor(
        private memberDataManager: AccountDataManagerService,
    ) { 
        //Subscribe to member data and get
        //the amount
        this.memberDataManager.getMemberSubject()
        .subscribe(
            (data) => {
            //Check the member is not nulll
            if(data != null){
                //then set the amount value
                this.isAuth = true;
            }
            }
        )
    }
    ngAfterViewInit(): void {
        var mybutton = document.getElementById("myBtn");
        var homeMenu = document.getElementById("home-menu");
        var menuLinks = document.querySelectorAll(".link-data-item a");
        console.log(homeMenu);
        console.log(menuLinks)

        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function() {scrollFunction()};

        function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            homeMenu.classList.add("home-menu-active");
            menuLinks.forEach(element => {
                element.classList.add('link-data-item-active')
            });
        } else {
            homeMenu.classList.remove("home-menu-active");
            menuLinks.forEach(element => {
                element.classList.remove('link-data-item-active')
            });
        }
        }

        // When the user clicks on the button, scroll to the top of the document
        function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        }
    }

    ngOnInit(): void {
    }

}
