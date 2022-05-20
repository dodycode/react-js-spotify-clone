import {get} from "../xhr";

export function browseCategories(){
    return get('/browse/categories?country=ID');
}