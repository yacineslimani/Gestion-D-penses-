import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpentDataService } from '../service/spent-data.service';
import { Spent } from '../domain/spent';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy, AfterViewInit {



  budget = 500000;
  spents = [];
  spentLine = undefined;
  subscription: Subscription;

  ngAfterViewInit(): void {
    this.spents = this.spentDataService.getspentData();
  }

  constructor(private router: Router, private spentDataService: SpentDataService) {}

  ngOnInit() {
    this.spents = this.spentDataService.getspentData();

    this.subscription = this.spentDataService.spentChange.subscribe((spents: Spent[]) => {
        this.spents = spents;
    });
  }



  onSpent(id) {
    this.spentLine = this.spents[id];
  }
  onDelete(id) {
    swal({
      title: 'Voulez vous supprimer cette depense',
      text: 'La depense sera supprimer definitivement',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer'
    }).then((result) => {
      if (result.value) {
        this.spentDataService.deleteSpent(id);
        this.spentLine = undefined;
        swal(
          'Supprimer',
          'la depense à été supprimée',
          'success'
        );
      }
    });
  }
  onAddSpent() {
    this.router.navigate(['/spent/add']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
