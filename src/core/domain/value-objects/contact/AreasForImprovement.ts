export enum AreasForImprovement {
    SPEED = "SPEED",
    PRICE = "PRICE",
    ATTENTION = "ATTENTION",
    SERVICE_QUALITY = "SERVICE_QUALITY",
  }
  
  export class AreasForImprovementVO {
    private constructor(private readonly _value: AreasForImprovement) {}
  
    static create(value: string): AreasForImprovementVO {
      const phase = Object.values(AreasForImprovement).find(
        (phase) => phase === value
      );
  
      if (!phase) throw new Error(`Invalid housing sector: ${value}`);
  
      return new AreasForImprovementVO(phase);
    }
  
    get value() {
      return this._value;
    }
  }
  