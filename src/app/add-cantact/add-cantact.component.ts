import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataFacadeService } from '../data-facade.service';
import { Contacts } from '../contact';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-cantact',
  templateUrl: './add-cantact.component.html',
  styleUrls: ['./add-cantact.component.scss'],
})
export class AddCantactComponent implements OnInit, OnDestroy {
  constructor(
    private formbuilder: FormBuilder,
    private dataFacadeService: DataFacadeService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  private subscribtion$ = new Subject();

  public form = this.formbuilder.group({
    firstname: [''],
    lastname: [''],
    gender: [''],
    email: [''],
    age: [''],
    id: [0],
  });

  newContact: any[] = [];
  updatesContact: Contacts[] = [];
  updateState: boolean = false;
  updateSuccess: boolean = false;
  updateText:string = '';

  ngOnInit(): void {
    const contactId = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataFacadeService.allContacts();
    this.dataFacadeService.contacts$
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((contacts) => {
        const result = contacts.find((cont) => cont.id === Number(contactId));

        if (result) {
          this.form.controls.firstname.setValue(result.firstname);
          this.form.controls.lastname.setValue(result.lastname);
          this.form.controls.gender.setValue(result.gender);
          this.form.controls.email.setValue(result.email);
          this.form.controls.age.setValue(result.age);
          this.form.controls.id.setValue(Number(contactId));
        }
      });

    if (contactId) {
      this.updateState = true;
    } else {
      this.updateState = false;
    }
  }

  addContact() {
    const min = 0;
    const max = 10000;
    const randomId = Math.floor(Math.random() * (max - min) + min);
    this.form.value.id = randomId;
    this.newContact.push(this.form.value);
    if (this.form.status === 'VALID') {
      this.dataFacadeService.addContact(this.newContact);
      this.dataFacadeService.addNewContact$
        .pipe(takeUntil(this.subscribtion$))
        .subscribe((contact) => {});
        this.updateText = 'Hinzufügen war erfolgreich !';
        this.updateSuccess = true;

    }
  }

  update(form:any) {
    const contactId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(contactId,'param id');
    console.log(form.value,'form');
    if(Number(contactId) === form.value.id){
      if(form.status === "VALID"){
        this.dataFacadeService.updataContact(Number(contactId),form.value);
        this.dataFacadeService.updateContact$.pipe(takeUntil(this.subscribtion$)).subscribe();
        this.updateText = 'Änderung erfolgreich gespeichert !';
        this.updateSuccess = true;
      }else{
        this.updateSuccess = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscribtion$.next(false);
    this.subscribtion$.complete();
  }
}
