import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit,OnDestroy{

  private debouncer:Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder:string = '';

  @Input()
  public initialValue:string = '';

  @Output()
  public onValue:EventEmitter<string>= new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string>= new EventEmitter();

  emitValue(value:string):void{
    this.onValue.emit(value);
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value =>{
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);
  }

}
