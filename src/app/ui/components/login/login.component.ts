import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Branch } from 'src/app/contracts/ListBranch';
import { Business } from 'src/app/contracts/ListBusiness';
import { ListCompany } from 'src/app/contracts/ListCompany';
import { Login } from 'src/app/contracts/login';
import { AuthService } from 'src/app/services/common/auth.service';
import { CompanyService } from 'src/app/services/model/company.service';

import { UserAuthService } from 'src/app/services/model/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/toastr.services/custom-toastr.service';
declare var $: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  selectedCompany: string = '';
  listCompany: ListCompany[];
  listBranch: Branch[];
  listBusiness: Business[];
  frm: UntypedFormGroup;
  loginForm: any = {
    company: '',
    branch: '',
    business: '',
    username: '',
    password: ''
  };
  constructor(private authService: AuthService, private formBuilder: UntypedFormBuilder, private userAuthService: UserAuthService, spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute, private router: Router, private companyService: CompanyService, private customToastrService: CustomToastrService) {
    super(spinner)
    this.loginForm.company = localStorage.getItem('company');
    this.loginForm.business = localStorage.getItem('business');
    this.loginForm.branch = localStorage.getItem('branch');
    this.loginForm.username = localStorage.getItem('username');
    this.loginForm.password = localStorage.getItem('password');

  }
  get component() {
    return this.frm.controls;
  }
  errorMesaj(error: string) {
    this.customToastrService.message(error, "Hata", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
  }

  async ngOnInit() {

    this.frm = this.formBuilder.group({
      company: ["", Validators.required],
      branch: ["", Validators.required],
      business: ["", Validators.required],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      password: ["", Validators.required],

    })

    if (this.loginForm.company) {  //LocalStorageden Login olması 
      this.frm.patchValue({
        company: this.loginForm.company,
        business: this.loginForm.business,
        branch: this.loginForm.branch,
        username: this.loginForm.username,
        password: this.loginForm.password
      });
      this.selectRequestBusiness(this.frm.value.company)

      this.showSpinner(SpinnerType.BallScaleMultiple)
      this.listCompany = (await this.companyService.getCompany(() => { }, (error) => { this.errorMesaj(error) })).companyName;
      this.hideSpinner(SpinnerType.BallScaleMultiple)

    }
    else {
      this.showSpinner(SpinnerType.BallScaleMultiple)
      this.listCompany = (await this.companyService.getCompany(() => { }, (error) => { this.errorMesaj(error) })).companyName;
      this.hideSpinner(SpinnerType.BallScaleMultiple)
    }






  }



  async selectRequestBrach(company: any, businessCode: string) {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    const data = await this.companyService.getBrach(company, businessCode, () => { }, (error) => { this.errorMesaj(error) })
    this.listBranch = data.branch;
    if (!this.loginForm.branch) {
      this.frm.patchValue({
        branch: this.listBranch[0].branchCode.toString()
      })
    }

    this.hideSpinner(SpinnerType.BallScaleMultiple)

  }

  async selectRequestBusiness(company: string) {
    this.listBranch = []
    this.showSpinner(SpinnerType.BallScaleMultiple)
    const business = await this.companyService.getBusiness(company, () => { }, (error => { this.hideSpinner(SpinnerType.BallScaleMultiple) }));
    this.listBusiness = business.business;
    if (!this.loginForm.business) {
      this.frm.patchValue({
        business: this.listBusiness[0].businessCode.toString()
      })
    }

    this.selectRequestBrach(this.frm.value.company, this.frm.value.business)
    this.hideSpinner(SpinnerType.BallScaleMultiple)


  }

  submitted: boolean = false;
  async Login(login: Login) {
    this.submitted = true;
    if (this.frm.invalid)
      return;
    this.showSpinner(SpinnerType.BallAtom);
    await this.userAuthService.login(login, () => {
      this.authService.identityCheck();
      this.saveToLocalStorage(login)//kullanıcı giriş bilgilerini tutuyorz
      this.router.navigate([""]);

    }, (error) => { });
    this.hideSpinner(SpinnerType.BallAtom)

  }

  saveToLocalStorage(prop: Login) {

    localStorage.setItem('company', prop.company);
    localStorage.setItem('business', prop.business);
    localStorage.setItem('branch', prop.branch);
    localStorage.setItem('username', prop.username);
    localStorage.setItem('password', prop.password);
  }


}
