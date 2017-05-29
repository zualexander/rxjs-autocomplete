let stream$ = Rx.Observable.fromEvent(input, 'keyup')
    .map(ev => ev.target.value)
    .filter(text => text.length >=3)
distinctUntilChanged()
    .switchMap(val=>Rx.DOM.getJSON(url_to_json))

stream$.subscribe(data=>console.log(data));
