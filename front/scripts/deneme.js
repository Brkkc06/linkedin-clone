
//--------------------------------------------------------------------------------------------

// Array elemanlarını forEach ile dönme
// const array = ["a","b","c"];
// array.forEach(element =>{
//     console.log(element);
// });
//--------------------------------------------------------------------------------------------
// Array elamanının hem indexini hemde elementlerini döndürme:

// const array =  ["a","b","c"];

// array.forEach((element,index) =>{
//     console.log("index no:" + index,"element " + element);
// })

//--------------------------------------------------------------------------------------------

//includes() => içeriyor mu kontrolü *

// const array =["a","b","c"];
// const aKey = "a";

// if(array.includes(aKey)){
//     console.log("içerir")
// }
// else{
//     console.log("içermez")
// }

//-------------------------------------------------------------------------------------------- 

//filter() kullanımı:

// const array = [1,2,3,4,5,6,7];

// const filtered = array.filter(num => num > 3 )
// console.log(filtered);
// console.log(array);

//--------------------------------------------------------------------------------------------

//map() kullanımı

// const array = [1,2,3,4,5,6,7,8];

// const added = array.map(num => num+ 1); //her elemana 1 ekler;
// console.log(added);

// const array2 = ["Array2Nin elamanıyım","sayı","ekleyim"];

// const stringAdded = array2.map(string => string +  " Her Elemana bu cümleyi Ekledim.");

// console.log(stringAdded);

//--------------------------------------------------------------------------------------------

// reduce() kullanımı:
// Bu metod iki parametre alır; birinci parametre işlem gerçekleştirecek olan metodumuz ikincisi ise ilk değerimizdir.

// const array = [1,2,3,4,5,6,7,8];

// const islemMethodu = (toplam, simdikideger) => toplam + simdikideger;

// const result = array.reduce(islemMethodu);
// console.log(result);

//--------------------------------------------------------------------------------------------

// some()
// Bu metod dizimizde bulunan elemanların en az biri belirlediğimiz kurala uyuyorsa true, hiçbiri uymuyorsa false değeri döner.

// const array = [1,2,3,4,5,67,78,99];

// function control(element,index,array){
//     return element >100
// }

// const how = array.some(control) ;
// console.log(how)

//--------------------------------------------------------------------------------------------