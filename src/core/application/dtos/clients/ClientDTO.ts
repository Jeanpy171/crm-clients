import type { ContactDTO } from "../contact/ContactDTO";

export interface ClientDTO extends ContactDTO {
  id: string;
}
