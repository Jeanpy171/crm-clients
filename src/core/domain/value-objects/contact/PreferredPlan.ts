export enum PreferredPlan {
    MEGAS_250 = "MEGAS_250",
    MEGAS_300 = "MEGAS_300",
    MEGAS_400 = "MEGAS_400",
    OTHER = "OTHER",
  }
  
  export class PreferredPlanVO {
    private constructor(private readonly _value: PreferredPlan) {}
  
    static create(value: string): PreferredPlanVO {
      const phase = Object.values(PreferredPlan).find(
        (phase) => phase === value
      );
  
      if (!phase) throw new Error(`Invalid preferred plan: ${value}`);
  
      return new PreferredPlanVO(phase);
    }
  
    get value() {
      return this._value;
    }
  }
  