https://github.com/ctsin/notebook/new/master

**Title**

```js
import { Title } from "@angular/common"@Component({
    ...
})
export class LoginComponent implements OnInit {
    constructor(private title: Title) {}    ngOnInit() {
        title.setTitle("Login")
    }
}
```

**Meta**

```js
import { Meta } from "@angular/common"@Component({
    ...
})
export class BlogComponent implements OnInit {
    constructor(private meta: Meta) {}    ngOnInit() {
        meta.updateTag({name: "title", content: ""})
        meta.updateTag({name: "description", content: "Lorem ipsum dolor"})
        meta.updateTag({name: "image", content: "./assets/blog-image.jpg"})
        meta.updateTag({name: "site", content: "My Site"})
    }
}
```

**Override Template interpolation**

```js
@Component({
    interpolation: ["((","))"]
})
export class AppComponent {}
```

The interpolation to use in the AppComponent’s template will be "(())" no longer "{{}}".
```js
@Component({
    template: `
        <div>
            ((data))
        </div>
    `,
    interpolation: ["((","))"]
})
export class AppComponent {
    data: any = "dataVar"
}
```

**Location**

```js
import { Location } from "@angular/common"@Component({
    ...
})
export class AppComponent {
    constructor(private location: Location) {}    navigatTo(url) {
        this.location.go(url)
    }    goBack() {
        location.back()
    }    goForward() {
        location.forward()
    }
}
```

**DOCUMENT**

Getting the document model so we can perform DOM operations from our Angular app.

The DOCUMENT provides just that. DOCUMENT is a DI Token representing the main rendering context. In a browser, this is the DOM Document. It provides DOM operations in an environment-agnostic way.

> Note: Document might not be available in the Application Context when Application and Rendering Contexts are not the same (e.g. when running the application into a Web Worker).

Let’s say we have an element in our html:

```html
<canvas id="canvas"></canvas>
```

We can get the HTMLElement of canvas by calling getElementById()

```js
@Component({})
export class CanvasElement {
    constructor(@Inject(DOCUMENT) _doc: Document) {}    renderCanvas() {
        this._doc.getElementById("canvas")
    }
}
```
We can safely do this using ElementRef and template reference but you got the idea.

**@Attribute decorator**

We have this Attribute decorator, which enables us to pass static string without a cost at performance by eliminating change detection check on it.

The values of Attribute decorator are checked **once** and never checked again. They are used similarly to @Input decorator:

```js
@Component({
    ...
})
export class BlogComponent {
    constructor(@Attribute("type") private type: string ) {}
}
```

**HttpInterceptor**

HttpInterceptor can be used in:
- Authentication
- Caching
- Fake backend
- URL transformation
- Modifying headers

It is simple to use, first create a service and implement the HttpInterceptor interface.

```js
@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
    constructor() {}    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        ...
    }
}

// Then, insert it in your main module:

@NgModule({
    ...
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockBackendInterceptor,
            multi: true
        }
    ]
    ...
})
export class AppModule {}
```

**AppInitializer**

We do sometimes want a piece of code to be run when our Angular app is starting, maybe load some settings, load cache, load configurations or do some check-ins. The AppInitialzer token helps out with that.

APP_INITIALIZER: A function that will be executed when an application is initialized.

It is easy to use. Let’s we want this runSettings function to be executed on our Angular app startup:

```js
function runSettingsOnInit() {
    ...
}
```

We go to our main module, AppModule and add it to providers section in its NgModule decorator:

```js
@NgModule({
    providers: [
        { provide: APP_INITIALIZER, useFactory: runSettingsOnInit }
    ]
})
```

**Bootstrap Listener**

Just like AppInitializer, Angular has a feature that enables us to listen on when a component is being bootstrapped. It is the APP_BOOTSTRAP_LISTENER.

All callbacks provided via this token will be called for every component that is bootstrapped.

We have many reasons to listen to components bootstrapping, for example, the Router module uses it to destroy and create components based on the route navigation.

To use APP_BOOTSTRAP_LISTENER, we add it to the providers section in our AppModule with the callback function:

```js
@NgModule({
    {
        provide: APP_BOOTSTRAP_LISTENER, multi: true, 
        useExisting: runOnBootstrap
    }
    ...
})
export class AppModule {}
```

**NgPlural**
**...**
