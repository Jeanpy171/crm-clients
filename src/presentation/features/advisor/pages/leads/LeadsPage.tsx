import React from "react";
import { Card, CardBody, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Lead } from "../../../../../core/domain/entities/Lead";
import { LeadStatus } from "../../../../../core/domain/value-objects/lead";

interface AdvisorLeadsProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const LeadsPage: React.FC<AdvisorLeadsProps> = ({ leads, onLeadClick }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Mis Leads</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select placeholder="Todos los Estados" className="w-48">
          <SelectItem key="Calificar">Calificar</SelectItem>
          <SelectItem key="Desarrollar">Desarrollar</SelectItem>
          <SelectItem key="Proponer">Proponer</SelectItem>
          <SelectItem key="Cierre">Cierre</SelectItem>
        </Select>

        <Select placeholder="Todos los Niveles" className="w-48">
          <SelectItem key="Poco interesado">Poco interesado</SelectItem>
          <SelectItem key="Interesado">Interesado</SelectItem>
          <SelectItem key="Medianamente interesado">
            Medianamente interesado
          </SelectItem>
        </Select>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leads?.map((lead) => (
          <Card
            key={lead.id}
            shadow="sm"
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onLeadClick(lead)}
          >
            <CardBody className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{lead.name}</h4>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    lead.state === LeadStatus.GRADE
                      ? "bg-blue-100 text-blue-700"
                      : lead.state === LeadStatus.DEVELOP
                      ? "bg-amber-100 text-amber-700"
                      : lead.state === LeadStatus.PROPOSE
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {lead.state}
                </span>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <Icon icon="lucide:phone" className="inline w-4 h-4 mr-1" />
                  {lead.phone}
                </p>
                <p>
                  <Icon
                    icon="lucide:building"
                    className="inline w-4 h-4 mr-1"
                  />
                  {lead.sector}
                </p>
                <p>
                  <Icon icon="lucide:star" className="inline w-4 h-4 mr-1" />
                  {lead.interestLevel}/10 interés
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Última actividad:{" "}
                  {new Date(lead.lastActivity).toLocaleDateString()}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeadsPage;
