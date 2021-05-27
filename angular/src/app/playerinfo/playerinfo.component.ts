import { Component, OnInit } from '@angular/core';
import { ApiService, Iclan, Iitem, Iplayer } from '../Services/api.service';


@Component({
  selector: 'app-playerinfo',
  templateUrl: './playerinfo.component.html',
  styleUrls: ['./playerinfo.component.css']
})
export class PlayerinfoComponent implements OnInit {

  constructor(private api : ApiService) { }

  selectedPlayer : Iplayer = null
  itemlist :Iitem[] = null
  clanlist : Iclan[] = null
  errormsg : string = "";


  ngOnInit(): void {
  }
  getplayer(id :number)
  {
    this.api.getPlayerbyId(id).subscribe(d => {

     
      this.selectedPlayer = d;
      this.itemlist = this.selectedPlayer.playerInventory.items;
      this.clanlist = this.selectedPlayer.clans;
      
      this.errormsg = ""
    }, error =>{
      
      this.errormsg = error.error;
      if (error.status == "0") {
        this.errormsg = "Try logging in at the home page";
        
      }


    });

    
  }

}
