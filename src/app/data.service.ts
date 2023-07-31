import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Contacts } from './contact';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getAllContacts():Observable<Contacts[]>{
     const data = this.http.get<Contacts[]>("http://localhost:5000/api/contact");
     return data;
  }

  addNewContact(contact:Contacts[]):Observable<Contacts[]>{
    return this.http.post<Contacts[]>(`http://localhost:5000/api/contact`,contact);
  }

  updateContact(id:number,contact:any):Observable<any>{
    console.log(id,contact,'server');
    
    return this.http.put<any>(`http://localhost:5000/api/contact/${id}`,contact);
  }

  removeContact(id:number):Observable<Contacts[]>{
    return this.http.delete<Contacts[]>(`http://localhost:5000/api/contact/${id}`);
  }
}
