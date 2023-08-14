import css from "./style";

 function component() {
   const element = document.createElement('div');

   element.innerHTML = 'hello world';

   return element;

 }

 document.body.appendChild(component());

 import main from './main/index';
 main()