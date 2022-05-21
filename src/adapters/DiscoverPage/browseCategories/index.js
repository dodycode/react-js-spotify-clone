import {get} from "../../xhr";

export async function browseCategories(){
    return await get('/browse/categories?country=ID');
}