export enum CurrentPlanCost {
    BETWEEN_15_AND_20 = "BETWEEN_15_AND_20",
    BETWEEN_21_AND_25 = "BETWEEN_21_AND_25",
    BETWEEN_26_AND_30 = "BETWEEN_26_AND_30",
    MORE_THAN_30 = "MORE_THAN_30",
  }
  
  export class CurrentPlanCostVO {
    private constructor(private readonly _value: CurrentPlanCost) {}
  
    static create(value: string): CurrentPlanCostVO {
      const phase = Object.values(CurrentPlanCost).find(
        (phase) => phase === value
      );
  
      if (!phase) throw new Error(`Invalid current plan cost: ${value}`);
  
      return new CurrentPlanCostVO(phase);
    }
  
    get value() {
      return this._value;
    }
  }