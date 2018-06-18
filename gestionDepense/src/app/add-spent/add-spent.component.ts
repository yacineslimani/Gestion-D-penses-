import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpentDataService } from '../service/spent-data.service';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';
import { Spent } from '../domain/spent';
import * as moment from 'moment';

@Component({
  selector: 'app-add-spent',
  templateUrl: './add-spent.component.html',
  styleUrls: ['./add-spent.component.css']
})
export class AddSpentComponent implements OnInit {
  spent;
  showSpentLine = true;
  addSpentForm: FormGroup;
  idParam = undefined;
  editMod = false;

  constructor(
    private router: Router,
    private spentDataService: SpentDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {


    this.idParam = +this.route.snapshot.queryParams['id'];


    this.initForm();

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.initForm();
    });
  }



  initForm () {
    if (!isNaN(this.idParam)) {
      this.editMod = true;
      this.spent = this.spentDataService.getSpent(this.idParam);
      const spentLines = new FormArray([]);
      for (const line of this.spent.spents) {
        const formGroup = new FormGroup({
          name: new FormControl(line.name, Validators.required),
          amount: new FormControl(line.amount, Validators.required),
          description: new FormControl(line.description, Validators.required),
        });
        (<FormArray>spentLines).push(formGroup);
      }

      this.addSpentForm = new FormGroup({
        name: new FormControl(this.spent.name, Validators.required),
        description: new FormControl(this.spent.description, Validators.required),
        amount: new FormControl(this.spent.amount, Validators.required),
        spentLines: spentLines
      });
      this.amountChange();
    } else {
      this.addSpentForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        amount: new FormControl(0, Validators.required),
        spentLines: new FormArray([])
      });
    }
  }
  onAddSpent() {


    if (this.editMod) {
      this.addSpentForm.value.spentLines.forEach((element, index) => {

        if ( index < this.spent.spents.length ) {
          this.spent.spents[index].name = element.name;
          this.spent.spents[index].description = element.description;
          this.spent.spents[index].amount = element.amount;
        } else {
          this.spent.spents.push(new Spent(null, element.name, element.description, element.amount, null, null));
        }

      });
      this.spent.name =  this.addSpentForm.value.name;
      this.spent.description =  this.addSpentForm.value.description;
      this.spent.amount =  this.addSpentForm.value.amount;
      this.spentDataService.updateSpent(this.idParam, this.spent);
    } else {
      const spentLine: Spent[] = [];
      for (const line of this.addSpentForm.value.spentLines) {
        spentLine.push(new Spent(null, line.name, line.description, line.amount, null, null));
      }
      const spent: Spent = new Spent(
        null,
        this.addSpentForm.value.name,
        this.addSpentForm.value.description,
        this.addSpentForm.value.amount,
        moment().format('YYYY-MM-DD'),
        spentLine
      );

        this.spentDataService.addSpent(spent);
    }

    this.router.navigate(['/spent/list']);
  }

  onAddSpentLine() {
    this.amountChange();
    const formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required)
    });
    (<FormArray>this.addSpentForm.get('spentLines')).push(formGroup);

  }

  onDeleteSpentLine(index) {
    (<FormArray>this.addSpentForm.get('spentLines')).removeAt(index);
    this.amountChange();
  }

  onShowSpentLine() {
    this.showSpentLine = !this.showSpentLine;
  }

  amountChange() {
    let amount = 0;
    for (const line of this.addSpentForm.value.spentLines) {
      amount = amount + line.amount;
    }
    this.addSpentForm.patchValue({
      amount: amount
    });
  }
}
