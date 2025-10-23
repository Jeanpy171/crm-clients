import {
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  type ModalProps,
} from "@heroui/react";

interface RatingContactModalProps extends Omit<ModalProps, "children"> {
  name: string;
  company: string;
  onSuccess: () => void;
  onFailed: () => void;
}

const CardButton = ({
  title,
  description,
  className,
  onPress,
}: {
  title: string;
  description: string;
  className?: string;
  onPress: () => void;
}) => {
  return (
    <span
      className={`shadow-lg hover:scale-105 transition-all transform ease-in-out cursor-pointer p-7 rounded-lg ${className}`}
      onClick={onPress}
    >
      <strong className="text-white font-extrabold">{title}</strong>
      <p className="text-gray-200 font-bold">{description}</p>
    </span>
  );
};

export const RatingContactModal = ({
  name,
  company,
  onSuccess,
  onFailed,
  ...rest
}: RatingContactModalProps) => {
  return (
    <Modal {...rest}>
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className="flex flex-col gap-3 justify-center items-center">
                <h5 className="text-7xl">⭐</h5>
                <h6 className="font-bold text-2xl">Calificar Cliente</h6>
                <strong className="text-gray-400">
                  {name} - {company}
                </strong>
              </div>
              <CardButton
                title="Cliente Fidelizado"
                description="El cliente ha sido convertido exitosamente y esta satisfecho"
                className="bg-green-500"
                onPress={onSuccess}
              />
              <CardButton
                title="Cliente Perdido"
                description="El cliente no esta interesado o no se pudo concretar la venta"
                 className="bg-red-500"
                onPress={onSuccess}
              />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
