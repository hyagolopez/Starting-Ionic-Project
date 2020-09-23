// login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder

  ) { }

  // tslint:disable-next-line:variable-name
  validations_form: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  errorMessage: string = '';


  // tslint:disable-next-line:variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'O email é obrigatório.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Senha requerida.' },
      { type: 'minlength', message: 'A senha deve ter pelo menos 5 caracteres.' }
    ]
  };

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/movies');
      }, err => {
        this.errorMessage = err.message;
      })
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

}
