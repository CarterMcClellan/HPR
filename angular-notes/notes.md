### Angular
- Angular at its core works in components. Each component has 3 parts to it: its html files, its css files, and its typescript files (which mostly look like a combination of java and javascript syntaxically). Example modules being the header, the search bar, a chatbot :), etc... This is what makes Angular ideal for big projects, its easy to designate everyone to a component and to leave them to that

- Beyond this though angular has larger structures made out of components. The other 2 more important are modules and applications. Modules are kinda like libraries of functionality, generally made up of things you dont want to hardcode every time you write a project, eg, routing, animations, etc...Applications are a combination of modules and components which service that product as a whole.

##### Project Structure
 The Angular Client can be installed using
- ```bash sudo npm install -g @angular/cli```

This client provides an interface to build a project structured "idiotmatically"
- ```ng new <PROJECT NAME>```

This will then build an enormous project tree with several important components
- **app.module.ts** - this is the file under the app folder which manages all of the external dependencies used in the project for example [Angular Materials](!https://material.angular.io/)
- **app.component.ts** - this is the file under the app folder which imports each of the different angular components and provides a javascript object which can be embedded in the **app.component.html** object
- **index.html** - this is at the root of the tree and will render the components of the app.comonent.html file
#### Using the Angular Cli
When developing any project in angular you should run
```ng serve```
At the base of the directory. This will create a localhost server at [http://localhost:4200](!http://localhost:4200), which recompiles and displays changes as soon as a file in the app directory is saved.

**Note** in my experience this isn't perfect sometimes your code looks right and something still isnt loading properly, before you go crazy looking for a missing comma, cut a part of the code and re-paste just to refresh that chunk, see if that fixes the error.
#### Angular Modules
As mentioned before 
- "Angular works in 3 parts its html files, its css files, and its typescript files"

**typescript files**
To seperate a regular typescript file from an angular html object typescript files need "decorators"
```typescript
import { Component } from '@angular/core';

// decorator
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent{

}
```
Now all content in the html file **header.component.html** is bundled together into a single tag which can be included in the **app.component.html** file using the selector **<app-header></app-header>**. As is this operation would fail as it has not been included in the **app-module.ts** file yet, that should look something like this
```typescript
import { HeaderComponent } from './relative/path/header.component <OMIT SUFFIX>';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
#### Angular Modules 2
Note that all of the above is useful for understanding what is required to make a module work, but an alternative way to speed things up simply using the angular cli is 
```ng generate component <COMPONENT NAME>```

This can also be used to generate more sophisticated objects for more complicated tasks in Angular [ng generate command documentation](!https://angular.io/cli/generate)

#### Angular Materials Basics 1
For the styling and building of the front end Angular Relies on [Angular Materials](!https://material.angular.io/). To include this in the project run
```ng add @angular/material``` which does the following
- add angular/material to the package.json file
- add angular/cdk to the package.json file
- set a default color scheme in the angular.json file (this can be change to any 1 of 4 stock or added onto)
- modifies the **app.module.ts** file to include the animations module which is required for most of the angular matierials things

**Note** This is not the same as 
```npm install --save @angular/material```
- this ONLY modifies the package.json file

#### Angular Materials Basics 2
By default after running 
```ng add @angular/material```
nothing is added to the project except for the *basest* requirements to use angular, if you pick a component that you want to use in the application import it like so (note that ```ng generate component``` does this for you)
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { <MODULE NAME>} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    <MODULE NAME>
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
#### Angular Routing
For SPA's ([Single Page Applications](!https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58)), its important to manage individual html content (what page is shown when). Generally this is thought of as being done with the anchor tag
```html
<a href="www.google.com"></a>
```
In a large system where an individual car render their own content dynamically, requires a solution known as routing. The way routing is handled through Angular is the app routing module. This can be added in 3 ways. 
- On initialization as (```ng new```) angular will ask to included routing
- Through the ```ng generate module app-routing``` command
- Manually adding a file to the route of the directory **app-routing.module.ts**, and including the module in the **app.module.ts** file (like show above).
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
...
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
```
*sample app-routing.module.ts*
#### More Random Observations about Angular
HTML and CSS are pretty straightforward as they will mostly rely on angular matierials to procress all of the incoming and outgoign requests, but angular provides several key functions. **ngIf** for exmaple allows users to control whether a given bit of html is rendered.
```html
<span *ngIf="isLoading">...</span>
```
In this case the the **isLoading** variable is stored as an instance variable in the typescript file

``` typescript
export class PostCreateComponent {
  isLoading = false;
  ...
}
```

This could be useful in the future for things like user authentication eg

```html
<span *ngIf="userIsAuthenticated">
      <a>My Assignments</a>
</span>
<span *ngIf="!userIsAuthenticated">
    <a>Posted Assignments</a>
</span>
```

There are many other useful features which angular can embed in the html tags, for example **ngFor**, as well as injections which *inject* the given stored local variable directly into the html. They work as follows

```html
<p>{{ class.content }}</p>
```

Where class.content is the instance variable.

Besides those misc angular features, something nice when working with a list of so many of the same type of object is the [angular services](!https://angular.io/tutorial/toh-pt4), as it provides a way to recyle some of the functionality of said code. For example in the backend process when you are constantly issuing requests to database it can be tedious to specify each of those get, put, update ...etc *enter service*

```typescript
export class PostsService {
  getPosts(postsPerPage: number, currentPage: number) {}
  getPostUpdateListener() {}
  getPost(id: string) {}
  addPost(title: string, content: string) {}
  updatePost(id: string, title: string, content: string) {}
  deletePost(postId: string) {}
}
```


















