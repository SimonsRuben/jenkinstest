
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService,Iitem, Iplayer } from '../Services/api.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private api : ApiService) { }
  allitems : Iitem[] = null;

  selected : Iitem = null;

  page : number = 0;
  players : Iplayer[] = null;
  playerchoice : Iplayer = null;

  tempname : string = "";
  tempdesc : string ="";
  errormsg : string = "";
  sortby : string ="id";

  ngOnInit(): void {
    this.getallItems();
    this.api.getAllPlayer(this.page).subscribe(d => {
      this.players = d;
      this.errormsg = ""
    }, error =>{
      this.errormsg = "Cant connect to the API. Try again later";
    });

  }

  sorting(sort : string)
  {
    this.sortby = sort;
    this.getallItems();

  }

  querysearch(n: string,d: string)
  {
    this.api.getAllItems(this.page,this.sortby,n,d).subscribe(d => {
      this.allitems = d;
      this.errormsg = ""
    }, error =>{
      this.errormsg = "Cant connect to the API. Try again later";
    });
  }
  selectedplayer(id :number){
    if (id != null) {
      for (let o = 0; o < this.players.length; o++) {
        if (this.players[o].id == id) {
          this.playerchoice = this.players[o];
          break;
          
        }
        
      }
    }
    else{
      this.playerchoice = null;
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
    this.getallItems();
  }

  


  getallItems()
  {
    this.api.getAllItems(this.page,this.sortby).subscribe(d => {
      this.allitems = d;
      this.errormsg = ""
    }, error =>{
      this.errormsg = "Cant connect to the API. Try again later";
    });
    
  }



  makeItem()
  {
    
    var item : Iitem = {
      id : -1,
      name : this.tempname,
      description :this.tempdesc
    };

    this.api.additem(item).subscribe(d => {
      item = d;
      this.getallItems();
      if (this.playerchoice != null) {
        //add item to player
        this.api.additemtoinventory(this.playerchoice,item).subscribe(d => {
          console.log(d);

          this.errormsg = ""
        }, error =>{
          this.errormsg = error.error;
        });
      }
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });
    

    
  }

  selectitem(id : number)
  {
    this.api.specitem(id).subscribe(d => {
      console.log(d)
      this.selected = d;
    });

  }
  updateItem(name: string, des:string)
  {
    this.selected.name = name;
    this.selected.description = des;
    this.api.updateitem(this.selected).subscribe(d => {
      console.log(d);
      this.getallItems();
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });
  }
  delitem(id : number)
  {
    this.api.deleteitem(id).subscribe(d => {
      console.log(d)
      this.getallItems();
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });

  }

  getexample()
  {
    var id = Math.floor(Math.random()*400);
    this.api.exrandomitem(id).subscribe(d => {
      console.log(d)
      this.tempname = d._items[0].name;
      this.tempdesc = d._items[0].examine;
      console.log(this.tempdesc);
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });

  }




}



//voor voorbeeld item gebruik deze api call
/*
en gebruik een random voor de page parameter om een random item terug te krijgen.


https://api.osrsbox.com/weapons?where={%20%22tradeable_on_ge%22:%20true}&max_results=1&page=2


*/