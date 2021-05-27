import { Component, OnInit } from '@angular/core';
import { ApiService, exItem, Iitem } from '../Services/api.service';

@Component({
  selector: 'app-iteminfo',
  templateUrl: './iteminfo.component.html',
  styleUrls: ['./iteminfo.component.css']
})
export class IteminfoComponent implements OnInit {

  constructor(private api : ApiService) { }
  it : Iitem = null;

  ex : exItem = null;

  picsrc : string = null;
  errormsg : string = "";


  link : string = "https://secure.runescape.com/m=itemdb_oldschool/1619618431746_obj_big.gif?id="

  ngOnInit(): void {
    
  }

  getitem(id :number)
  {
    this.api.specitem(id).subscribe(d => {

      this.it = d;
      
      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
      if (error.status == "0") {
        this.errormsg = "Try logging in at the home page";
        
      }
    });
  }
  getexternal()
  {
    
    var text = "";
    for (let i = 0; i < this.it.name.toString().length; i++) {
      if (this.it.name[i].toString() == '+') {
        text = text + "%2B"
      }
      else{
        text = text + this.it.name[i].toString()
      }
      
    }
    console.log(this.it.name);
    
    this.api.exiteminfo(text).subscribe(d => {
      this.ex  = d._items[0];
      console.log(d);
      this.picsrc = this.link.toString() + this.ex.id.toString();

      this.errormsg = ""
    }, error =>{
      this.errormsg = error.error;
    });

  }

}

/*
voor de foto van het item te vinden gebruik volgende  link
https://secure.runescape.com/m=itemdb_oldschool/1619618431746_obj_big.gif?id=30
*/
