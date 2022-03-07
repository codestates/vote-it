import { JwtAuthGuard } from './jwt-auth.guard';

export class OptionalJwtAuthGuard extends JwtAuthGuard {
  handleRequest(_err: any, user: any) {
    return user || undefined;
  }
}
