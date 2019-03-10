import { Component, OnInit, Input, AfterContentInit, ContentChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'ws-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any
  @Input() errorMessage: string
  @Input() label: string
  @ContentChild(NgModel) model: NgModel

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.input = this.model
    if(this.input === undefined) {
      throw new Error('ngModel directive required')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return !this.input.valid && (this.input.dirty || this.input.touched)
  }
}
