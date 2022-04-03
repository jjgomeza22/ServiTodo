import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfertasAcep } from 'src/app/models/oferta.model';

@Component({
  selector: 'app-dialog-oferta',
  templateUrl: './dialog-oferta.component.html',
  styleUrls: ['./dialog-oferta.component.scss']
})
export class DialogOfertaComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<DialogOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public ofertaAcept: OfertasAcep
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    // Close the dialog
    this.matDialogRef.close();
}

}
