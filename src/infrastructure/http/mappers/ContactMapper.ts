import type { ContactDTO } from "../../../core/application/dtos/contact/ContactDTO";
import { Contact } from "../../../core/domain/entities/Contact";

export class ContactMapper {
  static fromApiToDto(apiData: any): ContactDTO {
    return {
      id: apiData.id,
      name: apiData.name,
      company: apiData.company,
      email: apiData.email,
      phone: apiData.phone,
      type: apiData.type,
      interactionPhase: apiData.interactionPhase,
      interestLevel: apiData.interestLevel,
      status: apiData.status,
      createdAt: apiData.createdAt,
      lastActivity: apiData.lastActivity,
      followUpNotes: apiData.followUpNotes,
      history: apiData.history || [],
      advisor: apiData.advisor,
    };
  }

  static toDomain(dto: ContactDTO): Contact {
    return Contact.create(dto);
  }

  static toDto(contact: Contact): ContactDTO {
    return contact.toJSON();
  }
}
