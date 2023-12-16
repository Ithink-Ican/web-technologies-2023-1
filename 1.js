function pickPropArray(arr, prop){
    let props = new Array();
    for (let obj of arr){
        if (prop in obj){
            props.push(obj[prop]);
        }
    }
    return props;
}

const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
 ]
 
 const result = pickPropArray(students, 'name')
 
 console.log(result)  