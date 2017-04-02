import {Observable} from 'rxjs';

let inputString = '';
const $input = document.getElementById('textinput');
const $output = document.getElementById('output');

const keyboard$ = Observable.fromEvent($input, 'keyup')
    .map(x => x.target.value)
    .debounceTime(200)
    .filter(text => text.length > 2)
    .distinctUntilChanged();

keyboard$.subscribe((value) => {
    const request$ = createRequestObservable(value);
    const requestSubscribe = request$.subscribe(createAutocomplete, handleError);
});

function createRequestObservable(queryString) {
    return Observable.ajax(`https://api.github.com/search/users?q=${queryString}`)
        .map((response) => {
            return response.response.items;
        });
}

function createAutocomplete(data) {
    console.dir(data);
    while ($output.hasChildNodes()) {
        $output.removeChild($output.lastChild);
    }
    data.forEach((user) => {
        const $li = document.createElement('li');
        $li.appendChild(document.createTextNode(user.login));
        $output.appendChild($li);
    });
}

function handleError(err) {
    console.error(err);
}