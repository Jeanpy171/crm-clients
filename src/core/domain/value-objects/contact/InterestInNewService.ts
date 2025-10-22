export enum InterestInNewService {
    NOT_VERY_INTERESTED = "1_NOT_VERY_INTERESTED",
    NOT_INTERESTED = "2_NOT_INTERESTED",
    SOMEWHAT_INTERESTED = "3_SOMEWHAT_INTERESTED",
    INTERESTED = "4_INTERESTED",
    VERY_INTERESTED = "5_VERY_INTERESTED_INTERESTED",
  }
  
  export class InterestInNewServiceVO {
    private constructor(private readonly _value: InterestInNewService) {}
  
    static create(value: string): InterestInNewServiceVO {
      const interestInNewService = Object.values(InterestInNewService).find(
        (status) => status === value
      );
  
      if (!interestInNewService) throw new Error(`Invalid interest in new service: ${value}`);
  
      return new InterestInNewServiceVO(interestInNewService);
    }
  
    get value() {
      return this._value;
    }
  }
  