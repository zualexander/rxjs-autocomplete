import {Observable} from 'rxjs';

const $input = document.getElementById('textinput');
console.info("input", $input);
const keyboard$ = Observable.fromEvent($input, 'keyup')
    .map(x => x.target.value)
    .debounceTime(700)
    .filter(text => text.length > 2)
    .distinctUntilChanged();

keyboard$.subscribe((value) => {
    console.info(value);
});