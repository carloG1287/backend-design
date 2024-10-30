export class CreateUserDto {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly security_question: string;
  readonly security_answer: string;
  readonly password_digest: string;
}
