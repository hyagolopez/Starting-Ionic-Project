// register.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  // tslint:disable-next-line:variable-name
  validations_form: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  errorMessage: string = '';
  // tslint:disable-next-line:no-inferrable-types
  successMessage: string = '';

  // tslint:disable-next-line:variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'O email é obrigatório.' },
      { type: 'pattern', message: 'Entre com um email válido.' }
    ],
    password: [
      { type: 'required', message: 'Senha requerida.' },
      { type: 'minlength', message: 'A senha deve ter pelo menos 5 caracteres.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
  ) { }

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

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created. Please log in.';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      })
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }


}
