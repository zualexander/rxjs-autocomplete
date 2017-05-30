import {Observable} from 'rxjs';

export const activateAutoComplete = () => {
    const $input = document.getElementById('textinput');
    const $output = document.getElementById('output');

    const keyboard$ = Observable.fromEvent($input, 'keyup')
        .map(x => x.target.value)
        .debounceTime(200)
        .filter(text => text.length > 3)
        .distinctUntilChanged()
        .switchMap((val) => createRequestObservable(val));

    keyboard$.subscribe((value) => {
            createAutocomplete(value);
        },
        (err) => handleError(err));

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
}