import nl2br from 'nl2br'



//空格转nbsp
export function space2nbsp(string) {
    return string.replace(/ /g, '&nbsp;')
}


export function nbspbr(string){
    return nl2br(space2nbsp(string))
}
