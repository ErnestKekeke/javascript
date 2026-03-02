function addNum(a, b){
    return a + b
}

test('add Numbers', ()=>{
    expect(addNum(2, 3)).toBe(5)
})