export enum ServiceSatisfaction {
    BAD = "1_BAD",
    REGULAR = "2_REGULAR",
    GOOD = "3_GOOD",
    VERY_GOOD = "4_VERY_GOOD",
    EXCELLENT = "5_EXCELLENT",
  }
  
  export class ServiceSatisfactionVO {
    private constructor(private readonly _value: ServiceSatisfaction) {}
  
    static create(value: string): ServiceSatisfactionVO {
      const phase = Object.values(ServiceSatisfaction).find(
        (phase) => phase === value
      );
  
      if (!phase) throw new Error(`Invalid service satisfaction: ${value}`);
  
      return new ServiceSatisfactionVO(phase);
    }
  
    get value() {
      return this._value;
    }
  }
  