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

# How to Use Pipes

## NgModel can be applied seperately

```ts
<input [ngModel]="person | titlecase" (ngModelChange)="person = $event" />
```

## Call a Pipe manully

```ts
const name = new UpperCasePipe().transform(this.name);
console.log(name)
```

## Pure & Impure Pipe
Pipe is pure by default. It means that if the input is modified impurelly, the view will not be updated.

**Two way to update

- Update the input with pure method, assigned to a total new object etc.
- Parasmenter in pipe decorator: `@Pipe({name: 'SOMETHING', pure: false /* 👈 */})`

# Lazy Loading

## One thing need to confirm

Make sure the follow syntax is not **OLD SCHOOL** styles for lazy loading:

```ts
const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule' // Available in V9?
  }
]

// The official docs https://angular.io/guide/router#milestone-6-asynchronous-routing

{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
}
```
