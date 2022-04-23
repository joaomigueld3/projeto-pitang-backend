
function sortByDate(aux,aux3,app){
    for(let i=0; i<app.length; i++){
        for(let j=0; j<app.length; j++){
            if(aux[i]===app[j].appDate){
                aux3[i]=app[j];
            }
        }
    }
}
export default sortByDate;