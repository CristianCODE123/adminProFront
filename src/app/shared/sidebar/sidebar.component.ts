import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserService } from 'src/app/servicios/user.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('expandCollapseAnimation', [
      state('expand', style({
        'max-height': '1000px',
        'overflow-y': 'visible',
        'opacity': '1'
      })),
      state('collapse', style({
        'max-height': '0px',
        'overflow-y': 'hidden',
        'opacity': '0'
      })),
      transition('expand <=> collapse', animate('500ms ease-in-out'))
    ])
  ]
})
export class SidebarComponent implements OnInit{
  userName:any

  constructor(private us: UserService){

  }
  getUserRoute(){
    console.log(this.us.getUsername())
    return this.us.getUsername();
  }

  ngOnInit(): void {
    this.userName = this.us.getCurrentUserName().username;
    console.log(this.userName)
  }
  @ViewChild('navList', {static: false}) navList: ElementRef | undefined;

  expandCollapse(event:any){
    const element = event.currentTarget.nextElementSibling;
    element.classList.toggle('collapse');
    element.classList.toggle('expand');
  }
  
  // ngOnInit() {


    
  //   $(function() {
  //     $('[data-toggle="tooltip"]').tooltip();
  // }), $(function() {
  //     $('[data-toggle="popover"]').popover();
  // }), $(function() {
  //     $("#sidebarnav").AdminMenu();
  // }), $(".scroll-sidebar, .right-side-panel, .message-center, .right-sidebar").perfectScrollbar()
  // }
}
