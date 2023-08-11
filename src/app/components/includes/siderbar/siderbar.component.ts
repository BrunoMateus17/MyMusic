import { Component, OnInit } from '@angular/core';
import { faHomeAlt,faUser,faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {
  faHomeAlt = faHomeAlt;
  faUser = faUser;
  faBook = faBook;
  ngOnInit(): void {
      
  }
}
