/**
 * 自定义事件监听器
 */
class EventEmitter {
    constructor(){
        this.eventList = {}
    }
    on(type,listener){
        this.eventList[type] = this.eventList[type] || [];
        this.eventList[type].push(listener);
    }

    once(type,listener){
        let fn = ()=>{
            this.off(type,fn);
            listener.apply(this,arguments);
        }

        fn.listener = listener;
        this.on(type,fn);
    }

    emit(type,...arg){
        let list = this.eventList[type];
        if(!list.length) return false;
        list.forEach(fn=>{
            fn.apply(this,arg);
        })
    }

    off(type,listener){
        if(!this.eventList[type].length) return false;

        this.eventList[type].forEach((fn,i)=>{
            if(fn == listener || fn.listener == listener){
                this.eventList[type].splice(i,1);
            }
        })
    }

    offAll(type){
        this.eventList[type] = [];
    }

    listeners(){
        return this.eventList || []
    }
}

module.exports = EventEmitter