export enum ServiceDuration {
    BETWEEN_1_AND_6_MONTHS = "BETWEEN_1_AND_6_MONTHS",
    BETWEEN_7_AND_12_MONTHS = "BETWEEN_7_AND_12_MONTHS",
    BETWEEN_13_AND_18_MONTHS = "BETWEEN_13_AND_18_MONTHS",
    BETWEEN_25_AND_36_MONTHS = "BETWEEN_25_AND_36_MONTHS",
    MORE_THAN_3_YEARS = "MORE_THAN_3_YEARS",
  }
  
  export class ServiceDurationVO {
    private constructor(private readonly _value: ServiceDuration) {}
  
    static create(value: string): ServiceDurationVO {
      const phase = Object.values(ServiceDuration).find(
        (phase) => phase === value
      );
  
      if (!phase) throw new Error(`Invalid service duration: ${value}`);
  
      return new ServiceDurationVO(phase);
    }
  
    get value() {
      return this._value;
    }
  }