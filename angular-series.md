https://www.youtube.com/watch?v=-G7kStvqgcg

# Sending Data from Component to Component

## 使用 Setter & Getter 观察 @Input() 的更新
```ts
@Component({
  selector: 'child',
})
export class ChildComponent {
  #amount: number;

  @Output() amountChange = new EventEmitter<number>();

  @Input()
  get amount() {
    return this.#amount;
  }
  set amount(val) {
    this.#amount = val;
    this.amountChange.emit(this.#amount)
  }

  changeAmount() {
    this.amount += 100;
  }
}
```

## 使用 @ViewChild & @ViewChildren 访问子组件

```ts
@Component({
  selector: 'app-root',
})
export class ParentComponent {
  // @ViewChild('child-component') child: ChildComponent;
  @ViewChild(ChildComponent) child: ChildComponent;
  @ViewChildren(ChildComponent) children: QueryList<ChildComponent>;

  onAmountChange(event: number) {
    console.log('')
  }
```

# Http Requests, Interceptors, Error Handling & more
  
## Get the full HTTP Response
  
  ```ts
  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>('url', { observe: 'response' } // Observe full HTTP Response
      .pipe(
        .tap( response => console.log(response)),
        map( response => response.body)
      );
    }

  parentChange() {
    this.child.changeAmount()
    this.children.toArray()
  }
}
```

# How to Add Route Resolvers in Angular

**Heads up:** If the resolve method return a Observable, the observable must be completed by invoking `observer.complete();` method.

**Heads up:** The Observable must be subscribe to make it invoking. `this.appService.get().subscribe()`.
