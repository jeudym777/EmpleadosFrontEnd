// IMPORTANTE: Este archivo es solo de referencia
// La cadena de conexión debe estar en el backend (C#), NO en el frontend

/*
===========================================
CONFIGURACIÓN DEL BACKEND (appsettings.json)
===========================================

En tu proyecto BackendProject, el archivo appsettings.json debe tener:

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=EmpleadosDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}

===========================================
OPCIONES DE CADENAS DE CONEXIÓN
===========================================

1. SQL Server LocalDB (para desarrollo local):
   "Server=(localdb)\\MSSQLLocalDB;Database=EmpleadosDB;Trusted_Connection=True;TrustServerCertificate=True;"

2. SQL Server Express:
   "Server=.\\SQLEXPRESS;Database=EmpleadosDB;Trusted_Connection=True;TrustServerCertificate=True;"

3. SQL Server con autenticación de Windows:
   "Server=localhost;Database=EmpleadosDB;Trusted_Connection=True;TrustServerCertificate=True;"

4. SQL Server con usuario y contraseña:
   "Server=localhost;Database=EmpleadosDB;User Id=tu_usuario;Password=tu_password;TrustServerCertificate=True;"

5. SQL Server en red:
   "Server=192.168.1.100;Database=EmpleadosDB;User Id=sa;Password=tu_password;TrustServerCertificate=True;"

===========================================
PASOS PARA CONFIGURAR
===========================================

1. Ve a tu proyecto BackendProject
2. Abre appsettings.json
3. Agrega o modifica la sección ConnectionStrings
4. Asegúrate de tener SQL Server instalado
5. Ejecuta los stored procedures incluidos en tu proyecto
6. Reinicia el backend: dotnet run

===========================================
VERIFICAR LA CONEXIÓN
===========================================

En tu backend C#, el servicio EmpleadoSQLService debe usar la conexión así:

private readonly string _connectionString;

public EmpleadoSQLService(IConfiguration configuration)
{
    _connectionString = configuration.GetConnectionString("DefaultConnection");
}

*/

export const BACKEND_INFO = {
    message: "La cadena de conexión está en el backend, no en el frontend",
    apiUrl: "https://localhost:7031/api",
    swaggerUrl: "https://localhost:7031/swagger"
};
