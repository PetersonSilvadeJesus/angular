### Requirements

1. **Node.js**: Angular requires a current, active LTS, or maintenance LTS version of Node.js.
2. **npm package manager**: Angular, the Angular CLI, and Angular applications depend on npm packages for many features and functions.

## Step #1. Create a new angular app

```console
$ npm install -g @angular/cli 
```

Create a workspace and initial application

```console
$ ng new my-app
```

If you get the question like below, choose `Yes` and `CSS` (or whatever you like to choose).


> ? Would you like to add Angular routing? Yes`
> ? Which stylesheet format would you like to use? CSS


> The Angular CLI includes a server, so that you can build and serve your app locally.

Navigate to the workspace folder, such as my-app. Run the following command:

```console
$ cd my-app

$ ng serve --open
```

> The ng serve command launches the server, watches your files, and rebuilds the app as you make changes to those files.
The --open (or just -o) option automatically opens your browser to http://localhost:4200/.

If your installation and setup was successful, you should see a page similar to the following.

![Welcome to my-app!](https://angular.io/generated/images/guide/setup-local/app-works.png "Welcome to my-app!")


## Step #2. Add routing and navigation

Next, we just add the required Angular components for this Coronavirus cases app. Just type these commands to generate them.

```console
$ ng g component cases
$ ng g component cases-details
$ ng g component add-cases
$ ng g component edit-cases 
$ ng g component cases-stat
```

Those components will automatically be registered to the app.module.ts. Next, create and edit `src/app/app-routing.module.ts` then add these imports.

```JS
import { CasesComponent } from './cases/cases.component';
import { CasesDetailsComponent } from './cases-details/cases-details.component';
import { CasesStatComponent } from './cases-stat/cases-stat.component';
import { AddCasesComponent } from './add-cases/add-cases.component';
import { EditCasesComponent } from './edit-cases/edit-cases.component';
```

Add these arrays to the existing routes constant that contain route for above-added components.

```JS
const routes: Routes = [
  {
    path: 'cases',
    component: CasesComponent,
    data: { title: 'List of Cases' }
  },
  {
    path: 'cases-details/:id',
    component: CasesDetailsComponent,
    data: { title: 'Cases Details' }
  },
  {
    path: 'cases-stat',
    component: CasesStatComponent,
    data: { title: 'Cases Statistic' }
  },
  {
    path: 'add-cases',
    component: AddCasesComponent,
    data: { title: 'Add Cases' }
  },
  {
    path: 'edit-cases/:id',
    component: EditCasesComponent,
    data: { title: 'Edit Cases' }
  },
  { path: '',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
```

Open and edit `src/app/app.component.html` and you will see the existing router outlet.

```HTML
<div class="container">
  <router-outlet></router-outlet>
</div>
```

## Step #3. Add models

For models, create dir `src/app/models` and add files `cases.ts` and `statistic.ts`.

Add in `cases.ts`:

```JS
export class Cases {
  _id: string;
  name: string;
  gender: string;
  age: number;
  address: string;
  city: string;
  country: string;
  status: string;
  updated: Date;
}
```

And add in `statistic.ts`:


```JS
export class Statistic {
  _id: any;
  count: number;
}
```


## Step #4. Add service HTTP

Before creating a service for REST API access, first, we have to install or register `HttpClientModule`. Open and edit `src/app/app.module.ts` then add these imports of FormsModule, ReactiveFormsModule (@angular/forms) and HttpClientModule (@angular/common/http).

```JS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
```

Next, add it to `@NgModule` imports after `BrowserModule`.

```JS
imports: [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule
],
```

Next, generate an Angular service by typing this command:

```console
$ ng g service services/api
```

Next, open and edit `src/app/services/api.service.ts` then add these imports.

```JS
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cases } from '../models/cases';
import { Statistic } from '../models/statistic';
```

Add these constants before the `@Injectable`.

```JS
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:25250/api/';
```


Inject the `HttpClient` module to the constructor.

```JS
constructor(private http: HttpClient) { }
```

Add the error handler function that returns as an Observable.

```JS
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
```

Add the functions for all CRUD (create, read, update, delete) REST API call of cases and statistic data. 

```JS
  getCases(): Observable<Cases[]> {
    return this.http.get<Cases[]>(`${apiUrl}`)
      .pipe(
        tap(cases => console.log('fetched cases')),
        catchError(this.handleError('getCases', []))
      );
  }

  getCasesById(id: string): Observable<Cases> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Cases>(url).pipe(
      tap(_ => console.log(`fetched cases id=${id}`)),
      catchError(this.handleError<Cases>(`getCasesById id=${id}`))
    );
  }

  addCases(cases: Cases): Observable<Cases> {
    return this.http.post<Cases>(apiUrl, cases, httpOptions).pipe(
      tap((c: Cases) => console.log(`added cases w/ id=${c._id}`)),
      catchError(this.handleError<Cases>('addCases'))
    );
  }

  updateCases(id: string, cases: Cases): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, cases, httpOptions).pipe(
      tap(_ => console.log(`updated cases id=${id}`)),
      catchError(this.handleError<any>('updateCases'))
    );
  }

  deleteCases(id: string): Observable<Cases> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Cases>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted cases id=${id}`)),
      catchError(this.handleError<Cases>('deleteCases'))
    );
  }

  getStatistic(status: string): Observable<Statistic> {
    const url = `${apiUrl}/daily/${status}`;
    return this.http.get<Statistic>(url).pipe(
      tap(_ => console.log(`fetched statistic status=${status}`)),
      catchError(this.handleError<Statistic>(`getStatistic status=${status}`))
    );
  }
```

## Step #5. Install Angular material

Next, for the user interface (UI) we will use Angular Material and CDK. There's a CLI for generating a Material component like Table as a component. Type this command to install Angular Material (@angular/material).

```console
$ ng add @angular/material
```

If there are questions like below, just use the default and **Yes** answer.

```
? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: http
s://material.angular.io?theme=indigo-pink ]
? Set up global Angular Material typography styles? Yes
? Set up browser animations for Angular Material? Yes
```

Create file `src/app/material.module.ts`. Open and edit that file then add these imports of required Angular Material Components.:

```JS
import {NgModule} from '@angular/core';

// Material Design
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
```

Register the above modules to `@NgModule` imports and export.

```JS
@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSelectModule,
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSelectModule,
  ]
})
export class MaterialModule {}
```

Go in `src/app/app.modules.ts` and add import.

```JS
import {MaterialModule} from './material.module';
```

Register the above modules to `@NgModule` imports.

```JS
imports: [
  ...
  MaterialModule,
],
```

## Step #6. Add Navbar

Edit and add in file `src/app/app.component.html`:

```html
<ngx-loading-bar color="#ff4081" height="4px"></ngx-loading-bar>

<mat-sidenav-container>
  <mat-sidenav #sidenav role="navigation">
    <mat-nav-list>
      <a mat-list-item>
        <mat-icon class="icon">input</mat-icon>
        <span class="label">Login</span>
      </a>
      <a mat-list-item>
        <mat-icon class="icon">home</mat-icon>
        <span class="label">Home</span>
      </a>
      <a mat-list-item>
        <mat-icon class="icon">dashboard</mat-icon>
        <span class="label">Dashboard</span>
      </a>
      <a mat-list-item type="button">
        <mat-icon class="icon">input</mat-icon>
        <span class="label">LogOut</span>
      </a>
    </mat-nav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <mat-toolbar color="primary">
      <div fxHide.gt-xs>
        <button mat-icon-button>
          <mat-icon>menu</mat-icon>
        </button>
      </div>
      <div>
        <a>
          Corona Virus Cases List
        </a>
      </div>
      <div fxFlex fxLayout fxLayoutAlign="flex-end" fxHide.xs>
        <ul fxLayout fxLayoutGap="20px" class="navigation-items">
          <li>
            <a mat-flat-button color="primary" [routerLink]="['/cases']">
              <mat-icon class="icon">warning</mat-icon>
              <span class="label">Cases</span>
            </a>
          </li>
          <li>
            <a mat-flat-button color="primary" [routerLink]="['/cases-stat']">
              <mat-icon class="icon">home</mat-icon>
              <span class="label">Statistic</span>
            </a>
          </li>
        </ul>
      </div>
    </mat-toolbar>
    <main>
    </main>
  </mat-sidenav-content>
</mat-sidenav-container>
...
<div class="container">
  <router-outlet></router-outlet>
</div>
```