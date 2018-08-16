
export  default {
decode(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch (e) {
        return void 0;
    }
},


 isEmptyObject(obj: Object): boolean {
    return Object.keys(obj).length === 0;
},

objectToQuery(obj: Object): string {
    return Object.keys(obj).map(key =>
        key + '=' + encodeURIComponent(obj[key] === void 0 ? '' : obj[key])
    ).join('&');
},

 isEmpty(obj: any): boolean {

    return (obj || '') == '';

},


toastSuccess(vue:object,message:string){

    vue['$message']({
        type: 'success',
        message: message
    }) 

},

toastSuccess2(vue:object,message:string){

    vue['$message']({
        type: 'success',
        message: message
    }) 

},

doTest(str:string){
    return ""
},

 toastError(vue:object,message:string){

    vue['$message']({
        type: 'error',
        message: message
    }) 




}
}