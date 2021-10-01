const chunk = (array: any, size: number): [] => 

  array.reduce((acc: any, _: any, i: number) => {

    if (i % size === 0) acc.push(array.slice(i, i + size));
    
    return acc;
  
  }, []);

export default chunk;
