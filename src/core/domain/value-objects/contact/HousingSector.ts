export enum HousingSector {
    QUITO_SUR = "QUITO_SUR",
    QUITO_CENTRO = "QUITO_CENTRO",
    QUITO_NORTE = "QUITO_NORTE",
    CUENCA = "CUENCA",
  }
  
  export class HousingSectorVO {
    private constructor(private readonly _value: HousingSector) {}
  
    static create(value: string): HousingSectorVO {
      const phase = Object.values(HousingSector).find(
        (phase) => phase === value
      );
  
      if (!phase) throw new Error(`Invalid housing sector: ${value}`);
  
      return new HousingSectorVO(phase);
    }
  
    get value() {
      return this._value;
    }
  }
  