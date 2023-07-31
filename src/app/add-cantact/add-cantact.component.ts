import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    firstname: ['',Validators.compose([Validators.minLength(3),Validators.maxLength(50),Validators.required])],
    lastname: ['',Validators.compose([Validators.minLength(3),Validators.maxLength(50),Validators.required])],
    gender: ['',Validators.compose([Validators.minLength(1),Validators.maxLength(1)])],
    email: ['',Validators.compose([Validators.minLength(6),Validators.maxLength(45),Validators.email,Validators.required])],
    age: ['',Validators.compose([Validators.required,Validators.minLength(1)])],
    id: [0],
  });

  newContact: any[] = [];
  updatesContact: Contacts[] = [];
  updateState: boolean = false;
  updateSuccess: boolean = false;
  updateText: string = '';
  formStatus: boolean = false;

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
    }else if(this.form.status === "INVALID"){
      setTimeout(() => {
        this.formStatus = true;
      },1000);
      setTimeout(() => {
        this.formStatus = false;
      },12000);
    }
  }

  update(form: any) {
    const contactId = this.activatedRoute.snapshot.paramMap.get('id');
    if (Number(contactId) === form.value.id) {
      if (form.status === 'VALID') {
        this.dataFacadeService.updataContact(Number(contactId), form.value);
        this.dataFacadeService.updateContact$
          .pipe(takeUntil(this.subscribtion$))
          .subscribe();
        this.updateText = 'Änderung erfolgreich gespeichert !';
        this.updateSuccess = true;
      } else {
        this.updateSuccess = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscribtion$.next(false);
    this.subscribtion$.complete();
  }
}
