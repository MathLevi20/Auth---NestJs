export interface JwtPayload {
  sub?: string; // ID do usuário
  id?: string; // ID do usuário
  email?: string; // endereço de e-mail do usuário
  name?: string; // nome do usuário
  role?: string; // função do usuário (por exemplo, "admin" ou "usuário")
  valid?: boolean; // função do usuário (por exemplo, "admin" ou "usuário")
  acessToken?: string; // função do usuário (por exemplo, "admin" ou "usuário")
}
