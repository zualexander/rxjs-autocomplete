import {Observable} from 'rxjs';

const $input = document.getElementById('textinput');
console.info("input", $input);
const keyboard$ = Observable.fromEvent($input, 'keyup');

keyboard$.subscribe((event) => {
    console.info("event", event);
});