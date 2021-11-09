import { Component, VERSION, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ad } from './models/ad';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tracker';
  search = '';
  
  public adding = false;
  public editing = false;
  public editingIndex!: number;
  public latest_date: any

  public adForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl(''),
    date: new FormControl('')
  });


  constructor(public datepipe: DatePipe) {
    
  }
  // myFunction(){
  //   this.data=new Date();
  //   return this.latest_date =this.datepipe.transform(this.data, 'yyyy-MM-dd');

  //  }
  ngOnInit() {
    
    // let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    
    // console.log(currentDateTime);
  }
  
  public ads: Ad[] = [];

  public onSubmit() {
    const ad = this.adForm.value as Ad;
    ad.date = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss')
    if (this.editing) {
      this.ads.splice(this.editingIndex, 1, ad);
    } else {
      this.ads.push(ad);
    }
    this.editing = false;
    this.adding = false;
    this.exitForm();
  }

  public setEditForm(ad: Ad, index: number) {
    this.adForm.patchValue({
      name: ad.name,
      // frequency: ad.frequency,
      description: ad.description,
      date: ad.date,
    });
    this.editing = true;
    this.editingIndex = index;
  }

  public onDelete(index: number) {
    this.ads.splice(index, 1);
  }

  exitForm() {
    this.adding = false;
    this.editing = false;
    this.adForm.reset();
  }

}


