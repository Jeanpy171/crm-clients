export enum InteractionPhase {
  GRADE = "GRADE",
  DEVELOP = "DEVELOP",
  PROPOSE = "PROPOSE",
  CLOSING = "CLOSING",
}

export class InteractionPhaseVO {
  private constructor(private readonly _value: InteractionPhase) {}

  static create(value: string): InteractionPhaseVO {
    const phase = Object.values(InteractionPhase).find(
      (phase) => phase === value
    );

    if (!phase) throw new Error(`Invalid interaction phase: ${value}`);

    return new InteractionPhaseVO(phase);
  }

  get value() {
    return this._value;
  }
}
