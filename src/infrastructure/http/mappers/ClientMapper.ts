import type { ClientDTO } from "../../../core/application/dtos/clients/ClientDTO";
import { Client } from "../../../core/domain/entities/Client";
import { Contact } from "../../../core/domain/entities/Contact";

export class ClientMapper {
  static fromApiToDto(apiData: any): ClientDTO {
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
      history: apiData.history,
      advisor: apiData.advisor,
    };
  }

  static toDomain(dto: ClientDTO): Client {
    return Client.create(Contact.create(dto));
  }

  static toDto(client: Client): ClientDTO {
    return client.toJSON();
  }
}
