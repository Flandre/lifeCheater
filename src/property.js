import { clone } from './functions/util.js';

class Property {
    constructor() {}

    TYPES = {
        AGE: "AGE",
        CHR: "CHR",
        INT: "INT",
        STR: "STR",
        MNY: "MNY",
        SPR: "SPR",
        LIF: "LIF",
        TLT: "TLT",
        EVT: "EVT",
    };

    #ageData;
    #data;
    #record;

    initial({age}) {

        this.#ageData = age;
        for(const a in age) {
            let { event, talent } = age[a];
            if(!Array.isArray(event))
                event = event?.split(',') || [];

            event = event.map(v=>{
                const value = `${v}`.split('*').map(

                  (n, i, a) => {
                      if(i == 0) {
                          switch(Number(n)) {
                              // 不会被截杀
                              case 10359:
                                  a[1] = 0;
                                  break;
                              // 必定悟出
                              case 10380:
                              case 10381:
                              case 10382:
                              case 10383:
                              case 10384:
                              // case 10385:
                              case 10386:
                              case 10387:
                              case 10388:
                              case 10389:
                              case 10390:
                                  a[1] = 10;
                                  break;
                              // 半分突破
                              // case 10325:
                              // case 10326:
                              // case 10327:
                              // case 10328:
                              // case 10329:
                              // case 10330:
                              // case 10331:
                              // case 10332:
                              // case 10333:
                              // case 10337:
                              // case 10338:
                              // case 10339:
                              // case 10340:
                              // case 10341:
                              // case 10342:
                              // case 10343:
                              // case 10344:
                              // case 10345:
                              // case 10348:
                              // case 10352:
                              // case 10353:
                              // case 10354:
                              // case 10355:
                              // case 10356:
                              // case 10357:
                              // case 10358:
                              //     a[1] = 1000;
                              //     break;
                              // // 必定双修（容貌10+）
                              // case 10349:
                              //     a[1] = 200;
                              //     break;
                              // // 你可真是个小机灵鬼（智力10+）
                              // case 10350:
                              //     a[1] = 200;
                              //     break;
                              // // 挖 宝 人
                              // case 10495:
                              //     a[1] = 200;
                              // // 云 游 四 海
                              // case 10335:
                              //     a[1] = 200;
                              //     break;
                          }
                      }
                      return Number(n);
                  }
                );
                if(value.length==1) value.push(1);
                return value;
            });

            if(!Array.isArray(talent))
                talent = talent?.split(',') || [];

            talent = talent.map(v=>Number(v));
            // console.log('======= age =======')
            // console.log(a)
            // console.log(event)
            // console.log(talent)

            age[a] = { event, talent };
        }
    }

    restart(data) {
        this.#data = {
            [this.TYPES.AGE]: -1,
            [this.TYPES.CHR]: 0,
            [this.TYPES.INT]: 0,
            [this.TYPES.STR]: 0,
            [this.TYPES.MNY]: 0,
            [this.TYPES.SPR]: 0,
            [this.TYPES.LIF]: 1,
            [this.TYPES.TLT]: [],
            [this.TYPES.EVT]: [],
        };
        for(const key in data)
            this.change(key, data[key]);
        this.#record = [];
    }

    get(prop) {
        switch(prop) {
            case this.TYPES.AGE:
            case this.TYPES.CHR:
            case this.TYPES.INT:
            case this.TYPES.STR:
            case this.TYPES.MNY:
            case this.TYPES.SPR:
            case this.TYPES.LIF:
            case this.TYPES.TLT:
            case this.TYPES.EVT:
                return clone(this.#data[prop]);
            default: return 0;
        }
    }

    set(prop, value) {
        switch(prop) {
            case this.TYPES.AGE:
            case this.TYPES.CHR:
            case this.TYPES.INT:
            case this.TYPES.STR:
            case this.TYPES.MNY:
            case this.TYPES.SPR:
            case this.TYPES.LIF:
            case this.TYPES.TLT:
            case this.TYPES.EVT:
                this.#data[prop] = clone(value);
                break;
            default: return 0;
        }
    }

    record() {
        this.#record.push({
            [this.TYPES.AGE]: this.get(this.TYPES.AGE),
            [this.TYPES.CHR]: this.get(this.TYPES.CHR),
            [this.TYPES.INT]: this.get(this.TYPES.INT),
            [this.TYPES.STR]: this.get(this.TYPES.STR),
            [this.TYPES.MNY]: this.get(this.TYPES.MNY),
            [this.TYPES.SPR]: this.get(this.TYPES.SPR),
        });
    }

    getRecord() {
        return clone(this.#record);
    }

    change(prop, value) {
        // console.log('change===========')
        // console.log(prop)
        // console.log(value)
        if(Array.isArray(value)) {
            for(const v of value)
                this.change(prop, Number(v));
            return;
        }
        switch(prop) {
            case this.TYPES.AGE:
            case this.TYPES.CHR:
                // this.#data['CHR'] += ~~(Math.random()*1000)
            case this.TYPES.INT:
                this.#data['INT'] += ~~(Math.random()*1000)
            case this.TYPES.STR:
                this.#data['STR'] += ~~(Math.random()*1000)
            case this.TYPES.MNY:
                // this.#data['MNY'] += ~~(Math.random()*1000)
            case this.TYPES.SPR:
                this.#data['SPR'] += ~~(Math.random()*1000)
            case this.TYPES.LIF:
                // this.#data['LIF'] += ~~(Math.random()*1000)
                this.#data[prop] += Number(value);
                break;
            case this.TYPES.TLT:
            case this.TYPES.EVT:
                const v = this.#data[prop];
                if(value<0) {
                    const index = v.indexOf(value);
                    if(index!=-1) v.splice(index,1);
                }
                if(!v.includes(value)) v.push(value);
                break;
            default: return;
        }
    }

    effect(effects) {
        for(const prop in effects)
            this.change(prop, Number(effects[prop]));
    }

    isEnd() {
        return this.get(this.TYPES.LIF) < 1;
    }

    ageNext() {
        this.change(this.TYPES.AGE, 1);
        const age = this.get(this.TYPES.AGE);
        const {event, talent} = this.getAgeData(age);
        return {age, event, talent};
    }

    getAgeData(age) {
        return clone(this.#ageData[age]);
    }

}

export default Property;