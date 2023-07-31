import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataFacadeService } from '../data-facade.service';
import { Subject, takeUntil } from 'rxjs';
import { Contacts } from '../contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-one-user',
  templateUrl: './get-one-user.component.html',
  styleUrls: ['./get-one-user.component.scss'],
})
export class GetOneUserComponent implements OnInit, OnDestroy {
  constructor(private dataFacadeService: DataFacadeService, private router: Router) {}

  subscribtion$ = new Subject();
  search: any;
  contact: Contacts[] = [];

  ngOnInit(): void {}

  searchContact($event: any) {
    this.dataFacadeService.allContacts();
    this.dataFacadeService.contacts$
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((contact) => {
        const search = contact.filter((e) => {
          return e.lastname.toLocaleLowerCase().includes($event);
        });
        if (search) {
          this.contact = [];
          this.contact = search;
        }
      });
  }

  updateContact(id:number){
    const contact = this.contact.find(con => con.id === id);
    if(contact){
      this.router.navigate(['add-contact',contact.id]);
    }
  }

  deleteUserFromData(id: number) {
    const result = this.contact.find((con) => con.id === id);
    if (result) {
      this.dataFacadeService.removeContact$
        .pipe(takeUntil(this.subscribtion$))
        .subscribe((users) => {
          this.dataFacadeService.deleteContact(id);
        });
      const index = this.contact.indexOf(result);
      this.contact.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.subscribtion$.next(false);
    this.subscribtion$.complete();
  }
}
