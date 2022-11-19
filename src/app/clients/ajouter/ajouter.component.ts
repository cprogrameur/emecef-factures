import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {
  public ajouterApprenant!: FormGroup;
  public datas!: any;
  selectedFiles: FileList | undefined;
  percentage!: number;
  communes: string[] = [
    "Banikoara",
    "Kandi",
    "Gogonou",
    "Karimama",
    "Malanville",
    "Ségbana",
    "Boukoumbé",
    "Cobli",
    "Kérou",
    "Kouandé",
    "Matéri",
    "Natitingou", "Péhunco",
    "Tanguiéta",
    "Toukountouna"," Abomey - Calavi",
    "Allada",
    "Kpomassè",
    "Ouidah",
    "Sô-Ava",
    "Toffo",
    "Tori",
    "Zê",
    "Bembèrèkè",
    "Kalalé",
    "N’Dali",
    "Nikki",
    "Parakou",
    "Pèrèrè",
    "Sinendé",
    "Tchaourou",
    "Bantè",
    "Dassa-Zoumè",
    "Glazoué",
    "Ouessè",
    "Savalou",
    "Savè",
    "Aplahoué",
    "Djakotomey",
    "Dogbo",
    "Klouékanmey",
    "Lalo",
    "Toviklin",
    "Bassila",
    "Copargo",
    "Djougou",
    "Ouaké",
    "Cotonou",
    "Athiémé",
    "Bopa",
    "Comè",
    "Grand-Popo",
    "Houéyogbé",
    "Lokossa",
    "Adjarra",
    "Adjohoun",
    "Aguégués",
    "Akpro-Missérété",
    "Avrankou",
    "Bonou",
    "Dangbo",
    "Porto-Novo",
    "Sèmè-Podji",
    "Adja-ouèrè",
    "Ifangni",
    "Kétou",
    "Pobè",
    "Sakété",
    "Abomey",
    "Agbangnizoun",
    "Bohicon",
    "Covè",
    "Djidja",
    "Ouinhi",
    "Zagnanado",
    "Za-kpota",
    "Zogbodomè",
  ]

  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private userService: AuthService,
    public afAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.ajouterApprenant = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      dateNaissance: ['', Validators.required],
      dateDebut: ['', Validators.required],
      lieuNaissance: ['', Validators.required],
      phone: ['', Validators.required],
      lieuResidence: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      statut: [false, Validators.required],
      genre: ['', Validators.required]
    })
  }

  logout() {
    this.userService.clearStorage();
    this.router.navigate(['/login'])
  }
  onSubmit() {

    const password = this.ajouterApprenant.value.nom.split(' ').join('_')
    // this.firebaseService.createApprenants({ ...this.ajouterApprenant.value, password: password }).then(
    //   (res: any) => {
    //     this.afAuth
    //       .createUserWithEmailAndPassword(this.ajouterApprenant.value.email, password).then((res: any) => {
    //         console.log('Créé')
    //         this.http.post('../../assets/php/email.php', { ...this.ajouterApprenant.value, password: password }).subscribe();
    //       })
    //   }
    // )
    this.router.navigate(['apprenants'])
  }

  ngOnInit(): void {
  }
}
