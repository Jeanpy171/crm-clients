import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from '@heroui/react';
import { PreferredPlanDropdown } from '../../../../shared/components/preferred-plan-dropdown/PreferredPlanDropdown';
import { HousingSectorDropdown } from '../../../../shared/components/housing-sector-dropdown/HousingSectorDropdown';
import { InterestInNewServiceDropdown } from '../../../../shared/components/interest-in-new-service-dropdown/InterestInNewServiceDropdown';
import { AreasForImprovementDropdown } from '../../../../shared/components/areas-for-improvement-dropdown/AreasForImprovementDropdown';
import { ServiceSatisfactionDropdown } from '../../../../shared/components/service-satisfaction-dropdown/ServiceSatisfactionDropdown';
import { ServiceDurationDropdown } from '../../../../shared/components/service-duration-dropdown/ServiceDurationDropdown';
import { CurrentProviderDropdown } from '../../../../shared/components/current-provider-dropdown/CurrentProviderDropdown';

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: any) => void;
}

const CreateClientModal: React.FC<CreateClientModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {

  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    sector: '',
    currentCompany: '',
    currentProvider: '',
    currentPlanValue: '',
    serviceTime: '',
    satisfactionRating: '',
    improvementAreas: '',
    preferredPlan: '',
    interestLevel: '',
    interestInNewService: '',
    whatsMissing: ''
  });

  const handleChange = (field: string, value: string) => {
    // Validaciones específicas por campo
    if (field === 'name') {
      // Solo permite letras, espacios y caracteres especiales del español
      const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
      // Limitar a 50 caracteres
      const limitedValue = cleanValue.substring(0, 50);
      setFormData(prev => ({ ...prev, [field]: limitedValue }));
    } else if (field === 'phone') {
      // Solo permite números y limita a 10 dígitos
      const cleanValue = value.replace(/[^0-9]/g, '');
      const limitedValue = cleanValue.substring(0, 10);
      setFormData(prev => ({ ...prev, [field]: limitedValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleKeyPress = (field: string, e: React.KeyboardEvent) => {
    if (field === 'name') {
      // Prevenir entrada de números y caracteres especiales en el nombre
      const allowedChars = /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/;
      if (!allowedChars.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
        e.preventDefault();
      }
    } else if (field === 'phone') {
      // Prevenir entrada de letras y caracteres especiales en el teléfono
      const allowedChars = /[0-9]/;
      const currentValue = formData.phone;
      
      // Si ya tiene 10 dígitos y no es una tecla de borrado, prevenir entrada
      if (currentValue.length >= 10 && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
        e.preventDefault();
        return;
      }
      
      if (!allowedChars.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
        e.preventDefault();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg" placement="top" scrollBehavior="inside">
      <ModalContent className="max-w-[95vw] sm:max-w-2xl">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-lg sm:text-xl">Crear Nuevo Cliente</h3>
            </ModalHeader>
            <ModalBody className="max-h-[70vh] overflow-y-auto">
              <form id="createClientForm" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    label="Nombre del Cliente"
                    placeholder="Ej: Juan Pérez"
                    value={formData.name}
                    onValueChange={(value) => handleChange('name', value)}
                    onKeyDown={(e) => handleKeyPress('name', e)}
                    isRequired
                    description="Solo letras y espacios, máximo 50 caracteres"
                    validate={(value) => {
                      if (!value) return "Nombre es requerido";
                      if (value.length > 50) return "Máximo 50 caracteres";
                      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return "Solo letras y espacios";
                      return true;
                    }}
                  />
                  
                  <Input
                    label="Teléfono"
                    placeholder="Ej: 0999999999"
                    value={formData.phone}
                    onValueChange={(value) => handleChange('phone', value)}
                    onKeyDown={(e) => handleKeyPress('phone', e)}
                    isRequired
                    description="Solo números, máximo 10 dígitos"
                    validate={(value) => {
                      if (!value) return "Teléfono es requerido";
                      if (!/^\d+$/.test(value)) return "Solo números";
                      if (value.length > 10) return "Máximo 10 dígitos";
                      return true;
                    }}
                  />
                  {/* Nuevo dropdown para sector de vivienda */}
                  <HousingSectorDropdown 
                    value={formData.sector} 
                    onChange={(value) => handleChange('sector', value)} 
                  />
                  
                  {/* Campo anterior: Input para sector */}
                  {/* <Input
                    label="Sector"
                    placeholder="Ej: Quito Sur, Quito Centro, Quito Norte, Cuenca"
                    value={formData.sector}
                    onValueChange={(value) => handleChange('sector', value)}
                    isRequired
                  /> */}
                  
                  
                  <CurrentProviderDropdown 
                    value={formData.currentProvider} 
                    onChange={(value) => handleChange('currentProvider', value)} 
                  />
                  
                  {/*<Input
                    label="Nombre de la empresa con la que cuenta actualmente el servicio"
                    placeholder="Ej: Netlife, Claro, Fibr"
                    value={formData.currentCompany}
                    onValueChange={(value) => handleChange('currentCompany', value)}
                    isRequired
                  />
                  <CurrentPlanCostDropdown 
                    value={formData.currentPlanValue} 
                    onChange={(value) => handleChange('currentPlanValue', value)} 
                  />
                  {/*<Select
                    label="Valor del plan que paga actualmente"
                    placeholder="Seleccionar valor..."
                    selectedKeys={formData.currentPlanValue ? [formData.currentPlanValue] : []}
                    onSelectionChange={(keys) => {
                      if (keys !== "all" && keys.size > 0) {
                        handleChange('currentPlanValue', Array.from(keys)[0].toString());
                      }
                    }}
                    isRequired
                  >
                    <SelectItem key="15-20 USD">15-20 USD</SelectItem>
                    <SelectItem key="21-25 USD">21-25 USD</SelectItem>
                    <SelectItem key="26-30 USD">26-30 USD</SelectItem>
                    <SelectItem key="MAYOR A 30 USD">MAYOR A 30 USD</SelectItem
                  </Select> */}
                  
                  {/* Dropdown para tiempo con el servicio actual */}
                  <ServiceDurationDropdown 
                    value={formData.serviceTime} 
                    onChange={(value) => handleChange('serviceTime', value)} 
                  />
                    
                  {/*<Select
                    label="¿Qué tiempo lleva actualmente con el servicio?"
                    placeholder="Seleccionar tiempo..."
                    selectedKeys={formData.serviceTime ? [formData.serviceTime] : []}
                    onSelectionChange={(keys) => {
                      if (keys !== "all" && keys.size > 0) {
                        handleChange('serviceTime', Array.from(keys)[0].toString());
                      }
                    }}
                    isRequired
                  >
                    <SelectItem key="1 a 6 Meses">1 a 6 Meses</SelectItem>
                    <SelectItem key="7 a 12 Meses">7 a 12 Meses</SelectItem>
                    <SelectItem key="13 a 18 Meses">13 a 18 Meses</SelectItem>
                    <SelectItem key="25 a 36 meses">25 a 36 meses</SelectItem>
                    <SelectItem key="Mas de 3 Años">Mas de 3 Años</SelectItem>
                  </Select>*/}

                  {/* Nuevo dropdown para satisfacción del servicio */}
                  <ServiceSatisfactionDropdown 
                    value={formData.satisfactionRating} 
                    onChange={(value) => handleChange('satisfactionRating', value)} 
                  />
                  
                  {/* Campo anterior: Select manual para satisfacción */}
                  {/* <Select
                    label="Califique de 1 a 5 (siendo 1 la calificación más baja) qué tan satisfecho está con el servicio"
                    placeholder="Seleccionar calificación..."
                    selectedKeys={formData.satisfactionRating ? [formData.satisfactionRating] : []}
                    onSelectionChange={(keys) => {
                      if (keys !== "all" && keys.size > 0) {
                        handleChange('satisfactionRating', Array.from(keys)[0].toString());
                      }
                    }}
                    isRequired
                  >
                    <SelectItem key="1 - Malo">1 - Malo</SelectItem>
                    <SelectItem key="2 - Regular">2 - Regular</SelectItem>
                    <SelectItem key="3 - Bueno">3 - Bueno</SelectItem>
                    <SelectItem key="4 - Muy Bueno">4 - Muy Bueno</SelectItem>
                    <SelectItem key="5 - Excelente">5 - Excelente</SelectItem>
                  </Select> */}
                  
                  {/* Nuevo dropdown para áreas de mejora */}
                  <AreasForImprovementDropdown 
                    value={formData.improvementAreas} 
                    onChange={(value) => handleChange('improvementAreas', value)} 
                  />
                  
                  {/* Campo anterior: Select manual para áreas de mejora */}
                  {/* <Select
                    label="¿Qué le gustaría mejorar en el servicio que tiene actualmente?"
                    placeholder="Seleccionar área..."
                    selectedKeys={formData.improvementAreas ? [formData.improvementAreas] : []}
                    onSelectionChange={(keys) => {
                      if (keys !== "all" && keys.size > 0) {
                        handleChange('improvementAreas', Array.from(keys)[0].toString());
                      }
                    }}
                    isRequired
                  >
                    <SelectItem key="Velocidad">Velocidad</SelectItem>
                    <SelectItem key="Precio">Precio</SelectItem>
                    <SelectItem key="Atención">Atención</SelectItem>
                    <SelectItem key="Calidad del Servicio">Calidad del Servicio</SelectItem>
                  </Select> */}
                  
                  <PreferredPlanDropdown 
                    value={formData.preferredPlan} 
                    onChange={(value) => handleChange('preferredPlan', value)} 
                  />
                  
                  {/* Campo anterior: Select manual para plan preferido */}
                  {/* <Select
                    label="¿Qué plan le gustó más?"
                    placeholder="Seleccionar plan..."
                    selectedKeys={formData.preferredPlan ? [formData.preferredPlan] : []}
                    onSelectionChange={(keys) => {
                      if (keys !== "all" && keys.size > 0) {
                        handleChange('preferredPlan', Array.from(keys)[0].toString());
                      }
                    }}
                    isRequired
                  >
                    <SelectItem key="250 megas">250 megas</SelectItem>
                    <SelectItem key="300 megas">300 megas</SelectItem>
                    <SelectItem key="400 megas">400 megas</SelectItem>
                    <SelectItem key="otro">otro</SelectItem>
                  </Select> */}
                  
                  {/* Nuevo dropdown para interés en nuevos servicios */}
                  <InterestInNewServiceDropdown 
                    value={formData.interestInNewService} 
                    onChange={(value) => handleChange('interestInNewService', value)} 
                  />

                  {/* Campo anterior: Select manual para nivel de interés */}
                  {/* <Select
                    label="Del 1 al 10 ¿qué tan interesado está para adquirir el nuevo servicio?"
                    placeholder="Seleccionar nivel..."
                    selectedKeys={formData.interestLevel ? [formData.interestLevel] : []}
                    onSelectionChange={(keys) => {
                      if (keys !== "all" && keys.size > 0) {
                        handleChange('interestLevel', Array.from(keys)[0].toString());
                      }
                    }}
                    isRequired
                  >
                    <SelectItem key="1 - No me interesa">1 - No me interesa</SelectItem>
                    <SelectItem key="2">2</SelectItem>
                    <SelectItem key="3">3</SelectItem>
                    <SelectItem key="4">4</SelectItem>
                    <SelectItem key="5">5</SelectItem>
                    <SelectItem key="6">6</SelectItem>
                    <SelectItem key="7">7</SelectItem>
                    <SelectItem key="8">8</SelectItem>
                    <SelectItem key="9">9</SelectItem>
                    <SelectItem key="10 - Super interesado">10 - Super interesado</SelectItem>
                  </Select> */}
                  
                  <Textarea
                    label="¿Qué le faltaría para llegar a 10?"
                    placeholder="Describe qué necesitaría para estar completamente interesado..."
                    value={formData.whatsMissing}
                    onValueChange={(value) => handleChange('whatsMissing', value)}
                  />
                  
                  
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" type="submit" form="createClientForm">
                Crear Cliente
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateClientModal;