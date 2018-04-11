
const Emiter = require('./index.js');

let emiter = new Emiter();

let a = function(){
    console.log("im a");
}

let b = function(){
    console.log('im b');
}

emiter.on('test',a);
emiter.on('blin',b);
emiter.on('test',function(){
    console.log('im temp')
});

emiter.once('blin',function(){
    console.log('im once');
})

console.log(emiter.listeners())
emiter.emit('test');
emiter.emit('blin');

emiter.off('test',a)

emiter.emit('test');
emiter.emit('blin');
console.log(emiter.listeners())

emiter.offAll('test')
console.log(emiter.listeners())