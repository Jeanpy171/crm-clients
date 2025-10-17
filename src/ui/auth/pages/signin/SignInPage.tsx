import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../../app/router/routes";
import { useAuth } from "../../../shared/hooks/useAuth";

const SignInPage: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  // const [error, setError] = React.useState("");
  // const [isLoading, setIsLoading] = React.useState(false);
  const { handleLogin, user, error, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role) {
      handleRedirectByRole(user.role);
    }
  }, [user]);

  const handleRedirectByRole = (role: string) => {
    // Redirect based on role
    switch (role) {
      case "admin":
        navigate(`/${Routes.admin.path}`, { replace: true });
        break;
      case "manager":
        navigate(`/${Routes.manager.path}`, { replace: true });
        break;
      case "advisor":
        navigate(`/${Routes.advisor.path}`, { replace: true });
        break;
      default:
        break;
      // history.push("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError("");

    if (!username || !password || !role) {
      // setError("Por favor complete todos los campos");
      return;
    }

    // setIsLoading(true);

    try {
      handleLogin(username, password, role);
      console.warn("USUARIO QUE ENTRA", user);

      if (user?.role) {
        // Redirect based on role
        switch (user?.role) {
          case "admin":
            navigate(Routes.admin.path);
            break;
          case "manager":
            navigate(Routes.manager.path);
            break;
          case "advisor":
            navigate(Routes.advisor.path);
            break;
          default:
            break;
          // history.push("/login");
        }
      } else {
        // setError("Credenciales inválidas");
      }
    } catch (err) {
      // setError("Error al iniciar sesión");
      console.error(err);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardBody className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">CRM System</h1>
            <p className="text-gray-600">
              Sistema de Gestión de Clientes Potenciales
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Usuario"
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onValueChange={setUsername}
              startContent={
                <Icon icon="lucide:user" className="text-default-400" />
              }
              isRequired
            />

            <Input
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              type="password"
              value={password}
              onValueChange={setPassword}
              startContent={
                <Icon icon="lucide:lock" className="text-default-400" />
              }
              isRequired
            />

            <Select
              label="Rol"
              placeholder="Seleccionar rol..."
              selectedKeys={role ? [role] : []}
              onSelectionChange={(keys) => {
                if (keys !== "all" && keys.size > 0) {
                  setRole(Array.from(keys)[0].toString());
                }
              }}
              isRequired
            >
              <SelectItem key="admin">Administrador</SelectItem>
              <SelectItem key="manager">Gerente de Ventas</SelectItem>
              <SelectItem key="advisor">Asesor</SelectItem>
              <SelectItem key="contract-generator">
                Generador de Contratos
              </SelectItem>
            </Select>

            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={loading}
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Credenciales de prueba:
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
              <div className="p-2 bg-gray-50 rounded-md">
                <strong>Admin:</strong> admin / admin123
              </div>
              <div className="p-2 bg-gray-50 rounded-md">
                <strong>Gerente:</strong> manager / manager123
              </div>
              <div className="p-2 bg-gray-50 rounded-md">
                <strong>Asesor:</strong> advisor / advisor123
              </div>
              <div className="p-2 bg-gray-50 rounded-md">
                <strong>Contract Generator:</strong> contract-generator /
                contract123
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignInPage;
