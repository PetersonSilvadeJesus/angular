<h1 align="center">Angular - One framework. Mobile & desktop.</h1>

<p align="center">
  <img src="https://github.com/angular/angular/raw/master/aio/src/assets/images/logos/angular/angular.png" alt="angular-logo" width="120px" height="120px"/>
  <br>
  <i>Angular is a development platform for building mobile and desktop web applications
    <br> using Typescript/JavaScript and other languages.</i>
  <br>
</p>

<p align="center">
  <a href="https://www.angular.io"><strong>www.angular.io</strong></a>
  <br>
</p>


<p align="center">
  <a href="https://circleci.com/gh/angular/workflows/angular/tree/master">
    <img src="https://img.shields.io/circleci/build/github/angular/angular/master.svg?logo=circleci&logoColor=fff&label=CircleCI" alt="CI status" />
  </a>&nbsp;
  <a href="https://www.npmjs.com/@angular/core">
    <img src="https://img.shields.io/npm/v/@angular/core.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen" alt="Angular on npm" />
  </a>&nbsp;
  <a href="https://discord.gg/angular">
    <img src="https://img.shields.io/discord/463752820026376202.svg?logo=discord&logoColor=fff&label=Discord&color=7389d8" alt="Discord conversation" />
  </a>
</p>


#### 🚧  🚀 Em construção...  🚧

## Documentation

- [Reference Links](#reference-links)
- [Framework](#framework)
  + [History](#-framework-history)
  + [Objective](#-framework-objective)
  + [Advantage](#-framework-advantage)
  + [Disadvantage](#-framework-disadvantage)
  + [AngularJS Life Cycle](#-angularjs-life-cycle)
  + [Variable Interpolation](#variable-interpolation)
  + [Model Layer](#model-layer)
- [Application Creation](/How-create-application.md)

### About Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

### Reference Links

+ [Angular.io](https://angular.io/)
+ [Angular.org](https://angular.org/)
+ [An Overview of the AngularJS Life Cycle](https://www.informit.com/articles/article.aspx?p=2271482&seqNum=3)
+ [O que é o AngularJS e por que você precisa aprender?](https://blog.trainning.com.br/desenvolvimento/o-que-e-o-angularjs)
+ [Um overview sobre o framework Angular](https://blog.geekhunter.com.br/um-overview-sobre-o-framework-angular/)
+ [Por que o Angular é um framework tão poderoso?](https://www.totvs.com/blog/developers/angular/)

### Framework

#### > About the Framework

> Angular é um framework para desenvolver aplicações em diversas plataformas, mantido e desenvolvido pela Google.
> 
> Ele é uma reescritura completa do antigo angularjs e foi escrito em TypeScript.
> 
> Ele vem com um conjunto de bibliotecas poderosas que podemos importar, possibilitando construir aplicações com uma qualidade e produtividade surpreendente.

#### > Framework History

> It all started in 2008 and 2009, Misko hevery (a Google developer) working on a part-time project to simplify the development of web applications. Not for web developers, but for web designers who have little or no knowledge of web development, extending the vocabulary of HTML, so that if we have a static web server you can build a simple web application (without worrying about what's going on on the back ground).
>
> Misko Hevery and Adam Aborns are inventors of AngularJs.
>
> He had a hard time explaining what it really is, so Misko told people that it's a kind of Spread sheet in the cloud so that we can link data and save it without worrying about persistent security etc. and the user interface will be in HTML.
>
> At that time, Brad Green, Misko's manager at Google, asked him to work on an internal Google tool called the Google Feedback Tool.
>
> Google has a framework called Google Web Tool Kit (GWT) written in Java to develop its tools and internal projects.
>
> Three developers, including Misko, wrote 17,000 lines of code for six months, then it became very difficult for them to write code, since it is difficult to test. To add an HTML label, you have to write java code and compile it and transform it into HTML JavaScript to display in the web browser.
>
> So Misko challenged Brad that he can write everything in 2 weeks using his Angular side project. He missed the challenge, but completed it in 3 weeks. And the lines of code reduced 1500 within 3 weeks with angular (a developer).
>
> Impressed Brad Green asked him to work even more angularly. So he, together with S hyma Seshadri and Igor Minor, sent the Google feedback tool with the full AngularJS.

#### > Framework Objective

> Possui como objetivo principal facilitar determinados processos no desenvolvimento de aplicativos acessados pelos navegadores, estando ligado diretamente ao HTML.

#### > Framework Advantage

1. <u>Acting Community</u>: The Angular repository on GitHub has 49 thousand stars and more than a thousand contributors, in addition to more than 150 thousand repositories with scripts that use the technology.
2. <u>Compact Code</u>: Angular uses much less code than jQuery for example and developing with less code is the framework's mantra.
3. <u>Productive</u>: Permite ao desenvolvedor quebrar o código em partes, utilizando componentes, módulos e outras funcionalidades.
4. <u>Single Page Applications (SPA)</u>: Uma única página web, com o objetivo de fornecer a experiência ao usuário parecida com a de um aplicativo de desktop, onde o código é carregado na página única, de forma dinâmica.

#### > Framework Disadvantage

...

#### > AngularJS Life Cycle

1. **The Bootstrap Phase**: 
2. **The Compilation Phase**: 
3. **The Runtime Data Binding Phase**: 

### Interpolation

A interpolação é usada para exibir uma propriedade do componente no HTML.

Sua sintaxe são chaves duplas e podemos exibir qualquer tipo de dados, por exemplo, números, datas, arrays e etc…

Code of Component:

```js
export class AppComponent {
  propriedade = "Hello!!!"
}
```

Code of HTML:

```html
<h1>{{propriedade}}</h1> 
```

### Component Life Cycle

After your application instantiates a component or directive by calling its constructor, Angular calls the hook methods you have implemented at the appropriate point in the lifecycle of that instance.

Angular executes hook methods in the following sequence. You can use them to perform the following kinds of operations.


| Hook method | Purpose | Timing |
| --- | --- | --- |
| ngOnChanges() | Respond when Angular sets or resets data-bound input properties. The method receives a SimpleChanges object of current and previous property values.<br>Note that this happens very frequently, so any operation you perform here impacts performance significantly. See details in Using change detection hooks in this document. | Called before ngOnInit() and whenever one or more data-bound input properties change.<br>Note that if your component has no inputs or you use it without providing any inputs, the framework will not call ngOnChanges(). |
| ngOnInit() | Initialize the directive or component after Angular first displays the data-bound properties and sets the directive or component's input properties. See details in Initializing a component or directive in this document. | Called once, after the first ngOnChanges(). |
| ngDoCheck() | Detect and act upon changes that Angular can't or won't detect on its own. See details and example in Defining custom change detection in this document. | Called immediately after ngOnChanges() on every change detection run, and immediately after ngOnInit() on the first run. |
| ngAfterContentInit() | Respond after Angular projects external content into the component's view, or into the view that a directive is in.<br>See details and example in Responding to changes in content in this document. | Called once after the first ngDoCheck(). |
| ngAfterContentChecked() | Respond after Angular checks the content projected into the directive or component.<br>See details and example in Responding to projected content changes in this document. | Called after ngAfterContentInit() and every subsequent ngDoCheck(). |
| ngAfterViewInit() | Respond after Angular initializes the component's views and child views, or the view that contains the directive.<br>See details and example in Responding to view changes in this document. | Called once after the first ngAfterContentChecked(). |
| ngAfterViewChecked() | Respond after Angular checks the component's views and child views, or the view that contains the directive. | Called after the ngAfterViewInit() and every subsequent ngAfterContentChecked(). |
| ngOnDestroy() | Cleanup just before Angular destroys the directive or component. Unsubscribe Observables and detach event handlers to avoid memory leaks. See details in Cleaning up on instance destruction in this document. | Called immediately before Angular destroys the directive or component. |