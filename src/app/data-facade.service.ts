import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DataService } from './data.service';
import { Contacts } from './contact';

@Injectable({
  providedIn: 'root',
})
export class DataFacadeService {
  private _contacts$ = new BehaviorSubject<Contacts[]>([]);
  public contacts$: Observable<Contacts[]> = this._contacts$.asObservable();

  private _removeContact$ = new BehaviorSubject<Contacts[]>([]);
  public removeContact$: Observable<Contacts[]> =
    this._removeContact$.asObservable();

  private _addNewContact$ = new BehaviorSubject<Contacts[]>([]);
  public addNewContact$: Observable<Contacts[]> =
    this._addNewContact$.asObservable();

  private _updateContact$ = new BehaviorSubject<any>([]);
  public updateContact$: Observable<any> = this._updateContact$.asObservable();

  public id = signal(0);

  constructor(private dataService: DataService) {}

  subscribtion$ = new Subject();

  allContacts(): void {
    this.dataService
      .getAllContacts()
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((employees: Contacts[]) => {
        this._contacts$.next(employees);
      });
  }

  addContact(contact: Contacts[]) {
    this.dataService
      .addNewContact(contact)
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((cont: Contacts[]) => {
        this._addNewContact$.next(cont);
      });
  }

  updataContact(id: number, contact: any) {
    this.dataService
      .updateContact(id, contact)
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((cont: any) => {
        this._updateContact$.next(cont);
      });
  }

  deleteContact(id: number): void {
    this.dataService
      .removeContact(id)
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((user) => {
        this._removeContact$.next(user);
      });
  }
}
