flet input = $('#input');
input.bin('keyup', ()=>{
    let val = input.val();
    if(val.length>=3){
        if(isCached(val)){
            buildList(getFromCache(val));
            return;
        }
        doAjax(val).then((response)=>{
            buildList(response.json())
            storeInCache(val, response,json())
        });
    }
})
