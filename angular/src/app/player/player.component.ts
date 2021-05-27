import { Component, OnInit } from '@angular/core';
import { ApiService, Iplayer } from '../Services/api.service';



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private api : ApiService) { }

  allplayers : Iplayer[] = null;
  selected : Iplayer = null;
  errormsg : string = "";

  page : number = 0;

  sortby : string = "id";

  ngOnInit(): void {
    this.getallplayers();
    
    
  }
  sorting(sort : string)
  {
    this.sortby = sort;
    this.getallplayers();
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
    this.getallplayers();
  }

  getallplayers()
  {
    this.api.getAllPlayer(this.page,this.sortby).subscribe(d => {
      this.allplayers = d;
      console.log(d);
      this.errormsg = ""
    }, error =>{
      this.errormsg = "Cant connect to the API. Try again later";
    });
  }



  makePlayer(name: string, pass:string)
  {
    
    console.log(name + pass);

    this.api.addplayer(name,pass).subscribe(d => {
      console.log(d);
      this.getallplayers();
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });

    
  }
  selectplayer(id : number)
  {
    for (let i = 0; i < this.allplayers.length; i++) {
      if (id == this.allplayers[i].id) {
        this.selected = this.allplayers[i];
        
      }
      
    }

  }
  updateplayer(name: string, pass:string,gold : number)
  {
    this.selected.name = name;
    this.selected.password = pass;
    this.selected.gold = parseInt(gold.toString());
    console.log(this.selected);
    this.api.updateplayer(this.selected).subscribe(d => {
      console.log(d);

      this.getallplayers();
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });
  }
  delplayer(id : number)
  {
    this.api.deletePlayer(id).subscribe(d => {
      console.log(d)
      this.getallplayers();
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });

  }

}
