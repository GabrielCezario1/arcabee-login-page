import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(
    private toastr: ToastrService) {}


  ngOnInit(): void {
    
  }
  teste(){
  this.toastr.success('Testado com sucesso!');
  }
}
