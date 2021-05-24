import { Component, OnInit } from '@angular/core';
import { ApiService, Iclan, Iplayer } from '../Services/api.service';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.component.html',
  styleUrls: ['./clan.component.css']
})
export class ClanComponent implements OnInit {

  constructor(private api :ApiService) { }
  page : number = 0;

  clans : Iclan[]

  selected : Iclan = null
  players : Iplayer[]
  errormsg : string = "";
  pl : Iplayer = null

  ngOnInit(): void {
    this.getallclans();
    this.api.getAllPlayer(this.page).subscribe(d => {
      this.players = d;
      this.errormsg = ""
    }, error =>{
      this.errormsg = "Cant connect to the API. Try again later";
    });



  }
  getallclans()
  {
    this.api.getAllclans(this.page).subscribe(d => {
      this.clans = d;
      this.errormsg = ""
    }, error =>{
      this.errormsg = "Cant connect to the API. Try again later";
    });
    if (this.pl != null) {
      this.selectedplayer(this.pl.id);
    }




  }
  paging(p : number)
  {
    switch (p) {
      case 0:
        this.page = 0;
        break;

      case 1:
        if (this.page > 0 ) {
          this.page--;
          
        }
        break;

      case 2:
        if (true) {
          this.page++; //checken 
        }
        break;

      case 3:
        //this.page == pages.count -1

        
        break;
    
      default:
        break;
    }
    console.log(this.page)
    this.getallclans();
  }
  selectclan(id : number)
  {
    for (let i = 0; i < this.clans.length; i++) {
      if (id == this.clans[i].id) {
        this.selected = this.clans[i];
        break;
        
      }
      
    }

  }
  delclan(id :number)
  {
    this.api.deleteclan(id).subscribe(d => {
      console.log(d)
      this.getallclans();
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });
  }
  updateclan(name : string,des : string)
  {
    this.selected.clanName = name;
    this.selected.description = des;
    this.api.updateclan(this.selected).subscribe(d => {
      console.log(d);

      this.getallclans();
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });
  }
  makeclan(name: string,des :string)
  {
    this.api.addclan(name,des).subscribe(d => {
      console.log(d);
      this.getallclans();
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });

  }
  selectedplayer(id :number){
    
    if (id != null) {
      this.api.getPlayerbyId(id).subscribe(d => {
        this.pl = d;
        this.errormsg = ""
      }, error =>{
        this.errormsg = error.error;
      });
    }
    else{
      this.pl = null;
    }

  }
  addplayertoclan(id :number)
  {
    var tempclan = null;
    for (let i = 0; i < this.clans.length; i++) {
      if (id == this.clans[i].id) {
        tempclan = this.clans[i];
        break;
      }
      
    }
    if (tempclan != null && this.pl != null) {
      this.api.addpltoclan(tempclan,this.pl).subscribe(d => {
        this.getallclans();
        this.errormsg = ""
      }, error =>{
        this.errormsg = error.error;
      });
    }
  }
  delplayerofclan(id :number)
  {
    var tempclan = null;
    for (let i = 0; i < this.clans.length; i++) {
      if (id == this.clans[i].id) {
        tempclan = this.clans[i];
        break;
      }
      
    }
    if (tempclan != null && this.pl != null) {
      this.api.delplclan(tempclan,this.pl).subscribe(d => {
        this.getallclans();
        this.errormsg = ""
      }, error =>{
        this.errormsg = error.error;
      });
    }
  }


  inclan(id :number)
  {
    if (this.pl == null) {
      return false;
    }
    for (let i = 0; i < this.pl.clans.length; i++) {
      if (id == this.pl.clans[i].id) {
        return true;
      }
      
    }
    return false;
  }

}
