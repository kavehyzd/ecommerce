import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      SecretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }
  async vlidate(payload: any) {
    return {
      userid: payload.sub,
      module: payload.mobile,
      name: payload.mobile,
    };
  }
}
