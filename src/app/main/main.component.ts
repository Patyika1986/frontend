import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataFacadeService } from '../data-facade.service';
import { Subject, takeUntil } from 'rxjs';
import { Contacts } from '../contact';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(private dataFacadeService: DataFacadeService) {}

  subscribtion$ = new Subject();
  contacts: Contacts[] = [];
  filterItems: string[] = ['-- Filter --', 'Weiblich', 'Maennlich'];
  ledies: Contacts[] = [];
  mens: Contacts[] = [];

  ngOnInit(): void {
    this.loadAllContacts();
    this.filterSearch();
  }

  loadAllContacts() {
    this.dataFacadeService.allContacts();
    this.dataFacadeService.contacts$
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((users) => {
        this.contacts = [];
        users.map((data) => {
          this.contacts.push(data);
        });
      });
  }

  filterSearch() {
    this.dataFacadeService.allContacts();
    this.dataFacadeService.contacts$
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((users) => {
        const result1 = users.filter((contact) => contact.gender === 'W');
        this.ledies = result1;
        const result2 = users.filter((contact) => contact.gender === 'M');
        this.mens = result2;
      });
  }

  filter(event: any) {
    switch (event.target.value) {
      case 'Weiblich':
        this.contacts = [...this.ledies];
        break;
      case 'Maennlich':
        this.contacts = [...this.mens];
        break;
      default:
        this.loadAllContacts();

        break;
    }
  }

  ngOnDestroy(): void {
    this.subscribtion$.next(false);
    this.subscribtion$.complete();
  }
}
