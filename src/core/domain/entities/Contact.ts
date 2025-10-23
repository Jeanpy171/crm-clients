import { container } from "../../../config/di-container";
import type { ContactDTO } from "../../application/dtos/contact/ContactDTO";
import type { HistoryDTO } from "../../application/dtos/contact/HistoryDTO";
import type {
  ContactStatus,
  InteractionPhase,
  InterestLevel,
} from "../value-objects/contact";
import { ContactStatusVO } from "../value-objects/contact/ContactStatus";
import { InteractionPhaseVO } from "../value-objects/contact/InteractionPhase";
import { InterestLevelVO } from "../value-objects/contact/InterestLevel";

export class Contact {
  private constructor(
    public id: string,
    public name: string,
    public company: string,
    public email: string,
    public phone: string,
    // public sector: string,
    public interactionPhase: InteractionPhase,
    public interestLevel: InterestLevel,
    public status: ContactStatus,
    public createdAt: Date,
    public lastActivity: Date,
    public followUpNotes: string,
    public history: HistoryDTO[],
    // public currentCompany: string,
    // public currentPlanValue: string,
    // public serviceTime: string,
    // public satisfactionRating: string,
    // public improvementAreas: string,
    // public preferredPlan: string,
    // public whatsMissing?: string,
    public advisor?: string
  ) {}

  static create(props: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    // sector: string;
    interactionPhase: InteractionPhase;
    interestLevel: InterestLevel;
    status: ContactStatus;
    createdAt: string;
    lastActivity: string;
    followUpNotes: string;
    // state: LeadStatus;
    // interest: LeadInterestLevel;
    // lastActivity: Date;
    // currentCompany: string;
    // currentPlanValue: string;
    // serviceTime: string;
    // satisfactionRating: string;
    // improvementAreas: string;
    // preferredPlan: string;
    // interestLevel: string;
    // whatsMissing?: string;
    history: HistoryDTO[];
    advisor?: string;
  }): Contact {
    const interactionPhase = InteractionPhaseVO.create(props.interactionPhase);
    const contactState = ContactStatusVO.create(props.status);
    const interestLevel = InterestLevelVO.create(props.interestLevel);
    return new Contact(
      props.id,
      // Date.now().toString() + Math.random().toString(36).substr(2, 9),
      props.name,
      props.company,
      props.email,
      props.phone,
      interactionPhase.value,
      interestLevel.value,
      contactState.value,
      new Date(props.createdAt),
      new Date(props.lastActivity),
      props.followUpNotes,
      props.history,
      //   props.phone,
      //   props.sector,
      //   state.value,
      //   interest.value,
      //   props.lastActivity,
      //   props.currentCompany,
      //   props.currentPlanValue,
      //   props.serviceTime,
      //   props.satisfactionRating,
      //   props.improvementAreas,
      //   props.preferredPlan,
      //   props.interestLevel,
      //   props.whatsMissing,
      props.advisor
    );
  }

  getHistory() {
    return this.history;
  }

  setHisyoty(history: HistoryDTO[]) {
    this.history = history;
  }

  // async getHistory(id: string): Promise<HistoryDTO[]> {
  //   const historyUseCase = container.getHistoryUseCase;
  //   const history = await historyUseCase.execute(id);
  //   return history;
  // }

  toJSON(): ContactDTO {
    return {
      id: this.id,
      name: this.name,
      company: this.company,
      email: this.email,
      phone: this.phone,
      interactionPhase: this.interactionPhase,
      interestLevel: this.interestLevel,
      status: this.status,
      createdAt: this.createdAt.toISOString(),
      lastActivity: this.lastActivity.toISOString(),
      followUpNotes: this.followUpNotes,
      history: this.history,
      //   sector: this.sector,
      //   state: this.state,
      //   interest: this.interest,
      //   lastActivity: this.lastActivity.toISOString(),
      //   currentCompany: this.currentCompany,
      //   currentPlanValue: this.currentCompany,
      //   serviceTime: this.serviceTime,
      //   satisfactionRating: this.satisfactionRating,
      //   improvementAreas: this.improvementAreas,
      //   preferredPlan: this.preferredPlan,
      //   interestLevel: this.interestLevel,
      //   whatsMissing: this.whatsMissing!,
      advisor: this.advisor || "",
    };
  }
}
