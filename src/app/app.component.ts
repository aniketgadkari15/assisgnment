import { Component } from '@angular/core';
import { FormGroup, FormBuilder , Validators  ,FormControl } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  emailsArr =[];
  emails =[];
  errors="";
  enableClass="disable";
  updateEmails = new FormGroup({
    emailAddress: new FormControl('')
  });

  searchEmail = new FormGroup({
    searchField: new FormControl('')
  });
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() { 
    this.updateEmails = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
    })

    this.searchEmail = this.formBuilder.group({
      searchField: ['', [Validators.required]],
    })

    }
   
   searchEmails=()=>{
     if(this.searchEmail.invalid){
       return
     }
    const emailSearch = this.searchEmail.value.searchField.trim()
    this.emails = this.emails.filter(function(email) {
      if(email.email==emailSearch){
        return email;
      } 
      });
  }
  addEmail=()=>{
    this.errors = "";
    if (this.updateEmails.invalid) {
      this.errors = "Invalid Email"
      return;
  }

  if(this.emailsArr.find(ele=>ele.email==this.updateEmails.value.emailAddress)){
    this.errors = "Email already exists"
    return
  }
    let obj = {enable:0,email:this.updateEmails.value.emailAddress}
    this.emailsArr.push(obj)
    this.emails = [...this.emailsArr]
    this.updateEmails.reset();
    }

    deleteEmail=(index)=>{
    this.emails.splice(index,1)
    this.emailsArr = this.emails
    }

    enableEmail=(index,event)=>{
      if(event.target.checked){
        this.emails[index]['enable'] = 1;
        this.enableClass = "enable";
      } else {
        this.emails[index]['enable'] = 0;
        this.enableClass = "disable";
      }
      
    }

    toggleEmails=(event)=>{
      if(event.target.checked){
       this.emails = this.emails.filter(function(email) {
        if(email.enable==1){
          return email;
        } 
        });
      } else {
          this.emails = [...this.emailsArr];
      }
    }

    clearResults=(event)=>{
      if(!event.target.value){
        this.emails = [...this.emailsArr];
    }
  }
    
 
}




