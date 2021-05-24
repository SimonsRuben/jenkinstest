import { Component, OnInit } from '@angular/core';
import { ApiService, Iexchange, Iitem, Iplayer } from '../Services/api.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  constructor(private api : ApiService) { }

  allexchanges : Iexchange[] = null;

  selected : Iexchange = null;

  page : number = 0;

  activeplayer : Iplayer = null;
  activeitems : Iitem[] = null;

  selecteditem : Iitem = null;

  errormsg : string = "";

  ngOnInit(): void {
    this.getallexhanges();
  }
  selectitem(id : number)
  {
    console.log(id);
    for (let i = 0; i < this.activeitems.length; i++) {
      if (this.activeitems[i].id == id) {
        this.selecteditem = this.activeitems[i];
        
      }
      
    }
  }

  setactive(id : number)
  {
    console.log(id)
    this.api.getPlayerbyId(id).subscribe(d => {

     
      this.activeplayer = d;
      this.activeitems = this.activeplayer.playerInventory.items;
      console.log(this.activeitems);
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });
    //request player
  }


  getallexhanges()
  {
    this.api.getAllExhanges(this.page).subscribe(d => {
      this.allexchanges = d;
      this.errormsg = ""
    }, error =>{
      this.errormsg = "Cant connect to the API. Try again later";
    });
    
  }
  

  makeexchange(gold:string)
  {
    
    console.log(this.selecteditem.name + gold);

    this.api.addExchange(this.activeplayer,this.selecteditem,parseInt(gold)).subscribe(d => {
      console.log(d);
      this.getallexhanges();
      this.errormsg = ""
    }, error =>{
      console.log(error.error);
      
      this.errormsg = error.error;
    });
  }
  delexchange(id : number)
  { 
    console.log(id);
    this.api.deleteExchange(id,this.activeplayer.id).subscribe(d => {
      console.log(d)
      this.getallexhanges();
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;


    });
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
    this.getallexhanges();
  }



}
