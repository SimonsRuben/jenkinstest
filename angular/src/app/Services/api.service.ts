import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public idtoken :string = "";

  private readonly link ="http://localhost:50757/api/v1/";

  constructor(private http : HttpClient) { }

  header()
  {
    var headerDict = {
      'Authorization': 'Bearer ' + this.idtoken,
    }
    
    var requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return requestOptions;
  }
  
  //#region players api

  getAllPlayer(p : number = 0 ,s :string = "id") : Observable<Iplayer[]>{
    return this.http.get<Iplayer[]>(this.link + "player?page="+p + "&sortby="+s);
  }
  addplayer(n :string , p : string): Observable<any> {
    return this.http.post<any>(this.link +"player", {name: (n),password:(p)});
  }
  getPlayerbyId( id :number) :Observable<Iplayer>{
    return this.http.get<Iplayer>(this.link + "player/" + id,this.header());
  }

  updateplayer(p : Iplayer) : Observable<any> {
    return this.http.put<any>(this.link +"player", {id: (p.id),"name": (p.name),"password": (p.password),gold: (p.gold)});
  }
  deletePlayer(id : number) : Observable<Iplayer>{
    return this.http.delete<Iplayer>(this.link + "player/" + id);
  }





  //#endregion players api

  //#region  inventory api
  additemtoinventory(p : Iplayer , i : Iitem) : Observable<any> {
    return this.http.post<any>(this.link +"Inventory/" + p.id + "/Item/"+ i.id,{});
  }

  //#endregion inventory api




  //#region items api
  getAllItems(p :number = 0 ,s : string, n : string ="",d : string ="") : Observable<Iitem[]>{
    return this.http.get<Iitem[]>(this.link + "item?page="+p + "&sortby="+s + "&name=" + n + "&description="+d);
  }
  additem(i :Iitem): Observable<Iitem> {
    return this.http.post<Iitem>(this.link +"item", {name: (i.name),description:(i.description)});
  }

  specitem(id : number): Observable<Iitem>{
    return this.http.get<Iitem>(this.link + "item/" + id,this.header());
  }
  updateitem(i : Iitem) : Observable<any> {
    return this.http.put<any>(this.link +"item", {id:(i.id),name: (i.name),description:(i.description)});
  }
  deleteitem(id : number) : Observable<Iitem>{
    return this.http.delete<Iitem>(this.link + "item/" + id);
  }




  //#endregion items api

  //#region exchange api
  getAllExhanges(p :number = 0) : Observable<Iexchange[]>{
    return this.http.get<Iexchange[]>(this.link + "exchange?page="+p);
  }
  addExchange(p :Iplayer, i : Iitem, g : number): Observable<any> {
    return this.http.post<any>(this.link +"exchange", {seller: (p),item: (i),cost: g});
  }

  updateExchange(e : Iexchange) : Observable<any> {
    return this.http.put<any>(this.link +"exchange", {id:(e.id),seller:(e.seller),item:(e.item),cost:(e.cost)});
  }
  deleteExchange(id : number,buy:number ) : Observable<any>{
    return this.http.delete<any>(this.link + "exchange/" + id + "/"+ buy);
  }

  //#endregion exchange api


  //#region clan api

  getAllclans(p :number = 0) : Observable<Iclan[]>{
    return this.http.get<Iclan[]>(this.link + "clan?page="+p);
  }
  addclan(n : string,d :string): Observable<Iclan> {
    return this.http.post<Iclan>(this.link +"clan", {clanName: (n),description:(d)});
  }

  infoclan(id : number): Observable<Iclan>{
    return this.http.get<Iclan>(this.link + "clan/" + id,this.header());
  }
  updateclan(c : Iclan) : Observable<any> {
    return this.http.put<any>(this.link +"clan", {id:(c.id),clanName: (c.clanName),description:(c.description)});
  }
  deleteclan(id : number) : Observable<Iclan>{
    return this.http.delete<Iclan>(this.link + "clan/" + id);
  }

  addpltoclan(cl: Iclan , pl :Iplayer) : Observable<any> {
    return this.http.post<any>(this.link +"clan/" + cl.id + "/player/"+ pl.id,{});
  }
  delplclan(cl: Iclan , pl :Iplayer) : Observable<any> {
    return this.http.delete<any>(this.link +"clan/" + cl.id + "/player/"+ pl.id);
  }





  //#endregion clan api

  //#region external api
  exiteminfo(it :string): Observable<exresponse>{
    return this.http.get<exresponse>('https://api.osrsbox.com/items?where={ "name": "'+ it + '", "duplicate": false }');
  }

  exrandomitem(id : number) : Observable<exresponse>{
    return this.http.get<exresponse>('https://api.osrsbox.com/weapons?where={%20%22tradeable_on_ge%22:%20true}&max_results=1&page=' + id);
  }
  


  //#endregion external api
}

export interface Iitem {
  id: number;
  name: string;
  description: string;
}

export interface Iinventory {
  id: number;
  items: Iitem[];
}

export interface Iplayer {
  id: number;
  name: string;
  password: string;
  gold: number;
  playerInventory: Iinventory;
  clans : Iclan[];
}

export interface Iexchange {
  id: number;
  seller: Iplayer;
  item: Iitem;
  cost: number;
}

export interface Iclan {
  id: number;
  clanName: string;
  description: string;
  members: Iplayer[];

}

export interface exItem
{
  _id: string;
  id: string;
  name: string;
  examine: string;
  wiki_name: string;
  wiki_url: string;
}

export interface exresponse {
  _items: exItem[];
  _links: Links2;
  _meta: Meta;
}
export interface Meta {
  page: number;
  max_results: number;
  total: number;
}

export interface Links2 {
  parent: Parent;
  self: Self2;
  next: Next;
  last: Last;
}

export interface Next {
  title: string;
  href: string;
}

export interface Last {
  title: string;
  href: string;
}   
export interface Parent {
  title: string;
  href: string;
}

export interface Self2 {
  title: string;
  href: string;
}