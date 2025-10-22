export enum CurrentProvider {
    ETAPA = "ETAPA",
    MIRANET = "MIRANET",
    CELERITY = "CELERITY",
    GONET = "GONET",
    SERVICABLE = "SERVICABLE",
    NETLIFE = "NETLIFE",
    HALLO = "HALLO",
    SISTELCEL = "SISTELCEL",
    XTRIM = "XTRIM",
    CITYCOM = "CITYCOM",
    ASTRONET = "ASTRONET",
    CB_VISION = "CB_VISION",
    NO_SAE = "NO_SAE",
    OTROS = "OTROS",
  }
  
  export class CurrentProviderVO {
    private constructor(private readonly _value: CurrentProvider) {}
  
    static create(value: string): CurrentProviderVO {
      const phase = Object.values(CurrentProvider).find(
        (phase) => phase === value
      );
  
      if (!phase) throw new Error(`Invalid current provider: ${value}`);
  
      return new CurrentProviderVO(phase);
    }
  
    get value() {
      return this._value;
    }
  }
  