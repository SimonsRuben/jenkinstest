import { Component, OnInit } from '@angular/core';
import { ApiService, Iclan, Iplayer } from '../Services/api.service';

@Component({
  selector: 'app-claninfo',
  templateUrl: './claninfo.component.html',
  styleUrls: ['./claninfo.component.css']
})
export class ClaninfoComponent implements OnInit {

  constructor(private api : ApiService) { }
  memberslist : Iplayer[] = null
  clan : Iclan = null;
  errormsg : string = "";
  ngOnInit(): void {
  }


  getclan(id :number)
  {
    this.api.infoclan(id).subscribe(d => {
      this.clan = d;
      this.memberslist = this.clan.members;
      
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
      if (error.status == "0") {
        this.errormsg = "Try logging in at the home page";
        
      }
    });


  }

}
